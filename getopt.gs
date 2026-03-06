#
# ── INPUT ────────────────────────────────────────────────────────────────────
#   Reads from the global list `shlex_args` (populated by shlex_split).
#
# ── USAGE ────────────────────────────────────────────────────────────────────
#   1. Call shlex_split on your command string.
#   2. Call getopt_init to reset state.
#   3. Call getopt in a loop, passing your optstring (e.g. "ab:c").
#      A letter followed by ':' means that option requires an argument.
#   4. After the loop, optind points at the first non-option argument.
#
#   onflag {
#       shlex_split "-v -o file.txt -- foo bar";
#       getopt_init;
#       getopt_result = "";
#       until getopt_result == -1 {
#           getopt "vo:";
#           if getopt_result == "v" { say "verbose"; }
#           if getopt_result == "o" { say "output: " & optarg; }
#           if getopt_result == "?" { say "unknown: " & optopt; }
#       }
#       # shlex_args[optind] .. shlex_args[length shlex_args] are non-option args
#   }
#
# ── OUTPUTS (globals) ────────────────────────────────────────────────────────
#   getopt_result — option char found, "?" for unknown, -1 when done
#   optarg        — argument value for options that take one (letter + ':')
#   optopt        — the raw option character just examined
#   optind        — index of next unprocessed item in shlex_args

var getopt_result = "";
var optarg = "";
var optopt = "";
var optind = 1;

# ── private state ─────────────────────────────────────────────────────────────
# _go_subpos: position within the current cluster arg being parsed.
#   0  → need to fetch the next arg from shlex_args
#   2+ → mid-cluster (e.g. after '-' in "-xyz", 'x' is at pos 2)
var _go_subpos = 0;

# ── getopt_init ───────────────────────────────────────────────────────────────
# Reset all getopt state.  Call before starting a new parse.
proc getopt_init {
    optind = 1;
    optarg = "";
    optopt = "";
    getopt_result = "";
    _go_subpos = 0;
}

# ── getopt ────────────────────────────────────────────────────────────────────
# proc getopt optstring
#
#   optstring  e.g. "ab:cd:"
#              A plain letter is a flag.  Letter + ':' requires an argument.
#
# Behaviours mirroring POSIX getopt:
#   -a -b -c          individual flags
#   -abc              cluster; equivalent to -a -b -c
#   -o value          option with argument (separate token)
#   -ovalue           option with argument (joined)
#   --                ends option parsing; optind advances past it
#   non-option arg    ends option parsing (optind points at it)
proc getopt optstring {
    local arg = "";
    local c = "";
    local ci = 0;
    local found = 0;
    local takes_arg = 0;
    local vi = 0;

    # ── Phase 1: fetch next arg when not mid-cluster ──────────────────────────
    if _go_subpos == 0 {
        if optind > length shlex_args {
            getopt_result = -1;
        } else {
            arg = shlex_args[optind];
            if arg == "--" {
                # explicit end-of-options marker
                optind += 1;
                getopt_result = -1;
            } elif length arg < 2 or arg[1] != "-" {
                # non-option argument: stop here, leave optind pointing at it
                getopt_result = -1;
            } else {
                # valid option cluster, first char at position 2
                _go_subpos = 2;
            }
        }
    }

    # ── Phase 2: consume one option character from the current cluster ────────
    if _go_subpos > 0 {
        arg = shlex_args[optind];
        c = arg[_go_subpos];
        optopt = c;
        optarg = "";

        # Search optstring for c; check if the next char is ':'
        found = 0;
        takes_arg = 0;
        ci = 1;
        until ci > length $optstring or found == 1 {
            if $optstring[ci] == c {
                found = 1;
                if ci + 1 <= length $optstring {
                    if $optstring[ci + 1] == ":" {
                        takes_arg = 1;
                    }
                }
            }
            ci += 1;
        }

        if found == 0 {
            # ── unknown option ────────────────────────────────────────────────
            getopt_result = "?";
            if _go_subpos >= length arg {
                optind += 1;
                _go_subpos = 0;
            } else {
                _go_subpos += 1;
            }

        } elif takes_arg == 1 {
            # ── option with argument ──────────────────────────────────────────
            if _go_subpos < length arg {
                # rest of the cluster is the value  e.g.  -ofoo  →  optarg="foo"
                vi = _go_subpos + 1;
                until vi > length arg {
                    optarg &= arg[vi];
                    vi += 1;
                }
                optind += 1;
                _go_subpos = 0;
                getopt_result = c;
            } else {
                # value is the next item  e.g.  -o foo  →  optarg="foo"
                optind += 1;
                if optind > length shlex_args {
                    # missing required argument
                    getopt_result = "?";
                    _go_subpos = 0;
                } else {
                    optarg = shlex_args[optind];
                    optind += 1;
                    _go_subpos = 0;
                    getopt_result = c;
                }
            }

        } else {
            # ── flag option (no argument) ─────────────────────────────────────
            getopt_result = c;
            if _go_subpos >= length arg {
                # end of this cluster, move to next arg
                optind += 1;
                _go_subpos = 0;
            } else {
                # more letters remain in the cluster
                _go_subpos += 1;
            }
        }
    }
}
