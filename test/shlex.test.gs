%include ../shlex.gs

proc test {
    # 1. basic whitespace splitting
    shlex_split "one two three";
    expect "1. shlex_args[1]", shlex_args[1], to_be: "one";
    expect "1. shlex_args[2]", shlex_args[2], to_be: "two";
    expect "1. shlex_args[3]", shlex_args[3], to_be: "three";

    # 2. single quotes preserve spaces
    shlex_split "'hello world' foo";
    expect "2. shlex_args[1]", shlex_args[1], to_be: "hello world";
    expect "2. shlex_args[2]", shlex_args[2], to_be: "foo";

    # 3. double quotes preserve spaces
    shlex_split "\"hello world\" foo";
    expect "3. shlex_args[1]", shlex_args[1], to_be: "hello world";
    expect "3. shlex_args[2]", shlex_args[2], to_be: "foo";

    # 4. backslash escapes a space outside quotes
    shlex_split "hello\\ world foo";
    expect "4. shlex_args[1]", shlex_args[1], to_be: "hello world";
    expect "4. shlex_args[2]", shlex_args[2], to_be: "foo";

    # 5. adjacent quoting concatenates into one token
    shlex_split "foo\"bar\"'baz'";
    expect "5. shlex_args[1]", shlex_args[1], to_be: "foobarbaz";
    expect "5. length",        length shlex_args, to_be: 1;

    # 6. backslash escape inside double quotes
    shlex_split "\"say \\\"hi\\\"\"";
    expect "6. shlex_args[1]", shlex_args[1], to_be: "say \"hi\"";

    # 7. single quotes treat backslash as literal
    shlex_split "'back\\slash'";
    expect "7. shlex_args[1]", shlex_args[1], to_be: "back\\slash";

    # 8. multiple spaces between tokens are collapsed
    shlex_split "a   b   c";
    expect "8. shlex_args[1]", shlex_args[1], to_be: "a";
    expect "8. shlex_args[2]", shlex_args[2], to_be: "b";
    expect "8. shlex_args[3]", shlex_args[3], to_be: "c";
    expect "8. length",        length shlex_args, to_be: 3;

    # 9. empty single-quoted string produces an empty token
    shlex_split "a '' b";
    expect "9. shlex_args[1]", shlex_args[1], to_be: "a";
    expect "9. shlex_args[2]", shlex_args[2], to_be: "";
    expect "9. shlex_args[3]", shlex_args[3], to_be: "b";

    # 10. flag-style token with = and quoted value
    shlex_split "--msg='fix bug'";
    expect "10. shlex_args[1]", shlex_args[1], to_be: "--msg=fix bug";
    expect "10. length",        length shlex_args, to_be: 1;

    # 11. only whitespace produces no tokens
    shlex_split "   ";
    expect "11. length", length shlex_args, to_be: 0;

    # 12. single token, no spaces
    shlex_split "hello";
    expect "12. shlex_args[1]", shlex_args[1], to_be: "hello";
    expect "12. length",        length shlex_args, to_be: 1;
}
