# sha256.gs — SHA-256 (FIPS 180-4) for goboscript
#
# DEPENDS ON: bitwise library providing:
#   XOR32, AND32, OR32, NOT32, ADD32  (macros)
#   rol32(a, b)                        (function)
#   xor4, and4, or4                    (lookup lists, pre-populated)
#
# USAGE:
#   1. Populate sha256_input with one byte (0-255) per item.
#   2. Call sha256.
#   3. Read 32 bytes from sha256_output (big-endian, standard byte order).
#
# INPUT LIST:   sha256_input   — one byte per item
# OUTPUT LIST:  sha256_output  — 32 bytes, big-endian

list sha256_input;
list sha256_output;

proc sha256_input_encode_ascii text {
    BYTES_ENCODE_ASCII(sha256_input)
}

func sha256_output_decode_hex(start=1, end=-1) {
    BYTES_DECODE_HEX(sha256_output)
}

# ── private state ─────────────────────────────────────────────────────────────
list _sha_W;       # 64-word message schedule
list _sha_padded;  # padded copy of sha256_input

var _sha_H0 = 0;
var _sha_H1 = 0;
var _sha_H2 = 0;
var _sha_H3 = 0;
var _sha_H4 = 0;
var _sha_H5 = 0;
var _sha_H6 = 0;
var _sha_H7 = 0;

var _sha_a = 0;
var _sha_b = 0;
var _sha_c = 0;
var _sha_d = 0;
var _sha_e = 0;
var _sha_f = 0;
var _sha_g = 0;
var _sha_h = 0;

var _sha_i = 0;
var _sha_T1 = 0;
var _sha_T2 = 0;
var _sha_S0 = 0;
var _sha_S1 = 0;
var _sha_ch = 0;
var _sha_maj = 0;
var _sha_chunk = 0;
var _sha_nchunks = 0;

# ── SHA-256 helpers (using ror32 via rol32) ───────────────────────────────────
# ror32(x, n) = rol32(x, 32-n)
# These are inlined as macros for speed.

# BSIG0(x) = ROTR2(x)  XOR ROTR13(x) XOR ROTR22(x)
%define SHA_BSIG0(X) xor32(xor32(rol32((X),30),rol32((X),19)),rol32((X),10))
# BSIG1(x) = ROTR6(x)  XOR ROTR11(x) XOR ROTR25(x)
%define SHA_BSIG1(X) xor32(xor32(rol32((X),26),rol32((X),21)),rol32((X),7))
# SSIG0(x) = ROTR7(x)  XOR ROTR18(x) XOR SHR3(x)
%define SHA_SSIG0(X) xor32(xor32(rol32((X),25),rol32((X),14)),(X)//8)
# SSIG1(x) = ROTR17(x) XOR ROTR19(x) XOR SHR10(x)
%define SHA_SSIG1(X) xor32(xor32(rol32((X),15),rol32((X),13)),(X)//1024)
# CH(e,f,g)  = (e AND f) XOR (NOT e AND g)
%define SHA_CH(E,F,G) xor32(and32((E),(F)),and32(not32(E),(G)))
# MAJ(a,b,c) = (a AND b) XOR (a AND c) XOR (b AND c)
%define SHA_MAJ(A,B,C) xor32(xor32(and32((A),(B)),and32((A),(C))),and32((B),(C)))

# ── _sha_init_K ───────────────────────────────────────────────────────────────
list _sha_K = [       # 64 round constants
    0x428a2f98, 0x71374491,
    0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01,
    0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe,
    0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa,
    0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d,
    0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138,
    0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb,
    0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624,
    0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08,
    0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f,
    0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb,
    0xbef9a3f7, 0xc67178f2
];

# ── _sha_pad_msg ──────────────────────────────────────────────────────────────
# SHA-256 padding: same structure as MD5 but big-endian length field.
proc _sha_pad_msg {
    local msglen = length sha256_input;
    local bitlen_lo = (msglen % 0x20000000) * 8;
    local bitlen_hi = msglen // 0x20000000;
    local i = 1;

    delete _sha_padded;

    repeat msglen {
        add sha256_input[i] to _sha_padded;
        i += 1;
    }

    add 0x80 to _sha_padded;

    until length _sha_padded % 64 == 56 {
        add 0 to _sha_padded;
    }

    # 64-bit bit-length, big-endian (high word first)
    add (bitlen_hi // 0x1000000) % 0x100 to _sha_padded;
    add (bitlen_hi // 0x10000)   % 0x100 to _sha_padded;
    add (bitlen_hi // 0x100)     % 0x100 to _sha_padded;
    add  bitlen_hi               % 0x100 to _sha_padded;
    add (bitlen_lo // 0x1000000) % 0x100 to _sha_padded;
    add (bitlen_lo // 0x10000)   % 0x100 to _sha_padded;
    add (bitlen_lo // 0x100)     % 0x100 to _sha_padded;
    add  bitlen_lo               % 0x100 to _sha_padded;
}

# ── _sha_process_chunk ────────────────────────────────────────────────────────
proc _sha_process_chunk base {
    local wi = 0;
    local bi = 0;

    # Unpack 16 big-endian 32-bit words from the 64-byte chunk
    delete _sha_W;
    wi = 0;
    repeat 16 {
        bi = $base + wi * 4;
        add _sha_padded[bi]     * 0x1000000
          + _sha_padded[bi + 1] * 0x10000
          + _sha_padded[bi + 2] * 0x100
          + _sha_padded[bi + 3]
        to _sha_W;
        wi += 1;
    }

    # Extend to 64 words
    wi = 17;
    repeat 48 {
        add add32(add32(add32(
            SHA_SSIG1(_sha_W[wi - 2]),
            _sha_W[wi - 7]),
            SHA_SSIG0(_sha_W[wi - 15])),
            _sha_W[wi - 16])
        to _sha_W;
        wi += 1;
    }

    # Initialise working variables
    _sha_a = _sha_H0;
    _sha_b = _sha_H1;
    _sha_c = _sha_H2;
    _sha_d = _sha_H3;
    _sha_e = _sha_H4;
    _sha_f = _sha_H5;
    _sha_g = _sha_H6;
    _sha_h = _sha_H7;

    # 64 rounds
    _sha_i = 1;
    repeat 64 {
        _sha_T1 = add32(add32(add32(add32(
            _sha_h,
            SHA_BSIG1(_sha_e)),
            SHA_CH(_sha_e, _sha_f, _sha_g)),
            _sha_K[_sha_i]),
            _sha_W[_sha_i]);
        _sha_T2 = add32(SHA_BSIG0(_sha_a), SHA_MAJ(_sha_a, _sha_b, _sha_c));

        _sha_h = _sha_g;
        _sha_g = _sha_f;
        _sha_f = _sha_e;
        _sha_e = add32(_sha_d, _sha_T1);
        _sha_d = _sha_c;
        _sha_c = _sha_b;
        _sha_b = _sha_a;
        _sha_a = add32(_sha_T1, _sha_T2);

        _sha_i += 1;
    }

    _sha_H0 = add32(_sha_H0, _sha_a);
    _sha_H1 = add32(_sha_H1, _sha_b);
    _sha_H2 = add32(_sha_H2, _sha_c);
    _sha_H3 = add32(_sha_H3, _sha_d);
    _sha_H4 = add32(_sha_H4, _sha_e);
    _sha_H5 = add32(_sha_H5, _sha_f);
    _sha_H6 = add32(_sha_H6, _sha_g);
    _sha_H7 = add32(_sha_H7, _sha_h);
}

# ── _sha_emit_word ─────────────────────────────────────────────────────────────
# Appends a 32-bit word to sha256_output as 4 big-endian bytes.
proc _sha_emit_word w {
    add ($w // 0x1000000) % 0x100 to sha256_output;
    add ($w // 0x10000)   % 0x100 to sha256_output;
    add ($w // 0x100)     % 0x100 to sha256_output;
    add  $w               % 0x100 to sha256_output;
}

# ── sha256 ────────────────────────────────────────────────────────────────────
# Entry point. Reads sha256_input, writes 32 bytes to sha256_output.
proc sha256 {
    _sha_pad_msg;

    # FIPS 180-4 §5.3.3 — initial hash values (first 32 bits of fractional
    # parts of square roots of the first 8 primes)
    _sha_H0 = 0x6a09e667;
    _sha_H1 = 0xbb67ae85;
    _sha_H2 = 0x3c6ef372;
    _sha_H3 = 0xa54ff53a;
    _sha_H4 = 0x510e527f;
    _sha_H5 = 0x9b05688c;
    _sha_H6 = 0x1f83d9ab;
    _sha_H7 = 0x5be0cd19;

    _sha_nchunks = length _sha_padded // 64;
    _sha_chunk = 0;
    repeat _sha_nchunks {
        _sha_process_chunk _sha_chunk * 64 + 1;
        _sha_chunk += 1;
    }

    delete sha256_output;
    _sha_emit_word _sha_H0;
    _sha_emit_word _sha_H1;
    _sha_emit_word _sha_H2;
    _sha_emit_word _sha_H3;
    _sha_emit_word _sha_H4;
    _sha_emit_word _sha_H5;
    _sha_emit_word _sha_H6;
    _sha_emit_word _sha_H7;
}
