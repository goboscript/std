%include std/bitwise.gs
%include std/bytes.gs
%include std/sha256.gs

proc test {
    delete sha256_input;
    sha256_input_encode_ascii "aspizu";
    sha256;
    expect "sha256('aspizu')", sha256_output_decode_hex(), to_be: "D9A064F15C829582610A8C0A7C3C06A8F01B9DF383D78544451AAC3EBB57E0E3";
}
