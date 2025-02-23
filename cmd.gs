list cmd_args;

func cmd_next(start, cmd) {
    delete cmd_args;
    local key = "";
    local single_quote = false;
    local double_quote = false;
    local i = $start;
    until i > length($cmd) {
        if single_quote {
            if $cmd[i] == "'" and $cmd[i-1] != "\\" {
                single_quote = false;
                add key to cmd_args;
                key = "";
            }
            else {
                key &= $cmd[i];
            }
        }
        elif double_quote {
            if $cmd[i] == "\"" {
                double_quote = false;
                add key to cmd_args;
                key = "";
            }
            elif $cmd[i] == "\\" {
                i++;
                key &= $cmd[i];
            }
            else {
                key &= $cmd[i];
            }
        }
        elif $cmd[i] == "\"" {
            double_quote = true;
        }
        elif $cmd[i] == "'" {
            single_quote = true;
        }
        elif $cmd[i] == " " {
            if key != "" {
                add key to cmd_args;
                key = "";
            }
        }
        elif $cmd[i] == ";" {
            if key != "" {
                add key to cmd_args;
            }
            return i+1;
        }
        elif $cmd[i] == "\\" {
            i++;
            key &= $cmd[i];
        }
        else {
            key &= $cmd[i];
        }
        i++;
    }
    if key != "" {
        add key to cmd_args;
    }
    return 0;
}
