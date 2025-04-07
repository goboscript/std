%include ../math
%include ../string
%include ../list
%include ../emoji
%include ../cskv
%include ../cmd

list console;

%define ASSERT_EQ(LEFT,RIGHT,MESSAGE)                                                  \
    if not casecmp(""&(LEFT), ""&(RIGHT)) {                                            \
        add (MESSAGE)&" should be equal to "&(RIGHT)&", but it is "&(LEFT) to console; \ 
    }

costumes "blank.svg" as "@ascii/";

list things;

struct point {x, y}

list point points;

proc test {
    # math
    ASSERT_EQ(MIN(1, 2), 1, "MIN(1, 2)");
    ASSERT_EQ(MAX(1, 2), 2, "MAX(1, 2)");
    ASSERT_EQ(RGB(255, 0, 0), 16711680, "RGB(255, 0, 0)");
    ASSERT_EQ(RGBA(255, 0, 0, 0.5), 25100288, "RGBA(255, 0, 0, 0.5)");
    ASSERT_EQ(HEX("FF"), 255, "HEX(\"FF\") should be ");
    ASSERT_EQ(BIN("11111111"), 255, "BIN(\"11111111\")");
    ASSERT_EQ(OCT("377"), 255, "OCT(\"377\")");
    ASSERT_EQ(ACOSH(2), 1.3169578969248166, "ACOSH(2)");
    ASSERT_EQ(ASINH(2), 1.4436354751788103, "ASINH(2)");
    ASSERT_EQ(ATANH(0.5), 0.5493061443340548, "ATANH(0.5)");
    ASSERT_EQ(COSH(2), 3.7621956910836314, "COSH(2)");
    ASSERT_EQ(SINH(2), 3.626860407847019, "SINH(2)");
    ASSERT_EQ(TANH(1), 0.7615941559557649, "TANH(1)");
    ASSERT_EQ(DIST(0, 0, 1, 1), 1.4142135623730951, "DIST(0, 0, 1, 1)");
    ASSERT_EQ(MAG(1, 1), 1.4142135623730951, "MAG(1, 1)");
    ASSERT_EQ(GAMMA(5), 2.0783258451246165, "GAMMA(5)");
    ASSERT_EQ(POSITIVE_CLAMP(-1), 0, "POSITIVE_CLAMP(-1)");
    ASSERT_EQ(NEGATIVE_CLAMP(1), 0, "NEGATIVE_CLAMP(1)");
    ASSERT_EQ(CLAMP(1, 0, 2), 1, "CLAMP(1, 0, 2)");
    ASSERT_EQ(CLAMP(-1, 0, 2), 0, "CLAMP(-1, 0, 2)");
    ASSERT_EQ(BIT(0, 255), 255, "BIT(0, 255)");
    ASSERT_EQ(LERP(0, 1, 0.5), 0.5, "LERP(0, 1, 0.5)");
    ASSERT_EQ(MAP(0, 1, 50, 100, 0.5), 75, "MAP(0, 1, 50, 100, 0.5)");
    ASSERT_EQ(RAD("90"), PI/2, "RAD(90)");
    ASSERT_EQ(DEG(PI/"2"), 90, "DEG(PI/2)");
    ASSERT_EQ(SIGN(123), 1, "SIGN(123)")
    ASSERT_EQ(SIGN(0), 0, "SIGN(0)")
    ASSERT_EQ(SIGN(-456), -1, "SIGN(-456)")
    ASSERT_EQ(safepow(3, 4), 81, "safepow(3, 4)")
    ASSERT_EQ(safepow(-3, 3), -27, "safepow(-3, 3)")
    ASSERT_EQ(safepow(4, -2), 0.0625, "safepow(4, -2)")
    ASSERT_EQ(atan2(5, 4), 51.34019174590991, "ATAN2(5, 4)")
    ASSERT_EQ(DIR(50, 50, 25, 25), 45, "DIR(50, 50, 25, 25)")

    # string
    ASSERT_EQ(countchar("AAA", "A"), 3, "countchar(...)");
    ASSERT_EQ(countchar("AAA", "B"), 0, "countchar(...)");
    ASSERT_EQ(countchars("AAA", "A"), 3, "countchars(...)");
    ASSERT_EQ(countchars("AAA", "B"), 0, "countchars(...)");
    ASSERT_EQ(slice("hello world", 1, 6), "hello", "slice(...)");
    ASSERT_EQ(slice("hello world", 7, 12), "world", "slice(...)");
    ASSERT_EQ(replace("lollollyllylollylly", "lolly", "LO"), "lolLOllyLOlly", "replace(...)");
    ASSERT_EQ(replacen("one one one", "one", "two", 2), "two two one", "lreplacen(...)");
    ASSERT_EQ(replacenth("one one one", "one", "two", 2), "one two one", "replacenth(...)");
    ASSERT_EQ(splice("hello world", 7, 5, "universe"), "hello universe", "1 splice(...)");
    ASSERT_EQ(splice("hello world", 7, 5, ""), "hello ", "2 splice(...)");
    ASSERT_EQ(uppercase("hello world"), "HELLO WORLD", "uppercase(...)");
    ASSERT_EQ(lowercase("HELLO WORLD"), "hello world", "lowercase(...)");
    ASSERT_EQ(capitalize("HELLO World"), "Hello world", "capitalize(...)");
    ASSERT_EQ(findchar("hello world", "l"), 3, "1 findchar(...)");
    ASSERT_EQ(findchar("hello world", "x"), 0, "2 findchar(...)");
    ASSERT_EQ(rfindchar("hello world", "l"), 10, "1 rfindchar(...)");
    ASSERT_EQ(rfindchar("hello world", "x"), 0, "2 rfindchar(...)");
    ASSERT_EQ(isalnum("Abc123"), true, "1 isalnum(...)");
    ASSERT_EQ(isalnum("Abc123!@#"), false, "2 isalnum(...)");
    ASSERT_EQ(isalnum(""), false, "3 isalnum(...)");
    ASSERT_EQ(isalpha("Abc"), true, "1 isalpha(...)");
    ASSERT_EQ(isalpha("Abc123"), false, "2 isalpha(...)");
    ASSERT_EQ(isalpha(""), false, "2 isalpha(...)");
    ASSERT_EQ(lstrip("www.example.com", "w."), "example.com", "1 lstrip(...)");
    ASSERT_EQ(lstrip("     hello     ", " "), "hello     ", "2 lstrip(...)");
    ASSERT_EQ(rstrip("www.example.com", ".com"), "www.example", "1 rstrip(...)");
    ASSERT_EQ(rstrip("     hello     ", " "), "     hello", "2 rstrip(...)");
    ASSERT_EQ(strip("  <HELLO>  ", "< >"), "HELLO", "strip(...)");
    split "one,two,three,four,five", ",";
    ASSERT_EQ(split[1], "one", "split(...)[1]");
    ASSERT_EQ(split[2], "two", "split(...)[2]");
    ASSERT_EQ(split[3], "three", "split(...)[3]");
    ASSERT_EQ(split[4], "four", "split(...)[4]");
    ASSERT_EQ(split[5], "five", "split(...)[5]");
    JOIN(split, ",", joined);
    ASSERT_EQ(joined, "one,two,three,four,five", "JOIN(...)");
    ASSERT_EQ(reverse("hello"), "olleh", "reverse(...)");
    ASSERT_EQ(repeatstr("hello", 3), "hellohellohello", "repeatstr(...)");
    ASSERT_EQ(titlecase("hello world"), "Hello World", "titlecase(...)");
    splitlines "";
    ASSERT_EQ(length(split), 0, "1 splitlines(...)");
    splitlines "Two lines\n";
    ASSERT_EQ(length(split), 1, "1 splitlines(...)");
    ASSERT_EQ(split[1], "Two lines", "1 splitlines(...)");
    ASSERT_EQ(truncate("Hello world!", 12), "Hello world!", "1 shorten(...)");
    ASSERT_EQ(truncate("Hello world!", 11), "Hello ...", "2 shorten(...)");
    ASSERT_EQ(truncate("Hello world!", 10), "Hello...", "3 shorten(...)");
    ASSERT_EQ(zfill("ABC", 6), "000ABC", "zfill(\"ABC\", 6)")
    # list
    split "5,3,1,2,4", ",";
    INSERTION_SORT(split);
    JOIN(split, ",", joined);
    ASSERT_EQ(joined, "1,2,3,4,5", "INSERTION_SORT(...)");
    delete points;
    add point { x: 2, y: 200 } to points;
    add point { x: 1, y: 100 } to points;
    add point { x: 4, y: 400 } to points;
    add point { x: 3, y: 300 } to points;
    INSERTION_SORT_BY_FIELD(point, points, .x);
    ASSERT_EQ(points[1].x, 1, "INSERTION_SORT_BY_FIELD(...)[1]");
    ASSERT_EQ(points[2].x, 2, "INSERTION_SORT_BY_FIELD(...)[2]");
    ASSERT_EQ(points[3].x, 3, "INSERTION_SORT_BY_FIELD(...)[3]");
    ASSERT_EQ(points[4].x, 4, "INSERTION_SORT_BY_FIELD(...)[4]");
    split "1,2,3,4,5", ",";
    COUNT(split, split[i] % 2 == 0, count);
    ASSERT_EQ(count, 2, "COUNT(...)");
    SUM(split, split[i] % 2 == 0, sum);
    ASSERT_EQ(sum, 6, "SUM(...)");
    JOIN_BY_FIELD(points, .x, ",", joined);
    ASSERT_EQ(joined, "1,2,3,4", "JOIN_BY_FIELD(...)");
    FINDMAX(split, split[i] % 2 == 0, max);
    ASSERT_EQ(max, 4, "FINDMAX(...)");
    FINDMIN(split, split[i] % 2 == 0, min);
    ASSERT_EQ(min, 2, "FINDMIN(...)");
    REVERSE(split);
    JOIN(split, ",", joined);
    ASSERT_EQ(joined, "5,4,3,2,1", "REVERSE(...)");
    COPY(split, things);
    JOIN(things, ",", joined);
    ASSERT_EQ(joined, "5,4,3,2,1", "COPY(...)");
    EXTEND(split, things);
    JOIN(things, ",", joined);
    ASSERT_EQ(joined, "5,4,3,2,1,5,4,3,2,1", "EXTEND(...)");
    UNIQUE(split);
    JOIN(split, ",", joined);
    ASSERT_EQ(joined, "5,4,3,2,1", "UNIQUE(...)");
    SUM_BY_FIELD(points, .x, points[i].x % 2 == 0, sum);
    ASSERT_EQ(sum, 6, "SUM_BY_FIELD(...)");
    # TODO [BLOCKED BY]: https://github.com/aspizu/goboscript/issues/71
    #FINDMAX_BY_FIELD(point, points, .x, points[i] % 2 == 0, pmax);
    #ASSERT_EQ(pmax.x, 4, "FINDMAX_BY_FIELD(...)");
    #FINDMIN_BY_FIELD(point, points, .x, points[i] % 2 == 0, pmin);
    #ASSERT_EQ(pmin.x, 2, "FINDMIN_BY_FIELD(...)");
    add point { x: 2, y: 200 } to points;
    add point { x: 1, y: 100 } to points;
    add point { x: 4, y: 400 } to points;
    UNIQUE_BY_FIELD(points, .x);
    JOIN_BY_FIELD(points, .x, ",", joined);
    ASSERT_EQ(joined, "1,2,3,4", "UNIQUE_BY_FIELD(...)");
    ASSERT_EQ(ENDSWITH("hello world", "world"), "true", "1 ENDSWITH(...)");
    ASSERT_EQ(ENDSWITH("hello world", "hello"), "false", "2 ENDSWITH(...)");
    ASSERT_EQ(STARTSWITH("hello world", "hello"), "true", "1 STARTSWITH(...)");
    ASSERT_EQ(STARTSWITH("hello world", "world"), "false", "2 STARTSWITH(...)");
    ASSERT_EQ(REMOVEPREFIX("hello world", "hello"), " world", "REMOVEPREFIX(...)");
    ASSERT_EQ(REMOVESUFFIX("hello world", "world"), "hello ", "REMOVESUFFIX(...)");
    # emoji
    if EMOJI("football") != "🏈" {
        add "football" to console;
    }
    if EMOJI("ping_pong") != "🏓" {
        add "ping_pong" to console;
    }
    if EMOJI("soccer") != "⚽" {
        add "soccer" to console;
    }
    if EMOJI("basketball") != "🏀" {
        add "basketball" to console;
    }
    # cskv
    cskv_unpack "a:1,b:2,array:3,A,B,C,c:3";
    ASSERT_EQ(cskv_pack(), "a:1,b:2,array:3,A,B,C,c:3", "cskv_pack(...)");
    # cmd
    local cmd = "echo -n 'Multiple \\' words'; echo -n 'Single \\\\' word' \\' \\;";
    i = cmd_next(1, cmd);
    ASSERT_EQ(cmd_args[1], "echo", "cmd_args[1]");
    ASSERT_EQ(cmd_args[2], "-n", "cmd_args[2]");
    ASSERT_EQ(cmd_args[3], "Multiple \\' words", "cmd_args[3]");
    i = cmd_next(i, cmd);
    ASSERT_EQ(cmd_args[1], "echo", "cmd_args[1]");
    ASSERT_EQ(cmd_args[2], "-n", "cmd_args[2]");
    ASSERT_EQ(cmd_args[3], "Single \\\\' word", "cmd_args[3]");
    ASSERT_EQ(cmd_args[4], "'", "cmd_args[4]");
    ASSERT_EQ(cmd_args[5], ";", "cmd_args[5]");
}

onflag {
    delete console;
    show console;
    test;
}
