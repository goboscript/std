#
# USAGE
#   Include this file in your project and call:
#
#     parse_args "git commit -m 'fix bug' --author=\"Jane\"";
#
#   Parsed tokens are stored in the global list `args`:
#     args[1] => "git"
#     args[2] => "commit"
#     args[3] => "-m"
#     args[4] => "fix bug"
#     args[5] => "--author=Jane"
#
# SYNTAX SUPPORTED
#   Unquoted tokens  — delimited by spaces
#   Single quotes    — everything inside is literal, no escapes
#   Double quotes    — spaces preserved; backslash escapes work inside
#   Backslash        — outside quotes, escapes the next character (e.g. '\ ' => ' ')
#   Adjacent quoting — foo"bar"'baz' => foobarbaz (quotes can be concatenated)
#
# GLOBAL OUTPUTS
#   list args   — holds one token per index after parse_args returns

list shlex_args;


# ── parse_args ────────────────────────────────────────────────────────────────
# proc parse_args str
#   str  — the raw input string to tokenise
#
# Clears `args` before filling it.  Unclosed quotes consume until end-of-string
# (same lenient behaviour as most interactive shells).

proc shlex_split str {
    delete shlex_args;

    local _pa_i = 1;
    local _pa_len = length $str;
    local _pa_cur = "";
    local _pa_in_sq = 0;
    local _pa_in_dq = 0;

    until _pa_i > _pa_len {
        local _pa_c = $str[_pa_i];

        # ── inside single quotes ──────────────────────────────────────────────
        # Nothing is special except the closing quote.
        if _pa_in_sq == 1 {
            if _pa_c == "'" {
                _pa_in_sq = 0;
            } else {
                _pa_cur &= _pa_c;
            }

        # ── inside double quotes ──────────────────────────────────────────────
        # Backslash escapes the next character; everything else is literal.
        } elif _pa_in_dq == 1 {
            if _pa_c == "\"" {
                _pa_in_dq = 0;
            } elif _pa_c == "\\" {
                _pa_i += 1;
                if _pa_i <= _pa_len {
                    _pa_cur &= $str[_pa_i];
                }
            } else {
                _pa_cur &= _pa_c;
            }

        # ── unquoted ──────────────────────────────────────────────────────────
        } elif _pa_c == "'" {
            # Enter single-quote mode (may continue current token).
            _pa_in_sq = 1;

        } elif _pa_c == "\"" {
            # Enter double-quote mode (may continue current token).
            _pa_in_dq = 1;

        } elif _pa_c == "\\" {
            # Backslash outside quotes: take the next character literally.
            _pa_i += 1;
            if _pa_i <= _pa_len {
                _pa_cur &= $str[_pa_i];
            }

        } elif _pa_c == " " {
            # Space: flush current token if non-empty.
            if length _pa_cur > 0 {
                add _pa_cur to shlex_args;
                _pa_cur = "";
            }

        } else {
            # Ordinary character.
            _pa_cur &= _pa_c;
        }

        _pa_i += 1;
    }

    # Flush the final token (handles no-trailing-space and unclosed quotes).
    if length _pa_cur > 0 {
        add _pa_cur to shlex_args;
    }
}
