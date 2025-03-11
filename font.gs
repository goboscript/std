# Usage:
# copy font.txt to your project directory
# include the font data in the font_data list
# list font_data = file ```font.txt```;
# generate your own font using font.py
# in inkscape, use these options:
# Input/Output > SVG output > Path data > Path string format = Absolute
# Input/Output > SVG output > Path data > Force repeat commands = Checked

var font_offset = 0;
var font_x = 0;
var font_y = 0;
var font_scale = 1;
var font_x1 = 0;
var font_x2 = 240;
var font_char_spacing = 0;
var font_line_spacing = 0;
var font_linelen = 0;

%define FONT_NAME font_data[font_offset+1]
%define FONT_CREATOR font_data[font_offset+2]
%define FONT_RIGHTS font_data[font_offset+3]
%define FONT_WIDTH font_data[font_offset+4]
%define FONT_HEIGHT font_data[font_offset+5]

%define FONT_CALCULATE_WIDTH_FROM_LENGTH(LENGTH) \
    (LENGTH*(FONT_WIDTH+2+font_char_spacing)-(2+font_char_spacing))*font_scale
%define FONT_CALCULATE_WIDTH(TEXT) FONT_CALCULATE_WIDTH_FROM_LENGTH(length($TEXT))

proc font_render_char char {
    switch_costume $char;
    local x = "";
    local y = "";
    local i = font_offset+font_data[5+font_offset+costume_number()];
    forever {
        if font_data[i] == "M" {
            pen_up;
            goto font_x+font_scale*font_data[i+1], font_y-font_scale*font_data[i+2];
            i += 3;
            if x == "" {
                x = x_position();
                y = y_position();
            }
        } elif font_data[i] == "L" {
            pen_down;
            goto font_x+font_scale*font_data[i+1], font_y-font_scale*font_data[i+2];
            i += 3;
        } elif font_data[i] == "H" {
            pen_down;
            set_x font_x+font_scale*font_data[i+1];
            i += 2;
        } elif font_data[i] == "V" {
            pen_down;
            set_y font_y-font_scale*font_data[i+1];
            i += 2;
        } elif font_data[i] == "Z" {
            pen_down;
            goto x, y;
            i += 1;
        } else {
            pen_up;
            stop_this_script;
        }
    }
}

proc font_render_begin {
    font_x = font_x1;
    font_linelen = 0;
}

proc font_render_text text {
    local i = 1;
    repeat length($text) {
        font_render_char $text[i];
        font_x += (FONT_WIDTH+2+font_char_spacing)*font_scale;
        i++;
    }
}

proc font_render_text_softwrap text {
    local maxlen = (font_x2 - font_x1) // ((FONT_WIDTH+2+font_char_spacing)*font_scale);
    local i = 1;
    local font_linelen = 0;
    local word = "";
    until i > length($text) {
        until $text[i] == " " or i > length($text) {
            word &= $text[i];
            i++;
        }
        if font_linelen + length(word) > maxlen {
            font_y -= (FONT_HEIGHT+4+font_line_spacing)*font_scale;
            font_x = font_x1;
            font_linelen = 0;
        }
        local j = 1;
        repeat length(word) {
            font_render_char word[j];
            font_x += (FONT_WIDTH+2+font_char_spacing)*font_scale;
            font_linelen += 1;
            if font_x > font_x2 {
                font_y -= (FONT_HEIGHT+4+font_line_spacing)*font_scale;
                font_x = font_x1;
                font_linelen = 0;
            }
            j++;
        }
        word = "";
        until $text[i] != " " or i > length($text) {
            word &= $text[i];
            i++;
        }
        local j = 1;
        repeat length(word) {
            font_render_char word[j];
            font_x += (FONT_WIDTH+2+font_char_spacing)*font_scale;
            font_linelen += 1;
            if font_x > font_x2 {
                font_y -= (FONT_HEIGHT+4+font_line_spacing)*font_scale;
                font_x = font_x1;
                font_linelen = 0;
            }
            j++;
        }
        word = "";
    }
}
