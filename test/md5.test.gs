%include std/bitwise.gs
%include std/bytes.gs
%include std/md5.gs

proc test {
    delete md5_input;
    md5_input_encode_ascii "aspizu";
    md5;
    expect "md5('aspizu')", md5_output_decode_hex(), to_be: "3E82F1CFE9773B2887D827976C75E6E7";
}
