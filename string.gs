%define ASCII_UPPERCASE "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
%define ASCII_LOWERCASE "abcdefghijklmnopqrstuvwxyz"
%define ASCII_DIGITS "0123456789"

%define strbuf std__string__strbuf

list strbuf;

# Slice $text from $start to $end, $end is exclusive. $start and $end are 1-based.
func slice(text, start, end) {
    delete strbuf;
    repeat $end - $start {
        add $text[$start + length(strbuf)] to strbuf;
    }
    return strbuf;
}

# Conditional macro to check if $text starts with $prefix.
%define ENDSWITH(TEXT,SUFFIX)                                                          \
    (slice((TEXT), 1 + (length(TEXT) - length(SUFFIX)), 1 + length(TEXT)) == (SUFFIX))

# Conditional macro to check if $text starts with $prefix.
%define STARTSWITH(TEXT,PREFIX)                                                        \
    (slice((TEXT), 1, 1 + length(PREFIX)) == (PREFIX))

# Remove $prefix from the beginning of $text.
%define REMOVEPREFIX(TEXT,PREFIX) (splice((TEXT), 1, length(PREFIX), ""))

# Remove $suffix from the end of $text.
%define REMOVESUFFIX(TEXT,SUFFIX)                                                      \
    (splice(TEXT, 1 + (length(TEXT) - length(SUFFIX)), length(SUFFIX), ""))

# Replace all occurrences of $subtext with $repl in $text.
func replace(text, subtext, repl) {
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

# Replace first $n occurrences of $subtext with $repl in $text.
func replacen(text, subtext, repl, n) {
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

# Replace the $n-th occurrence of $subtext with $repl in $text.
func replacenth(text, subtext, repl, n) {
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

# Remove $len characters from $text starting at $start and insert $repl in its place.
func splice(text, start, len, repl) {
    delete strbuf;
    repeat $start - 1 {
        add $text[1+length(strbuf)] to strbuf;
    }
    local result = strbuf & $repl;
    delete strbuf;
    local i = $start + $len;
    repeat 1 + (length($text) - ($start + $len)) {
        add $text[i] to strbuf;
        i++;
    }
    return result & strbuf;
}

# Transform ASCII letters in $text to uppercase.
func uppercase(text) {
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

# Transform ASCII letters in $text to lowercase.
func lowercase(text) {
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

# Transform the first character in $text to uppercase, and the rest to lowercase
func capitalize(text) {
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

# Return the index of the first occurrence of $char in $text, or 0 if not found.
func findchar(text, char) {
    local i = 1;
    repeat length($text) {
        if $text[i] == $char {
            return i;
        }
        i++;
    }
    return 0;
}

# Return the index of the last occurrence of $char in $text, or 0 if not found.
func rfindchar(text, char) {
    local i = length($text);
    repeat length($text) {
        if $text[i] == $char {
            return i;
        }
        i--;
    }
    return 0;
}

# Return true if all characters in $text are alphanumeric and there is at least one
# character.
func isalnum(text) {
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

# Return true if all characters in $text are alphabetic and there is at least one
# character.
func isalpha(text) {
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

# Conditional macro to check if $text is a digit.
%define ISDIGIT(TEXT) (round(TEXT) == (TEXT))

# Remove leading characters in $text that are in $chars.
func lstrip(text, chars) {
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

# Remove trailing characters in $text that are in $chars.
func rstrip(text, chars) {
    local i = length($text);
    until $text[i] not in $chars or i == 1 {
        i--;
    }
    delete strbuf;
    until (1+length(strbuf)) > i {
        add $text[1+length(strbuf)] to strbuf;
    }
    return strbuf;
}

# Remove leading and trailing characters in $text that are in $chars.
func strip(text, chars) {
    local i = 1;
    until $text[i] not in $chars or i > length($text) {
        i++;
    }
    delete strbuf;
    until i > length($text) {
        add $text[i] to strbuf;
        i++;
    }
    until strbuf["last"] not in $chars {
        delete strbuf["last"];
    }
    return strbuf;
}

list split;
# Split $text into list `split`, separated by character $sep.
proc split text, sep {
    delete split;
    delete strbuf;
    local i = 1;
    repeat length($text) {
        if $text[i] == $sep {
            add strbuf to split;
            delete strbuf;
        } else {
            add $text[i] to strbuf;
        }
        i++;
    }
    add strbuf to split;
}

# Split $text into list `split`, separated by newlines.
proc splitlines text {
    delete split;
    delete strbuf;
    local i = 1;
    repeat length($text) {
        if $text[i] in "\r\n" {
            add strbuf to split;
            delete strbuf;
        } else {
            add $text[i] to strbuf;
        }
        i++;
    }
    if strbuf == "" {} else {
        add strbuf to split;
    }
}

# Reverse $text.
func reverse(text) {
    delete strbuf;
    local i = 1;
    repeat length($text) {
        add $text[1+length($text)-i] to strbuf;
        i++;
    }
    return strbuf;
}

# Repeat $text $n times.
func repeatstr(text, n) {
    local result = "";
    repeat $n {
        result &= $text;
    }
    return result;
}

# Return a titlecased version of $text: words start with uppercase characters,
# all remaining cased characters are lowercase.
func titlecase(text) {
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

# Join `LIST` elements into a string, separated by `SEP` and store the result in a local
# variable `STORE`.
%define JOIN(LIST,SEP,STORE)                                                           \
    local STORE = "";                                                                  \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        STORE &= LIST[i];                                                              \
        if i < length(LIST) {                                                          \
            STORE &= (SEP);                                                            \
        }                                                                              \
        i++;                                                                           \
    }

# Join `LIST` by `FIELD` with `SEP` separator and store the result in a local variable
# `STORE`.
%define JOIN_BY_FIELD(LIST,FIELD,SEP,STORE)                                            \
    local STORE = "";                                                                  \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        STORE &= LIST[i]FIELD;                                                         \
        if i < length(LIST) {                                                          \
            STORE &= (SEP);                                                            \
        }                                                                              \
        i++;                                                                           \
    }

func truncate(text, maxlength) {
    if length($text) > $maxlength {
        return slice($text, 1, $maxlength-4) & "...";
    } else {
        return $text;
    }
}

func casecmp(a, b) {
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

func countchar(text, char) {
    local i = 1;
    local count = 0;
    repeat length($text) {
        if $text[i] == $char {
            count++;
        }
        i++;
    }
    return count;
}

func countchars(text, chars) {
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

func zfill(text, zeroes) {
    local ret = $text;

    repeat $zeroes - length $text {
        ret = "0" & ret;
    }
    return ret;
}

%undef strbuf
