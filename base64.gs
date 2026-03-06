list base64_buffer;
list base64_strbuf;
list base64_lut; # lookup table: ASCII costume_number -> base64 value (0-63), 255=invalid/pad

%define BASE64_CHARSET "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
%define BASE64_URLSAFE "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="

# Build LUT from a charset string into base64_lut.
# base64_lut[costume_number_of_char] = base64 value (0-63), or 255 for '='
proc base64_build_lut charset {
    delete base64_lut;
    # Fill 256 slots with 255 (invalid)
    local j = 0;
    repeat 256 {
        add 255 to base64_lut;
        j++;
    }
    # Map each charset char to its index (0-63), slot 65 (index 64) is '=' -> 255 already
    local idx = 0;
    repeat 64 {
        switch_costume $charset[1 + idx];
        base64_lut[costume_number()] = idx;
        idx++;
    }
}

func base64_encode(charset) {
    delete base64_strbuf;
    local i = 1;
    until i > length(base64_buffer) {
        local a6 = base64_buffer[i] // 0b100;
        local a2 = base64_buffer[i] % 0b100;
        add $charset[1 + a6] to base64_strbuf;
        i++;
        if i <= length(base64_buffer) {
            local b4hi = base64_buffer[i] // 0x10;
            local b4lo = base64_buffer[i] % 0x10;
            add $charset[1 + a2 * 0x10 + b4hi] to base64_strbuf;
            i++;
            if i <= length(base64_buffer) {
                local c2 = base64_buffer[i] // 0b1000000;
                local c6 = base64_buffer[i] % 0b1000000;
                add $charset[1 + b4lo * 4 + c2] to base64_strbuf;
                add $charset[1 + c6] to base64_strbuf;
                i++;
            } else {
                add $charset[1 + b4lo * 4] to base64_strbuf;
                add $charset[65] to base64_strbuf;
            }
        } else {
            add $charset[1 + a2 * 0x10] to base64_strbuf;
            add $charset[65] & $charset[65] to base64_strbuf;
        }
    }
    return base64_strbuf;
}

# Decode base64 string $data into base64_buffer.
# Call base64_build_lut with the appropriate charset before calling this.
# Appends decoded bytes to base64_buffer (clear it first if needed).
proc base64_decode data {
    local len = length($data);
    local i = 1;
    until i > len {
        # Read up to 4 base64 chars, get their 6-bit values via LUT
        switch_costume $data[i];
        local v0 = base64_lut[costume_number()];
        i++;

        switch_costume $data[i];
        local v1 = base64_lut[costume_number()];
        i++;

        # Byte 1: high 6 bits from v0, low 2 bits from v1 high
        add v0 * 4 + v1 // 16 to base64_buffer;

        # Check for padding or end: if 3rd char is '=' or beyond end, stop
        if i > len {
            stop_this_script;
        }
        switch_costume $data[i];
        local v2 = base64_lut[costume_number()];
        i++;

        if v2 == 255 {
            # Padding '=' — only 2 encoded chars, 1 decoded byte (already added)
            stop_this_script;
        }

        # Byte 2: low 4 bits of v1, high 4 bits of v2
        add (v1 % 16) * 16 + v2 // 4 to base64_buffer;

        if i > len {
            stop_this_script;
        }
        switch_costume $data[i];
        local v3 = base64_lut[costume_number()];
        i++;

        if v3 == 255 {
            # Padding '=' — only 3 encoded chars, 2 decoded bytes
            stop_this_script;
        }

        # Byte 3: low 2 bits of v2, all 6 bits of v3
        add (v2 % 4) * 64 + v3 to base64_buffer;
    }
}
