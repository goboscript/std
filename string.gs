func strcmp(string1, string2) {
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
