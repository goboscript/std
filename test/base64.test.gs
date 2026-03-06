%include ../base64.gs

proc test {
    # ── Encode tests ────────────────────────────────────────────────

    delete base64_buffer;
    base64_buffer_append "";
    expect "base64_encode('')", base64_encode(BASE64_CHARSET), to_be: "";

    delete base64_buffer;
    base64_buffer_append "f";
    expect "base64_encode('f')", base64_encode(BASE64_CHARSET), to_be: "Zg==";

    delete base64_buffer;
    base64_buffer_append "fo";
    expect "base64_encode('fo')", base64_encode(BASE64_CHARSET), to_be: "Zm8=";

    delete base64_buffer;
    base64_buffer_append "foo";
    expect "base64_encode('foo')", base64_encode(BASE64_CHARSET), to_be: "Zm9v";

    delete base64_buffer;
    base64_buffer_append "foob";
    expect "base64_encode('foob')", base64_encode(BASE64_CHARSET), to_be: "Zm9vYg==";

    delete base64_buffer;
    base64_buffer_append "fooba";
    expect "base64_encode('fooba')", base64_encode(BASE64_CHARSET), to_be: "Zm9vYmE=";

    delete base64_buffer;
    base64_buffer_append "foobar";
    expect "base64_encode('foobar')", base64_encode(BASE64_CHARSET), to_be: "Zm9vYmFy";

    delete base64_buffer;
    base64_buffer_append "Many hands make light work.";
    expect "base64_encode('Many hands make light work.')", base64_encode(BASE64_CHARSET), to_be: "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu";

    # ── Decode tests ────────────────────────────────────────────────

    base64_build_lut BASE64_CHARSET;

    delete base64_buffer;
    base64_decode "Zg==";
    expect "base64_decode('Zg==')", base64_buffer_to_str(), to_be: "f";

    delete base64_buffer;
    base64_decode "Zm8=";
    expect "base64_decode('Zm8=')", base64_buffer_to_str(), to_be: "fo";

    delete base64_buffer;
    base64_decode "Zm9v";
    expect "base64_decode('Zm9v')", base64_buffer_to_str(), to_be: "foo";

    delete base64_buffer;
    base64_decode "Zm9vYg==";
    expect "base64_decode('Zm9vYg==')", base64_buffer_to_str(), to_be: "foob";

    delete base64_buffer;
    base64_decode "Zm9vYmE=";
    expect "base64_decode('Zm9vYmE=')", base64_buffer_to_str(), to_be: "fooba";

    delete base64_buffer;
    base64_decode "Zm9vYmFy";
    expect "base64_decode('Zm9vYmFy')", base64_buffer_to_str(), to_be: "foobar";

    delete base64_buffer;
    base64_decode "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu";
    expect "base64_decode('TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu')", base64_buffer_to_str(), to_be: "Many hands make light work.";

    # ── Round-trip tests ─────────────────────────────────────────────

    delete base64_buffer;
    base64_buffer_append "Hello, World!";
    local encoded = base64_encode(BASE64_CHARSET);
    delete base64_buffer;
    base64_decode encoded;
    expect "round-trip 'Hello, World!'", base64_buffer_to_str(), to_be: "Hello, World!";

    delete base64_buffer;
    base64_buffer_append "abc";
    encoded = base64_encode(BASE64_CHARSET);
    delete base64_buffer;
    base64_decode encoded;
    expect "round-trip 'abc'", base64_buffer_to_str(), to_be: "abc";
}
