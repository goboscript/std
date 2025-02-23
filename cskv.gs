list cskv;
list cskv_keys;
list cskv_key_map;

%define CSKV_GET_INDEX(key) cskv_key_map[(key) in cskv_keys]
%define CSKV_GET(key) cskv[cskv_key_map[(key) in cskv_keys]]

proc cskv_unpack text {
    delete cskv;
    local token = "";
    local i = 0;
    until i > length($text) {
        if $text[i] == "\\" {
            if $text[i+1] in ",:\\" {
                token &= $text[i+1];
                i++;
            } else {
                token &= "\\";
            }
        } elif $text[i] == "," {
            add token to cskv;
            token = "";
        } elif $text[i] == ":" {
            add token to cskv_keys;
            add 1+length(cskv) to cskv_key_map;
            token = "";
        } else {
            token &= $text[i];
        }
        i++;
    }
    add token to cskv;
}

func cskv_pack() {
    local result = "";
    local i = 1;
    until i > length(cskv_keys) {
        result &= cskv_keys[i] & ":";
        if (cskv_key_map[i+1] - cskv_key_map[i]) > 2 {
            result &= cskv[cskv_key_map[i]] & ",";
            local j = 1;
            until j > cskv[cskv_key_map[i]] {
                local element = cskv[cskv_key_map[i] + j];
                local k = 1;
                until k > length(element) {
                    if element[k] in "\\,:" {
                        result &= "\\";
                    }
                    result &= element[k];
                    k++;
                }
                j++;
                if i < length(cskv_keys) or j < cskv[cskv_key_map[i]] {
                    result &= ",";
                }
            }
        } else {
            local j = 1;
            until j > length(cskv[cskv_key_map[i]]) {
                if cskv[cskv_key_map[i]][j] in "\\,:" {
                    result &= "\\";
                }
                result &= cskv[cskv_key_map[i]][j];
                j++;
            }
            if i < length(cskv_keys) {
                result &= ",";
            }
        }
        i++;
    }
    return result;
}
