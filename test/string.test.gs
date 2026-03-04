%include ../string.gs

proc test {

    # =========================================================================
    # str_slice
    # =========================================================================

    # Basic usage
    expect "str_slice('hello', 2, 4)", str_slice("hello", 2, 4), to_be: "ell";
    expect "str_slice('hello', 1, 5)", str_slice("hello", 1, 5), to_be: "hello";
    expect "str_slice('hello', 1, 1)", str_slice("hello", 1, 1), to_be: "h";
    expect "str_slice('hello', 5, 5)", str_slice("hello", 5, 5), to_be: "o";

    # Negative indices
    expect "str_slice('hello', -3)",   str_slice("hello", -3),   to_be: "llo";
    expect "str_slice('hello', -1)",   str_slice("hello", -1),   to_be: "o";
    expect "str_slice('hello', 2, -1)",str_slice("hello", 2, -1),to_be: "ello";
    expect "str_slice('hello', -3, -1)",str_slice("hello", -3, -1),to_be: "llo";
    expect "str_slice('hello', -5, -1)",str_slice("hello", -5, -1),to_be: "hello";

    # Default args (full string)
    expect "str_slice('hello')",       str_slice("hello"),       to_be: "hello";
    expect "str_slice('hello', 2)",    str_slice("hello", 2),    to_be: "ello";

    # Out-of-bounds clamping
    expect "str_slice('hello', 0, 3)", str_slice("hello", 0, 3), to_be: "hel";
    expect "str_slice('hello', 1, 99)",str_slice("hello", 1, 99),to_be: "hello";
    expect "str_slice('hello', 3, 99)",str_slice("hello", 3, 99),to_be: "llo";

    # Invalid range → empty
    expect "str_slice('hello', 4, 2)", str_slice("hello", 4, 2), to_be: "";
    expect "str_slice('hello', 6, 8)", str_slice("hello", 6, 8), to_be: "";
    expect "str_slice('',      1, 3)", str_slice("",      1, 3), to_be: "";

    # Single character string
    expect "str_slice('x', 1, 1)",     str_slice("x", 1, 1),     to_be: "x";
    expect "str_slice('x', 2, 3)",     str_slice("x", 2, 3),     to_be: "";

    # =========================================================================
    # str_ends_with
    # =========================================================================

    expect_true "str_ends_with('hello', 'lo')",    str_ends_with("hello", "lo");
    expect_true "str_ends_with('hello', 'hello')", str_ends_with("hello", "hello");
    expect_true "str_ends_with('hello', 'o')",     str_ends_with("hello", "o");
    expect_false "str_ends_with('hello', 'he')",    str_ends_with("hello", "he");
    expect_false "str_ends_with('hello', 'x')",     str_ends_with("hello", "x");
    expect_true "str_ends_with('hello', '')",      str_ends_with("hello", "");
    expect_true "str_ends_with('', '')",           str_ends_with("", "");

    # =========================================================================
    # str_starts_with
    # =========================================================================

    expect_true "str_starts_with('hello', 'he')",    str_starts_with("hello", "he");
    expect_true "str_starts_with('hello', 'hello')", str_starts_with("hello", "hello");
    expect_true "str_starts_with('hello', 'h')",     str_starts_with("hello", "h");
    expect_false "str_starts_with('hello', 'lo')",    str_starts_with("hello", "lo");
    expect_false "str_starts_with('hello', 'x')",     str_starts_with("hello", "x");
    expect_true "str_starts_with('hello', '')",      str_starts_with("hello", "");
    expect_true "str_starts_with('', '')",           str_starts_with("", "");

    # =========================================================================
    # str_reverse
    # =========================================================================

    expect "str_reverse('hello')",  str_reverse("hello"),  to_be: "olleh";
    expect "str_reverse('abcd')",   str_reverse("abcd"),   to_be: "dcba";
    expect "str_reverse('a')",      str_reverse("a"),      to_be: "a";
    expect "str_reverse('')",       str_reverse(""),       to_be: "";
    expect "str_reverse('ab')",     str_reverse("ab"),     to_be: "ba";
    expect "str_reverse('racecar')",str_reverse("racecar"),to_be: "racecar";
    expect "str_reverse('  hi')",   str_reverse("  hi"),   to_be: "ih  ";

    # =========================================================================
    # str_upper
    # =========================================================================

    expect "str_upper('hello')",   str_upper("hello"),   to_be: "HELLO";
    expect "str_upper('Hello!')",  str_upper("Hello!"),  to_be: "HELLO!";
    expect "str_upper('123')",     str_upper("123"),     to_be: "123";
    expect "str_upper('HELLO')",   str_upper("HELLO"),   to_be: "HELLO";
    expect "str_upper('')",        str_upper(""),        to_be: "";
    expect "str_upper('a1b2c3')",  str_upper("a1b2c3"),  to_be: "A1B2C3";
    expect "str_upper('hello world')", str_upper("hello world"), to_be: "HELLO WORLD";

    # =========================================================================
    # str_lower
    # =========================================================================

    expect "str_lower('HELLO')",   str_lower("HELLO"),   to_be: "hello";
    expect "str_lower('Hello!')",  str_lower("Hello!"),  to_be: "hello!";
    expect "str_lower('123')",     str_lower("123"),     to_be: "123";
    expect "str_lower('hello')",   str_lower("hello"),   to_be: "hello";
    expect "str_lower('')",        str_lower(""),        to_be: "";
    expect "str_lower('A1B2C3')",  str_lower("A1B2C3"),  to_be: "a1b2c3";
    expect "str_lower('HELLO WORLD')", str_lower("HELLO WORLD"), to_be: "hello world";

    # =========================================================================
    # str_capitalize
    # =========================================================================

    expect "str_capitalize('hello')",       str_capitalize("hello"),       to_be: "Hello";
    expect "str_capitalize('HELLO')",       str_capitalize("HELLO"),       to_be: "Hello";
    expect "str_capitalize('hELLO wORLD')", str_capitalize("hELLO wORLD"), to_be: "Hello world";
    expect "str_capitalize('a')",           str_capitalize("a"),           to_be: "A";
    expect "str_capitalize('ABC')",         str_capitalize("ABC"),         to_be: "Abc";
    expect "str_capitalize('123abc')",      str_capitalize("123abc"),      to_be: "123abc";

    # =========================================================================
    # str_title
    # =========================================================================

    expect "str_title('hello world')",    str_title("hello world"),    to_be: "Hello World";
    expect "str_title('HELLO WORLD')",    str_title("HELLO WORLD"),    to_be: "Hello World";
    expect "str_title('it is a test')",   str_title("it is a test"),   to_be: "It Is A Test";
    expect "str_title('one')",            str_title("one"),            to_be: "One";
    expect "str_title('')",              str_title(""),               to_be: "";
    expect "str_title('hello')",          str_title("hello"),          to_be: "Hello";
    # Non-alpha acts as word boundary
    expect "str_title('it\\'s a test')",  str_title("it's a test"),   to_be: "It'S A Test";
    expect "str_title('foo-bar')",        str_title("foo-bar"),        to_be: "Foo-Bar";

    # =========================================================================
    # str_repeat
    # =========================================================================

    expect "str_repeat('ab', 3)", str_repeat("ab", 3), to_be: "ababab";
    expect "str_repeat('hi', 1)", str_repeat("hi", 1), to_be: "hi";
    expect "str_repeat('x',  0)", str_repeat("x",  0), to_be: "";
    expect "str_repeat('',   5)", str_repeat("",   5), to_be: "";
    expect "str_repeat('abc',2)", str_repeat("abc",2), to_be: "abcabc";
    expect "str_repeat('-',  4)", str_repeat("-",  4), to_be: "----";

    # =========================================================================
    # str_split (results stored in list str_split)
    # =========================================================================

    str_split "a,b,c", ",";
    expect "str_split 'a,b,c' [1]", str_split[1], to_be: "a";
    expect "str_split 'a,b,c' [2]", str_split[2], to_be: "b";
    expect "str_split 'a,b,c' [3]", str_split[3], to_be: "c";
    expect "str_split 'a,b,c' len", length(str_split), to_be: "3";

    str_split "hello";
    expect "str_split 'hello' [1]",  str_split[1],       to_be: "hello";
    expect "str_split 'hello' len",  length(str_split),  to_be: "1";

    str_split "a,,b", ",";
    expect "str_split 'a,,b' [1]", str_split[1], to_be: "a";
    expect "str_split 'a,,b' [2]", str_split[2], to_be: "";
    expect "str_split 'a,,b' [3]", str_split[3], to_be: "b";
    expect "str_split 'a,,b' len", length(str_split), to_be: "3";

    str_split ",a,", ",";
    expect "str_split ',a,' [1]", str_split[1], to_be: "";
    expect "str_split ',a,' [2]", str_split[2], to_be: "a";
    expect "str_split ',a,' [3]", str_split[3], to_be: "";
    expect "str_split ',a,' len", length(str_split), to_be: "3";

    str_split "one two three";
    expect "str_split 'one two three' [1]", str_split[1], to_be: "one";
    expect "str_split 'one two three' [2]", str_split[2], to_be: "two";
    expect "str_split 'one two three' [3]", str_split[3], to_be: "three";

    # =========================================================================
    # str_split_lines
    # =========================================================================

    str_split_lines "a\nb\nc";
    expect "str_split_lines [1]", str_split_lines[1], to_be: "a";
    expect "str_split_lines [2]", str_split_lines[2], to_be: "b";
    expect "str_split_lines [3]", str_split_lines[3], to_be: "c";
    expect "str_split_lines len", length(str_split_lines), to_be: "3";

    # Trailing newline is ignored
    str_split_lines "end\n";
    expect "str_split_lines 'end\\n' [1]", str_split_lines[1], to_be: "end";
    expect "str_split_lines 'end\\n' len", length(str_split_lines), to_be: "1";

    str_split_lines "hello";
    expect "str_split_lines 'hello' [1]", str_split_lines[1], to_be: "hello";
    expect "str_split_lines 'hello' len", length(str_split_lines), to_be: "1";

    str_split_lines "a\n\nb";
    expect "str_split_lines 'a\\n\\nb' [1]", str_split_lines[1], to_be: "a";
    expect "str_split_lines 'a\\n\\nb' [2]", str_split_lines[2], to_be: "";
    expect "str_split_lines 'a\\n\\nb' [3]", str_split_lines[3], to_be: "b";

    # =========================================================================
    # str_truncate
    # =========================================================================

    expect "str_truncate('hello world', 8)",  str_truncate("hello world", 8),  to_be: "hello...";
    expect "str_truncate('hi', 10)",          str_truncate("hi", 10),          to_be: "hi";
    expect "str_truncate('abcdefg', 7)",      str_truncate("abcdefg", 7),      to_be: "abcdefg";
    expect "str_truncate('abcdefg', 6)",      str_truncate("abcdefg", 6),      to_be: "abc...";
    expect "str_truncate('abcdefg', 3)",      str_truncate("abcdefg", 3),      to_be: "...";
    expect "str_truncate('hi', 2)",           str_truncate("hi", 2),           to_be: "hi";
    expect "str_truncate('', 5)",             str_truncate("", 5),             to_be: "";

    # =========================================================================
    # str_count_char
    # =========================================================================

    expect "str_count_char('hello', 'lo')",  str_count_char("hello", "lo"),  to_be: "3";
    expect "str_count_char('aabbcc', 'ac')", str_count_char("aabbcc", "ac"), to_be: "4";
    expect "str_count_char('abc', 'xyz')",   str_count_char("abc", "xyz"),   to_be: "0";
    expect "str_count_char('', 'a')",        str_count_char("", "a"),        to_be: "0";
    expect "str_count_char('aaaa', 'a')",    str_count_char("aaaa", "a"),    to_be: "4";
    expect "str_count_char('hello', 'l')",   str_count_char("hello", "l"),   to_be: "2";
    expect "str_count_char('hello', 'aeiou')", str_count_char("hello", "aeiou"), to_be: "2";

    # =========================================================================
    # str_lstrip
    # =========================================================================

    expect "str_lstrip('  hello')",        str_lstrip("  hello"),        to_be: "hello";
    expect "str_lstrip('hello  ')",        str_lstrip("hello  "),        to_be: "hello  ";
    expect "str_lstrip('  hello  ')",      str_lstrip("  hello  "),      to_be: "hello  ";
    expect "str_lstrip('xxhello', 'x')",   str_lstrip("xxhello", "x"),   to_be: "hello";
    expect "str_lstrip('hello', 'x')",     str_lstrip("hello", "x"),     to_be: "hello";
    expect "str_lstrip('', 'x')",          str_lstrip("", "x"),          to_be: "";
    expect "str_lstrip('\t\nhello')",      str_lstrip("\t\nhello"),      to_be: "hello";

    # =========================================================================
    # str_rstrip
    # =========================================================================

    expect "str_rstrip('hello  ')",        str_rstrip("hello  "),        to_be: "hello";
    expect "str_rstrip('  hello')",        str_rstrip("  hello"),        to_be: "  hello";
    expect "str_rstrip('  hello  ')",      str_rstrip("  hello  "),      to_be: "  hello";
    expect "str_rstrip('helloxx', 'x')",   str_rstrip("helloxx", "x"),   to_be: "hello";
    expect "str_rstrip('hello', 'x')",     str_rstrip("hello", "x"),     to_be: "hello";
    expect "str_rstrip('', 'x')",          str_rstrip("", "x"),          to_be: "";
    expect "str_rstrip('hello\t\n')",      str_rstrip("hello\t\n"),      to_be: "hello";

    # =========================================================================
    # str_strip
    # =========================================================================

    expect "str_strip('  hello  ')",       str_strip("  hello  "),       to_be: "hello";
    expect "str_strip('hello')",           str_strip("hello"),           to_be: "hello";
    expect "str_strip('xxhelloxx', 'x')",  str_strip("xxhelloxx", "x"),  to_be: "hello";
    expect "str_strip('  hello')",         str_strip("  hello"),         to_be: "hello";
    expect "str_strip('hello  ')",         str_strip("hello  "),         to_be: "hello";
    expect "str_strip('')",                str_strip(""),                to_be: "";
    expect "str_strip('\t hello \n')",     str_strip("\t hello \n"),     to_be: "hello";

    # =========================================================================
    # str_is_alnum
    # =========================================================================

    expect_true "str_is_alnum('abc123')",  str_is_alnum("abc123");
    expect_true "str_is_alnum('ABC123')",  str_is_alnum("ABC123");
    expect_true "str_is_alnum('abc')",     str_is_alnum("abc");
    expect_true "str_is_alnum('123')",     str_is_alnum("123");
    expect_false "str_is_alnum('abc!')",    str_is_alnum("abc!");
    expect_false "str_is_alnum('abc 123')", str_is_alnum("abc 123");
    expect_false "str_is_alnum('')",        str_is_alnum("");

    # =========================================================================
    # str_is_alpha
    # =========================================================================

    expect_true "str_is_alpha('hello')",   str_is_alpha("hello");
    expect_true "str_is_alpha('HELLO')",   str_is_alpha("HELLO");
    expect_true "str_is_alpha('Hello')",   str_is_alpha("Hello");
    expect_false "str_is_alpha('hello1')",  str_is_alpha("hello1");
    expect_false "str_is_alpha('hello!')",  str_is_alpha("hello!");
    expect_false "str_is_alpha('123')",     str_is_alpha("123");
    expect_false "str_is_alpha('')",        str_is_alpha("");

    # =========================================================================
    # str_is_digit
    # =========================================================================

    expect_true "str_is_digit('42')",      str_is_digit("42");
    expect_true "str_is_digit('0')",       str_is_digit("0");
    expect_true "str_is_digit('-5')",      str_is_digit("-5");
    expect_false "str_is_digit('3.14')",    str_is_digit("3.14");
    expect_false "str_is_digit('hello')",   str_is_digit("hello");
    expect_false "str_is_digit('12abc')",   str_is_digit("12abc");
    expect_false "str_is_digit('')",        str_is_digit("");

    # =========================================================================
    # str_find_char
    # =========================================================================

    expect "str_find_char('hello', 'l')",  str_find_char("hello", "l"),  to_be: "3";
    expect "str_find_char('hello', 'h')",  str_find_char("hello", "h"),  to_be: "1";
    expect "str_find_char('hello', 'o')",  str_find_char("hello", "o"),  to_be: "5";
    expect "str_find_char('hello', 'z')",  str_find_char("hello", "z"),  to_be: "0";
    expect "str_find_char('abca', 'a')",   str_find_char("abca", "a"),   to_be: "1";
    expect "str_find_char('', 'a')",       str_find_char("", "a"),       to_be: "0";

    # =========================================================================
    # str_rfind_char
    # =========================================================================

    expect "str_rfind_char('hello', 'l')",  str_rfind_char("hello", "l"),  to_be: "4";
    expect "str_rfind_char('hello', 'h')",  str_rfind_char("hello", "h"),  to_be: "1";
    expect "str_rfind_char('hello', 'o')",  str_rfind_char("hello", "o"),  to_be: "5";
    expect "str_rfind_char('hello', 'z')",  str_rfind_char("hello", "z"),  to_be: "0";
    expect "str_rfind_char('abca', 'a')",   str_rfind_char("abca", "a"),   to_be: "4";
    expect "str_rfind_char('', 'a')",       str_rfind_char("", "a"),       to_be: "0";

    # =========================================================================
    # str_splice
    # =========================================================================

    expect "str_splice('hello world', 6)",          str_splice("hello world", 6),          to_be: "hello";
    expect "str_splice('hello world', 6, 5)",       str_splice("hello world", 6, 5),       to_be: "hello ";
    expect "str_splice('hello world', 6, 5, '!')",  str_splice("hello world", 6, 5, "!"),  to_be: "hello !";
    expect "str_splice('hello', 1)",                str_splice("hello", 1),                to_be: "";
    expect "str_splice('hello', 3, 1)",             str_splice("hello", 3, 1),             to_be: "helo";
    expect "str_splice('hello', 3, 1, 'XY')",       str_splice("hello", 3, 1, "XY"),       to_be: "heXYlo";
    expect "str_splice('hello', 6, 0, '!')",        str_splice("hello", 6, 0, "!"),        to_be: "hello!";
    expect "str_splice('abcde', 2, 3, 'Z')",        str_splice("abcde", 2, 3, "Z"),        to_be: "aZe";

    # =========================================================================
    # str_replace
    # =========================================================================

    expect "str_replace('aabbaa', 'aa', 'X')",    str_replace("aabbaa", "aa", "X"),    to_be: "XbbX";
    expect "str_replace('hello', 'l', 'r')",      str_replace("hello", "l", "r"),      to_be: "herro";
    expect "str_replace('hello', 'z', 'r')",      str_replace("hello", "z", "r"),      to_be: "hello";
    expect "str_replace('hello', 'hello', '')",   str_replace("hello", "hello", ""),   to_be: "";
    expect "str_replace('aaaa', 'aa', 'X')",      str_replace("aaaa", "aa", "X"),      to_be: "XX";
    expect "str_replace('', 'a', 'b')",           str_replace("", "a", "b"),           to_be: "";
    expect "str_replace('abc', 'b', 'BB')",       str_replace("abc", "b", "BB"),       to_be: "aBBc";

    # =========================================================================
    # str_replacen
    # =========================================================================

    expect "str_replacen('aabbaa', 'aa', 'X', 1)", str_replacen("aabbaa", "aa", "X", 1), to_be: "Xbbaa";
    expect "str_replacen('aabbaa', 'aa', 'X', 2)", str_replacen("aabbaa", "aa", "X", 2), to_be: "XbbX";
    expect "str_replacen('hello',  'l',  'r', 0)", str_replacen("hello",  "l",  "r", 0), to_be: "hello";
    expect "str_replacen('hello',  'l',  'r', 1)", str_replacen("hello",  "l",  "r", 1), to_be: "herlo";
    expect "str_replacen('aaaa', 'a', 'X', 3)",    str_replacen("aaaa", "a", "X", 3),    to_be: "XXXa";
    expect "str_replacen('abc', 'z', 'X', 5)",     str_replacen("abc", "z", "X", 5),     to_be: "abc";

    # =========================================================================
    # str_replacenth
    # =========================================================================

    expect "str_replacenth('aabbaa', 'aa', 'X', 1)", str_replacenth("aabbaa", "aa", "X", 1), to_be: "Xbbaa";
    expect "str_replacenth('aabbaa', 'aa', 'X', 2)", str_replacenth("aabbaa", "aa", "X", 2), to_be: "aabbX";
    expect "str_replacenth('hello',  'l',  'r', 2)", str_replacenth("hello",  "l",  "r", 2), to_be: "helro";
    expect "str_replacenth('hello',  'l',  'r', 1)", str_replacenth("hello",  "l",  "r", 1), to_be: "herlo";
    expect "str_replacenth('aaaa', 'a', 'X', 3)",    str_replacenth("aaaa", "a", "X", 3),    to_be: "aaXa";
    # Fewer occurrences than n → unchanged
    expect "str_replacenth('hello', 'z', 'X', 1)",   str_replacenth("hello", "z", "X", 1),   to_be: "hello";

    # =========================================================================
    # str_remove_prefix
    # =========================================================================

    expect "str_remove_prefix('hello world', 'hello ')", str_remove_prefix("hello world", "hello "), to_be: "world";
    expect "str_remove_prefix('hello world', 'world')",  str_remove_prefix("hello world", "world"),  to_be: "hello world";
    expect "str_remove_prefix('hello', '')",             str_remove_prefix("hello", ""),             to_be: "hello";
    expect "str_remove_prefix('hello', 'hello')",        str_remove_prefix("hello", "hello"),        to_be: "";
    expect "str_remove_prefix('hello', 'xyz')",          str_remove_prefix("hello", "xyz"),          to_be: "hello";
    expect "str_remove_prefix('aabaa', 'aa')",           str_remove_prefix("aabaa", "aa"),           to_be: "baa";

    # =========================================================================
    # str_remove_suffix
    # =========================================================================

    expect "str_remove_suffix('hello world', ' world')", str_remove_suffix("hello world", " world"), to_be: "hello";
    expect "str_remove_suffix('hello world', 'hello')",  str_remove_suffix("hello world", "hello"),  to_be: "hello world";
    expect "str_remove_suffix('hello', '')",             str_remove_suffix("hello", ""),             to_be: "hello";
    expect "str_remove_suffix('hello', 'hello')",        str_remove_suffix("hello", "hello"),        to_be: "";
    expect "str_remove_suffix('hello', 'xyz')",          str_remove_suffix("hello", "xyz"),          to_be: "hello";
    expect "str_remove_suffix('aabaa', 'aa')",           str_remove_suffix("aabaa", "aa"),           to_be: "aab";

    # =========================================================================
    # str_find
    # =========================================================================

    expect "str_find('hello world', 'world')",  str_find("hello world", "world"),  to_be: "7";
    expect "str_find('hello world', 'hello')",  str_find("hello world", "hello"),  to_be: "1";
    expect "str_find('hello world', ' ')",      str_find("hello world", " "),      to_be: "6";
    expect "str_find('hello world', 'xyz')",    str_find("hello world", "xyz"),    to_be: "0";
    expect "str_find('aabaa', 'aa')",           str_find("aabaa", "aa"),           to_be: "1";
    expect "str_find('hello', 'hello')",        str_find("hello", "hello"),        to_be: "1";
    expect "str_find('hello', 'helloo')",       str_find("hello", "helloo"),       to_be: "0";
    expect "str_find('', 'a')",                 str_find("", "a"),                 to_be: "0";
    expect "str_find('abcabc', 'bc')",          str_find("abcabc", "bc"),          to_be: "2";
    expect "str_find('hello', 'o')",            str_find("hello", "o"),            to_be: "5";
}
