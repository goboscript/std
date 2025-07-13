func strcmp(string1, string2) {
    # This code assumes you have costumes A-Z and a-z
    # If you need to compare chars e.g ä vs Ä, then you need to add those as costumes too
    if length($string1) != length($string2) {
        return false;
    }
    local i = 1;
    repeat length($string1) {
        switch_costume $string1[i];
        local char1 = costume_number();
        switch_costume $string2[i];
        if char1 != costume_number() {
            return false;
        }
        i++;
    }
    return true;
}

func slice(string, start, end) {
    local ret = "";
    local i = $start;

    until i >= $end {
        ret &= $string[i];
        i++;
    }
    return ret;
}

func slice_step(string, start, end, step) {
    if $start == $end or $step + "" == 0 {
        return "";
    } else {
        local ret = "";
        local i = $start;

        if $step < 0 {
            until i <= $end {
                ret &= $string[i];
                i += $step;
            }
            return ret;
        } else {
            until i >= $end {
                ret &= $string[i];
                i += $step;
            }
            return ret;
        }
    }
}

func startswith(string, start) {
    local i = 1;
    repeat length $start {
        if $string[i] != $start[i] {
            return false;
        }
        i++;
    }
    return true;
}

# startswith_from(1, ...) is equivalent to startswith(...)
func startswith_from(i, string, start) {
    local i = 1;
    repeat length $start {
        if $string[i + $i - 1] != $start[i] {
            return false;
        }
        i++;
    }
    return true;
}

func endswith(string, end) {
    local i = 0;
    repeat length $end {
        if $string[length $string - i] != $end[length $end - i] {
            return false;
        }
        i++;
    }
    return true;
}

# endswith_from(length <str>, <str>, ...) is equivalent to endswith(<str>, ...)
func endswith_from(i, string, end) {
    local i = 0;
    repeat length $end {
        if $string[$i - i] != $end[length $end - i] {
            return false;
        }
        i++;
    }
    return true;
}
