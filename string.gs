%define ASCII_UPPERCASE "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
%define ASCII_LOWERCASE "abcdefghijklmnopqrstuvwxyz"
%define ASCII_DIGITS "0123456789"

%define strbuf std__string__strbuf

list strbuf;

# Returns a substring of $text from $start to $end (inclusive).
# Negative indices count from the end of the string (-1 = last character).
# If $start or $end are out of bounds, they are clamped to the string length.
# If the range is invalid, an empty string is returned.
#
# @param {string} text - The string to slice.
# @param {number} start - The start index (default: 1).
# @param {number} end - The end index, inclusive (default: -1).
# @returns {string} The substring, or "" if the range is invalid.
#
# @example str_slice("hello", 2, 4) => "ell"
# @example str_slice("hello", -3)   => "llo"
# @example str_slice("hello", 2)    => "ello"
# @example str_slice("hello")       => "hello"
func str_slice(text, start=1, end=-1) {
    local start = $start;
    local end = $end;
    if start < 0 {
        start = length($text) + start + 1;
    }
    if end < 0 {
        end = length($text) + end + 1;
    }
    if start < 1 {
        start = 1;
    }
    if end > length($text) {
        end = length($text);
    }
    if end < 1 or start > length($text) or end < start {
        return "";
    }
    delete strbuf;
    repeat end - start + 1 {
        add $text[start + length(strbuf)] to strbuf;
    }
    return strbuf;
}

# Returns true if $text ends with the given $suffix, false otherwise.
# The check is NOT case-sensitive.
#
# @param {string} text - The string to check.
# @param {string} suffix - The suffix to look for at the end of $text.
# @returns {boolean} True if $text ends with $suffix, false otherwise.
#
# @example str_ends_with("hello", "lo")  => true
# @example str_ends_with("hello", "he")  => false
# @example str_ends_with("hello", "")    => true
func str_ends_with(text, suffix) {
    if $suffix == "" { return true; }
    return str_slice($text, -length($suffix)) == $suffix;
}

# Returns true if $text begins with the given $prefix, false otherwise.
# The check is NOT case-sensitive.
#
# @param {string} text - The string to check.
# @param {string} prefix - The prefix to look for at the start of $text.
# @returns {boolean} True if $text starts with $prefix, false otherwise.
#
# @example str_starts_with("hello", "he")  => true
# @example str_starts_with("hello", "lo")  => false
# @example str_starts_with("hello", "")    => true
func str_starts_with(text, prefix) {
    return str_slice($text, 1, length($prefix)) == $prefix;
}

# Returns a copy of $text with its characters in reverse order.
#
# @param {string} text - The string to reverse.
# @returns {string} The reversed string.
#
# @example str_reverse("hello")  => "olleh"
# @example str_reverse("abcd")   => "dcba"
# @example str_reverse("")       => ""
func str_reverse(text) {
    delete strbuf;
    local i = 1;
    repeat length($text) {
        add $text[1+length($text)-i] to strbuf;
        i++;
    }
    return strbuf;
}

# Returns a copy of $text with all ASCII lowercase letters converted to uppercase.
# Non-alphabetic characters are left unchanged.
#
# @param {string} text - The string to convert.
# @returns {string} The uppercased string.
#
# @example str_upper("hello")   => "HELLO"
# @example str_upper("Hello!")  => "HELLO!"
# @example str_upper("123")     => "123"
func str_upper(text) {
    delete strbuf;
    repeat length($text) {
        local i = 1;
        until $text[1+length(strbuf)] == ASCII_UPPERCASE[i] or i > 26 {
            i++;
        }
        if i > 26 {
            add $text[1+length(strbuf)] to strbuf;
        } else {
            add ASCII_UPPERCASE[i] to strbuf;
        }
    }
    return strbuf;
}

# Returns a copy of $text with all ASCII uppercase letters converted to lowercase.
# Non-alphabetic characters are left unchanged.
#
# @param {string} text - The string to convert.
# @returns {string} The lowercased string.
#
# @example str_lower("HELLO")   => "hello"
# @example str_lower("Hello!")  => "hello!"
# @example str_lower("123")     => "123"
func str_lower(text) {
    delete strbuf;
    repeat length($text) {
        local i = 1;
        until $text[1+length(strbuf)] == ASCII_UPPERCASE[i] or i > 26 {
            i++;
        }
        if i > 26 {
            add $text[1+length(strbuf)] to strbuf;
        } else {
            add ASCII_LOWERCASE[i] to strbuf;
        }
    }
    return strbuf;
}

# Returns a copy of $text with the first character uppercased and all
# remaining characters lowercased. Non-alphabetic characters are unchanged.
#
# @param {string} text - The string to capitalize.
# @returns {string} The capitalized string.
#
# @example str_capitalize("hello")       => "Hello"
# @example str_capitalize("HELLO")       => "Hello"
# @example str_capitalize("hELLO wORLD") => "Hello world"
func str_capitalize(text) {
    delete strbuf;
    local i = 1;
    until $text[1] == ASCII_UPPERCASE[i] or i > 26 {
        i++;
    }
    if i > 26 {
        add $text[1] to strbuf;
    } else {
        add ASCII_UPPERCASE[i] to strbuf;
    }
    repeat length($text)-1 {
        local i = 1;
        until $text[1+length(strbuf)] == ASCII_UPPERCASE[i] or i > 26 {
            i++;
        }
        if i > 26 {
            add $text[1+length(strbuf)] to strbuf;
        } else {
            add ASCII_LOWERCASE[i] to strbuf;
        }
    }
    return strbuf;
}

# Returns a copy of $text in title case: the first letter of each word is
# uppercased and subsequent letters are lowercased. A "word" is defined as
# a sequence of ASCII alphabetic characters; non-alpha characters act as
# word boundaries and are passed through unchanged.
#
# @param {string} text - The string to convert to title case.
# @returns {string} The title-cased string.
#
# @example str_title("hello world")  => "Hello World"
# @example str_title("HELLO WORLD")  => "Hello World"
# @example str_title("it's a test")  => "It'S A Test"
func str_title(text) {
    local result = "";
    local i = 1;
    local boundary = false;
    repeat length($text) {
        local j = 1;
        until $text[i] == ASCII_UPPERCASE[j] or j > 26 {
            j++;
        }
        if j > 26 {
            boundary = false;
            result &= $text[i];
        } else {
            if boundary == false {
                boundary = true;
                result &= ASCII_UPPERCASE[j];
            } else {
                result &= ASCII_LOWERCASE[j];
            }
        }
        i++;
    }
    return result;
}

# Returns a new string consisting of $text repeated $n times.
# If $n is 0 or negative, an empty string is returned.
#
# @param {string} text - The string to repeat.
# @param {number} n - The number of times to repeat $text.
# @returns {string} The repeated string.
#
# @example str_repeat("ab", 3)  => "ababab"
# @example str_repeat("hi", 1)  => "hi"
# @example str_repeat("x", 0)   => ""
func str_repeat(text, n) {
    local result = "";
    repeat $n {
        result &= $text;
    }
    return result;
}

# Returns true if strings $a and $b are equal (same length and identical
# characters), false otherwise. Uses costume-switching to perform an
# ordinal character-by-character comparison: each character is mapped to
# its corresponding ASCII costume index, allowing exact case-sensitive
# matching for all printable ASCII characters.
# Requires costumes to be defined with:
#   costumes "blank.svg" as "@ascii/";
#
# @param {string} a - The first string to compare.
# @param {string} b - The second string to compare.
# @returns {boolean} True if $a and $b are identical, false otherwise.
#
# @example str_eq("hello", "hello")  => true
# @example str_eq("hello", "Hello")  => false
# @example str_eq("abc", "ab")       => false
func str_eq(a, b) {
    if length($a) != length($b) {
        return false;
    }
    local i = 1;
    repeat length($a) {
        switch_costume $a;
        local c = costume_number();
        switch_costume $b;
        if c != costume_number() {
            return false;
        }
        i++;
    }
    return true;
}

# Splits $text into a list of substrings separated by $sep and stores the
# result in the list `str_split`. Consecutive separators produce
# empty-string entries. If $sep does not appear, `str_split` contains
# only $text as its single item.
#
# @param {string} text - The string to split.
# @param {string} sep  - The separator character (default: " ").
# @returns {void} Results are stored in the list `str_split`.
#
# @example str_split "a,b,c", ",";  => str_split = ["a", "b", "c"]
# @example str_split "hello";       => str_split = ["hello"]
# @example str_split "a,,b", ",";   => str_split = ["a", "", "b"]
list str_split;

proc str_split text, sep=" " {
    delete str_split;
    delete strbuf;
    local i = 1;
    repeat length($text) {
        if $text[i] == $sep {
            add strbuf to str_split;
            delete strbuf;
        } else {
            add $text[i] to strbuf;
        }
        i++;
    }
    add strbuf to str_split;
}

# Splits $text into individual lines using LF (\n) as line
# endings and stores the result in the list `str_split_lines`.
# 
# @param {string} text - The string to split into lines.
# @returns {void} Results are stored in the list `str_split_lines`.
#
# @example str_split_lines "a\nb\nc";  => str_split_lines = ["a", "b", "c"]
# @example str_split_lines "end\n";    => str_split_lines = ["end"]
list str_split_lines;

proc str_split_lines text {
    delete str_split_lines;
    delete strbuf;
    local i = 1;
    repeat length($text) {
        if $text[i] in "\n" {
            add strbuf to str_split_lines;
            delete strbuf;
        } else {
            add $text[i] to strbuf;
        }
        i++;
    }
    if strbuf == "" {} else {
        add strbuf to str_split_lines;
    }
}

# Returns $text truncated to at most $maxlength characters. If truncation
# is necessary, the returned string ends with "..." and its total length
# equals $maxlength (i.e. $maxlength - 3 characters of original text plus
# the three-character ellipsis). If $text is already within the limit, it
# is returned unchanged.
#
# @param {string} text      - The string to truncate.
# @param {number} maxlength - The maximum allowed length of the result.
# @returns {string} The original string, or a truncated string ending in "...".
#
# @example str_truncate("hello world", 8)  => "hello..."
# @example str_truncate("hi", 10)          => "hi"
# @example str_truncate("abcdefg", 7)      => "abcdefg"
func str_truncate(text, maxlength) {
    if length($text) > $maxlength {
        return str_slice($text, 1, $maxlength - 3) & "...";
    } else {
        return $text;
    }
}

# Counts how many characters in $text are also present in the $chars set.
# Each character position in $text is checked independently; $chars acts
# as an unordered set of allowed characters, not a substring pattern.
#
# @param {string} text  - The string to scan.
# @param {string} chars - A string of characters to count occurrences of.
# @returns {number} The total count of characters in $text that appear in $chars.
#
# @example str_count_char("hello", "lo")   => 3  (l, l, o)
# @example str_count_char("aabbcc", "ac")  => 4
# @example str_count_char("abc", "xyz")    => 0
func str_count_char(text, chars) {
    local i = 1;
    local count = 0;
    repeat length($text) {
        if $text[i] in $chars {
            count++;
        }
        i++;
    }
    return count;
}

# Returns a copy of $text with leading characters that appear in $chars
# removed. Stripping stops as soon as a character not in $chars is found.
# By default, strips ASCII whitespace (space, tab, newline, carriage return).
#
# @param {string} text  - The string to strip.
# @param {string} chars - Characters to remove from the left (default: " \t\n\r").
# @returns {string} The left-stripped string.
#
# @example str_lstrip("  hello")        => "hello"
# @example str_lstrip("xxhello", "x")   => "hello"
# @example str_lstrip("hello  ")        => "hello  "
func str_lstrip(text, chars=" \t\n\r") {
    local i = 1;
    until $text[i] not in $chars or i > length($text) {
        i++;
    }
    delete strbuf;
    until i > length($text) {
        add $text[i] to strbuf;
        i++;
    }
    return strbuf;
}

# Returns a copy of $text with trailing characters that appear in $chars
# removed. Stripping stops as soon as a character not in $chars is found
# scanning from the right. By default, strips ASCII whitespace.
#
# @param {string} text  - The string to strip.
# @param {string} chars - Characters to remove from the right (default: " \t\n\r").
# @returns {string} The right-stripped string.
#
# @example str_rstrip("hello  ")        => "hello"
# @example str_rstrip("helloxx", "x")   => "hello"
# @example str_rstrip("  hello")        => "  hello"
func str_rstrip(text, chars=" \t\n\r") {
    local i = length($text);
    until $text[i] not in $chars or i == 0 {
        i--;
    }
    delete strbuf;
    until (1+length(strbuf)) > i {
        add $text[1+length(strbuf)] to strbuf;
    }
    return strbuf;
}

# Returns a copy of $text with both leading and trailing characters that
# appear in $chars removed. Equivalent to applying str_lstrip then
# str_rstrip. By default, strips ASCII whitespace.
#
# @param {string} text  - The string to strip.
# @param {string} chars - Characters to remove from both ends (default: " \t\n\r").
# @returns {string} The stripped string.
#
# @example str_strip("  hello  ")       => "hello"
# @example str_strip("xxhelloxx", "x")  => "hello"
# @example str_strip("hello")           => "hello"
func str_strip(text, chars=" \t\n\r") {
    local i = 1;
    until i > length($text) or $text[i] not in $chars {
        i++;
    }
    delete strbuf;
    until i > length($text) {
        add $text[i] to strbuf;
        i++;
    }
    until length(strbuf) == 0 or strbuf["last"] not in $chars {
        delete strbuf["last"];
    }
    return strbuf;
}

# Returns true if $text is non-empty and every character is an ASCII
# letter (A–Z, a–z) or ASCII digit (0–9). Returns false for empty strings
# or strings containing any other character.
#
# @param {string} text - The string to test.
# @returns {boolean} True if $text is non-empty and entirely alphanumeric.
#
# @example str_is_alnum("abc123")  => true
# @example str_is_alnum("abc!")    => false
# @example str_is_alnum("")        => false
func str_is_alnum(text) {
    if length($text) == 0 {
        return false;
    }
    local i = 1;
    repeat length($text) {
        if $text[i] not in ASCII_UPPERCASE & ASCII_DIGITS {
            return false;
        }
        i++;
    }
    return true;
}

# Returns true if $text is non-empty and every character is an ASCII
# letter (A–Z or a–z). Returns false for empty strings or strings
# containing digits, punctuation, or other non-alpha characters.
#
# @param {string} text - The string to test.
# @returns {boolean} True if $text is non-empty and entirely alphabetic.
#
# @example str_is_alpha("hello")   => true
# @example str_is_alpha("hello1")  => false
# @example str_is_alpha("")        => false
func str_is_alpha(text) {
    if length($text) == 0 {
        return false;
    }
    local i = 1;
    repeat length($text) {
        if $text[i] not in ASCII_UPPERCASE {
            return false;
        }
        i++;
    }
    return true;
}

# Returns true if $text represents an integer or decimal number (i.e. it
# round-trips through the round() function unchanged). Returns false for
# strings containing non-numeric content.
#
# @param {string} text - The string to test.
# @returns {boolean} True if $text is a valid numeric value.
#
# @example str_is_digit("42")     => true
# @example str_is_digit("3.14")   => false
# @example str_is_digit("hello")  => false
func str_is_digit(text) {
    return round($text) == $text;
}

# Returns the 1-based index of the first occurrence of $char in $text,
# scanning left to right. Returns 0 if $char is not found.
# Only single-character values for $char are meaningful.
#
# @param {string} text - The string to search within.
# @param {string} char - The character to search for.
# @returns {number} The 1-based index of the first match, or 0 if not found.
#
# @example str_find_char("hello", "l")  => 3
# @example str_find_char("hello", "z")  => 0
# @example str_find_char("abca", "a")   => 1
func str_find_char(text, char) {
    local i = 1;
    repeat length($text) {
        if $text[i] == $char {
            return i;
        }
        i++;
    }
    return 0;
}

# Returns the 1-based index of the last occurrence of $char in $text,
# scanning right to left. Returns 0 if $char is not found.
# Only single-character values for $char are meaningful.
#
# @param {string} text - The string to search within.
# @param {string} char - The character to search for.
# @returns {number} The 1-based index of the last match, or 0 if not found.
#
# @example str_rfind_char("hello", "l")  => 4
# @example str_rfind_char("hello", "z")  => 0
# @example str_rfind_char("abca", "a")   => 4
func str_rfind_char(text, char) {
    local i = length($text);
    repeat length($text) {
        if $text[i] == $char {
            return i;
        }
        i--;
    }
    return 0;
}

# Returns a new string formed by removing $len characters from $text
# starting at position $start (1-based) and optionally inserting $repl
# in their place. If $len is Infinity (the default), all characters from
# $start to the end of $text are removed. If $repl is "" (the default),
# nothing is inserted (pure deletion).
#
# @param {string} text  - The original string.
# @param {number} start - The 1-based index at which to begin removal.
# @param {number} len   - Number of characters to remove (default: Infinity).
# @param {string} repl  - Replacement string to insert (default: "").
# @returns {string} The modified string.
#
# @example str_splice("hello world", 6)          => "hello"
# @example str_splice("hello world", 6, 5)       => "hello "
# @example str_splice("hello world", 6, 5, "!")  => "hello !"
func str_splice(text, start, len="Infinity", repl="") {
    return str_slice($text, 1, $start - 1) & $repl & str_slice($text, $start + $len);
}

# Returns a copy of $text with every non-overlapping occurrence of
# $subtext replaced by $repl, scanning left to right. Overlapping
# matches are not detected; after a match the scan resumes immediately
# after the replaced region.
#
# @param {string} text    - The original string.
# @param {string} subtext - The substring to search for.
# @param {string} repl    - The replacement string.
# @returns {string} The string with all occurrences replaced.
#
# @example str_replace("aabbaa", "aa", "X")    => "XbbX"
# @example str_replace("hello", "l", "r")      => "herro"
# @example str_replace("hello", "z", "r")      => "hello"
func str_replace(text, subtext, repl) {
    local i = 1;
    local result = "";
    delete strbuf;
    until i > length($text) {
        add $text[i] to strbuf;
        if contains(strbuf, $subtext) {
            repeat length($subtext) {
                delete strbuf["last"];
            }
            result &= strbuf & $repl;
            delete strbuf;
        }
        i++;
    }
    return result & strbuf;
}

# Returns a copy of $text with the first $n non-overlapping occurrences of
# $subtext replaced by $repl, scanning left to right. Occurrences beyond
# the $n-th are left unchanged. Passing $n = 0 returns $text unmodified.
#
# @param {string} text    - The original string.
# @param {string} subtext - The substring to search for.
# @param {string} repl    - The replacement string.
# @param {number} n       - Maximum number of replacements to perform.
# @returns {string} The string with up to $n occurrences replaced.
#
# @example str_replacen("aabbaa", "aa", "X", 1)  => "Xbbaa"
# @example str_replacen("aabbaa", "aa", "X", 2)  => "XbbX"
# @example str_replacen("hello",  "l",  "r", 0)  => "hello"
func str_replacen(text, subtext, repl, n) {
    local i = 1;
    local n = 0;
    local result = "";
    delete strbuf;
    until i > length($text) {
        add $text[i] to strbuf;
        if contains(strbuf, $subtext) {
            if n < $n {
                repeat length($subtext) {
                    delete strbuf["last"];
                }
                result &= strbuf & $repl;
            } else {
                result &= strbuf;
            }
            delete strbuf;
            n++;
        }
        i++;
    }
    return result & strbuf;
}

# Returns a copy of $text with only the $n-th occurrence (1-based) of
# $subtext replaced by $repl, scanning left to right. All other
# occurrences are left unchanged. If there are fewer than $n occurrences,
# $text is returned unmodified.
#
# @param {string} text    - The original string.
# @param {string} subtext - The substring to search for.
# @param {string} repl    - The replacement string.
# @param {number} n       - The 1-based index of the occurrence to replace.
# @returns {string} The string with the $n-th occurrence replaced.
#
# @example str_replacenth("aabbaa", "aa", "X", 1)  => "Xbbaa"
# @example str_replacenth("aabbaa", "aa", "X", 2)  => "aabbX"
# @example str_replacenth("hello",  "l",  "r", 2)  => "helro"
func str_replacenth(text, subtext, repl, n) {
    local i = 1;
    local n = 1;
    local result = "";
    delete strbuf;
    until i > length($text) {
        add $text[i] to strbuf;
        if contains(strbuf, $subtext) {
            if n == $n {
                repeat length($subtext) {
                    delete strbuf["last"];
                }
                result &= strbuf & $repl;
            } else {
                result &= strbuf;
            }
            delete strbuf;
            n++;
        }
        i++;
    }
    return result & strbuf;
}

# Returns $text with the leading $prefix removed, if present.
# If $text does not start with $prefix, it is returned unchanged.
# The check is NOT case-sensitive.
#
# @param {string} text   - The string to process.
# @param {string} prefix - The prefix to remove.
# @returns {string} $text without the leading $prefix, or $text unchanged.
#
# @example str_remove_prefix("hello world", "hello ")  => "world"
# @example str_remove_prefix("hello world", "world")   => "hello world"
# @example str_remove_prefix("hello", "")              => "hello"
func str_remove_prefix(text, prefix) {
    if str_starts_with($text, $prefix) {
        return str_slice($text, 1 + length($prefix));
    }
    return $text;
}

# Returns $text with the trailing $suffix removed, if present.
# If $text does not end with $suffix, it is returned unchanged.
# The check is NOT case-sensitive.
#
# @param {string} text   - The string to process.
# @param {string} suffix - The suffix to remove.
# @returns {string} $text without the trailing $suffix, or $text unchanged.
#
# @example str_remove_suffix("hello world", " world")  => "hello"
# @example str_remove_suffix("hello world", "hello")   => "hello world"
# @example str_remove_suffix("hello", "")              => "hello"
func str_remove_suffix(text, suffix) {
    if str_ends_with($text, $suffix) {
        return str_slice($text, 1, 0 - length($suffix));
    }
    return $text;
}

# Returns the 1-based index of the first occurrence of $subtext in $text,
# scanning left to right using a naive O(n*m) search. Returns 0 if
# $subtext is not found or if $subtext is longer than $text.
#
# @param {string} text    - The string to search within.
# @param {string} subtext - The substring to search for.
# @returns {number} The 1-based starting index of the first match, or 0.
#
# @example str_find("hello world", "world")  => 7
# @example str_find("hello world", "xyz")    => 0
# @example str_find("aabaa", "aa")           => 1
func str_find(text, subtext) {
    local n = length($text);
    local m = length($subtext);
    if m > n { return 0; }

    local i = 1;
    until i > n - m + 1 {
        if str_slice($text, i, i + m - 1) == $subtext {
            return i;
        }
        i++;
    }
    return 0;
}

# Returns a copy of $text centered in a string of length $width.
# If $width is less than or equal to the length of $text, a copy of
# $text is returned unchanged. The default fill character is a space.
#
# @param {string} text     - The string to center.
# @param {number} width    - The total width of the resulting string.
# @param {string} fillchar - The character to use for padding (default: " ").
# @returns {string} The centered string.
#
# @example str_center("hello", 10)       => "  hello  "
# @example str_center("hello", 10, "-") => "--hello--"
# @example str_center("hello", 5)        => "hello"
func str_center(text, width, fillchar=" ") {
    if $width <= length($text) {
        return $text;
    }
    local total_padding = $width - length($text);
    local left_padding = total_padding // 2;
    local right_padding = total_padding - left_padding;
    delete strbuf;
    repeat left_padding {
        add $fillchar to strbuf;
    }
    repeat length($text) {
        add $text[1 + length(strbuf) - left_padding] to strbuf;
    }
    repeat right_padding {
        add $fillchar to strbuf;
    }
    return strbuf;
}

# Returns a copy of $text left-justified in a string of length $width.
# The string is padded on the right with $fillchar. If $width is less
# than or equal to the length of $text, a copy of $text is returned unchanged.
#
# @param {string} text     - The string to left-justify.
# @param {number} width    - The total width of the resulting string.
# @param {string} fillchar - The character to use for padding (default: " ").
# @returns {string} The left-justified string.
#
# @example str_ljust("hello", 10)       => "hello     "
# @example str_ljust("hello", 10, "-")  => "hello-----"
# @example str_ljust("hello", 5)        => "hello"
func str_ljust(text, width, fillchar=" ") {
    if $width <= length($text) {
        return $text;
    }
    delete strbuf;
    repeat length($text) {
        add $text[1 + length(strbuf)] to strbuf;
    }
    repeat $width - length($text) {
        add $fillchar to strbuf;
    }
    return strbuf;
}

# Returns a copy of $text right-justified in a string of length $width.
# The string is padded on the left with $fillchar. If $width is less
# than or equal to the length of $text, a copy of $text is returned unchanged.
#
# @param {string} text     - The string to right-justify.
# @param {number} width   - The total width of the resulting string.
# @param {string} fillchar - The character to use for padding (default: " ").
# @returns {string} The right-justified string.
#
# @example str_rjust("hello", 10)       => "     hello"
# @example str_rjust("hello", 10, "-") => "-----hello"
# @example str_rjust("hello", 5)       => "hello"
func str_rjust(text, width, fillchar=" ") {
    if $width <= length($text) {
        return $text;
    }
    delete strbuf;
    repeat $width - length($text) {
        add $fillchar to strbuf;
    }
    repeat length($text) {
        add $text[1 + length(strbuf) - ($width - length($text))] to strbuf;
    }
    return strbuf;
}

# Counts the number of non-overlapping occurrences of $sub in $text.
#   - returns 0 if $sub is not found
#   - returns length($text) + 1 for an empty $sub
#
# @param {string} text - The string to search within.
# @param {string} sub  - The substring to count.
# @returns {number} The number of non-overlapping occurrences.
#
# @example str_count("this is it", "is")  => 2
# @example str_count("aaaa", "aa")        => 2
# @example str_count("banana", "an")      => 2
# @example str_count("hello", "xyz")      => 0
# @example str_count("abc", "")           => 4
func str_count(text, sub) {
    local count = 0;
    local i = 1;
    local j = 0;
    local candidate = "";

    if length($sub) == 0 {
        return length($text) + 1;
    }

    until i > length($text) - length($sub) + 1 {
        candidate = "";
        j = 0;
        repeat length($sub) {
            j++;
            candidate &= $text[i + j - 1];
        }
        if candidate == $sub {
            count++;
            i += length($sub);
        } else {
            i++;
        }
    }
    return count;
}

%undef strbuf
