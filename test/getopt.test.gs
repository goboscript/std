%include ../shlex.gs
%include ../getopt.gs

proc test {
    # ── 1. single flag ────────────────────────────────────────────────────────
    shlex_split "-v";
    getopt_init;
    getopt "v";
    expect "1. result", getopt_result, to_be: "v";
    getopt "v";
    expect "1. done",   getopt_result, to_be: -1;

    # ── 2. multiple separate flags ────────────────────────────────────────────
    shlex_split "-a -b -c";
    getopt_init;
    getopt "abc";
    expect "2. first",  getopt_result, to_be: "a";
    getopt "abc";
    expect "2. second", getopt_result, to_be: "b";
    getopt "abc";
    expect "2. third",  getopt_result, to_be: "c";
    getopt "abc";
    expect "2. done",   getopt_result, to_be: -1;

    # ── 3. clustered flags ────────────────────────────────────────────────────
    shlex_split "-abc";
    getopt_init;
    getopt "abc";
    expect "3. first",  getopt_result, to_be: "a";
    getopt "abc";
    expect "3. second", getopt_result, to_be: "b";
    getopt "abc";
    expect "3. third",  getopt_result, to_be: "c";
    getopt "abc";
    expect "3. done",   getopt_result, to_be: -1;

    # ── 4. option with argument, separate token ───────────────────────────────
    shlex_split "-o file.txt";
    getopt_init;
    getopt "o:";
    expect "4. result", getopt_result, to_be: "o";
    expect "4. optarg", optarg,        to_be: "file.txt";
    getopt "o:";
    expect "4. done",   getopt_result, to_be: -1;

    # ── 5. option with argument, joined ──────────────────────────────────────
    shlex_split "-ofile.txt";
    getopt_init;
    getopt "o:";
    expect "5. result", getopt_result, to_be: "o";
    expect "5. optarg", optarg,        to_be: "file.txt";
    getopt "o:";
    expect "5. done",   getopt_result, to_be: -1;

    # ── 6. mixed flags and option-with-arg ────────────────────────────────────
    shlex_split "-v -o out.txt -n";
    getopt_init;
    getopt "vno:";
    expect "6. v",      getopt_result, to_be: "v";
    getopt "vno:";
    expect "6. o",      getopt_result, to_be: "o";
    expect "6. optarg", optarg,        to_be: "out.txt";
    getopt "vno:";
    expect "6. n",      getopt_result, to_be: "n";
    getopt "vno:";
    expect "6. done",   getopt_result, to_be: -1;

    # ── 7. cluster ending with option-with-arg joined ─────────────────────────
    #    -voval  →  -v  then  -o val
    shlex_split "-voval";
    getopt_init;
    getopt "vo:";
    expect "7. v",      getopt_result, to_be: "v";
    getopt "vo:";
    expect "7. o",      getopt_result, to_be: "o";
    expect "7. optarg", optarg,        to_be: "val";
    getopt "vo:";
    expect "7. done",   getopt_result, to_be: -1;

    # ── 8. -- stops option parsing ────────────────────────────────────────────
    shlex_split "-v -- -n";
    getopt_init;
    getopt "vn";
    expect "8. v",    getopt_result, to_be: "v";
    getopt "vn";
    expect "8. done", getopt_result, to_be: -1;
    expect "8. optind points past --", optind, to_be: 3;

    # ── 9. non-option arg stops parsing ──────────────────────────────────────
    shlex_split "-v foo -n";
    getopt_init;
    getopt "vn";
    expect "9. v",      getopt_result, to_be: "v";
    getopt "vn";
    expect "9. done",   getopt_result, to_be: -1;
    expect "9. optind", optind,        to_be: 2;

    # ── 10. unknown option returns ? and sets optopt ──────────────────────────
    shlex_split "-z";
    getopt_init;
    getopt "v";
    expect "10. result", getopt_result, to_be: "?";
    expect "10. optopt", optopt,        to_be: "z";

    # ── 11. missing required argument returns ? ───────────────────────────────
    shlex_split "-o";
    getopt_init;
    getopt "o:";
    expect "11. result", getopt_result, to_be: "?";

    # ── 12. no args at all ────────────────────────────────────────────────────
    shlex_split "";
    getopt_init;
    getopt "v";
    expect "12. done", getopt_result, to_be: -1;

    # ── 13. optind lands on first non-option positional ───────────────────────
    shlex_split "-a -b foo bar";
    getopt_init;
    getopt "ab";
    getopt "ab";
    getopt "ab";
    expect "13. optind",    optind,           to_be: 3;
    expect "13. first pos", shlex_args[optind], to_be: "foo";
}
