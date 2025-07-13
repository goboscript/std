proc test_string {
    assert_t strcmp("Hello, World!", "Hello, World!"), "strcmp(\"Hello, World!\", \"Hello, World!\")";
    assert_f strcmp("hello, world!", "Hello, World!"), "strcmp(\"hello, world!\", \"Hello, World!\")";

    assert_t startswith("Hello, World!", "Hello"), "startswith(\"Hello, World!\", \"Hello\")";
    assert_t startswith_from(8, "Hello, World!", "World!"), "startswith_from(8, \"Hello, World!\", \"World!\")";
    assert_t endswith("Hello, World!", "World!"), "endswith(\"Hello, World!\", \"World!\")";
    assert_t endswith_from(6, "Hello, World!", "Hello,"), "endswith_from(6, \"Hello, World!\", \"Hello,\")";
    assert zfill("FFF", 6), "000FFF", "zfill(\"FFF\", 6)";
    assert ljust("FFF", 6), "   FFF", "ljust(\"FFF\", 6)";
    assert ljust("FFF", 6, 1), "111FFF", "ljust(\"FFF\", 6, 1)";
    assert repstr("a", 3), "aaa", "repstr(\"a\", 3)";
    assert rjust("FFF", 6), "FFF   ", "rjust(\"FFF\", 6)";
    assert rjust("FFF", 6, 0), "FFF000", "rjust(\"FFF\", 6, 1)";
}
