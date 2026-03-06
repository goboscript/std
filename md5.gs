#
# DEPENDS ON: the bitwise library providing:
#   XOR32, AND32, OR32, NOT32, ADD32  (macros)
#   rol32(a, b)                        (function)
#   xor4, and4, or4                    (lookup lists, must be pre-populated)
#
# USAGE:
#   1. Populate md5_input with one byte per item.
#   2. Call md5.
#   3. Read 16 bytes from md5_output.
#
# INPUT LIST:   md5_input   — one byte (0‥255) per item
# OUTPUT LIST:  md5_output  — 16 bytes, little-endian (H0 H1 H2 H3)

list md5_input;
list md5_output;

proc md5_input_encode_ascii text {
    BYTES_ENCODE_ASCII(md5_input)
}

func md5_output_decode_hex(start=1, end=-1) {
    BYTES_DECODE_HEX(md5_output)
}

# ── private state ─────────────────────────────────────────────────────────────
list _md5_M;       # 16 x 32-bit words for the current 512-bit chunk
list _md5_padded;  # padded copy of md5_input

var _md5_H0 = 0;   # hash state words
var _md5_H1 = 0;
var _md5_H2 = 0;
var _md5_H3 = 0;

var _md5_a = 0;    # working variables
var _md5_b = 0;
var _md5_c = 0;
var _md5_d = 0;
var _md5_F = 0;    # round function output / accumulator
var _md5_g = 0;    # message word index for current round
var _md5_i = 0;    # round counter
var _md5_temp = 0;
var _md5_chunk = 0;
var _md5_nchunks = 0;

# ── _md5_init_tables ──────────────────────────────────────────────────────────
list _md5_K = [      # 64 round constants  floor(2^32 * |sin(i+1)|)
    0xd76aa478, 0xe8c7b756,
    0x242070db, 0xc1bdceee,
    0xf57c0faf, 0x4787c62a,
    0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af,
    0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193,
    0xa679438e, 0x49b40821,
    # Round 2  (i = 16..31)
    0xf61e2562, 0xc040b340,
    0x265e5a51, 0xe9b6c7aa,
    0xd62f105d, 0x02441453,
    0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6,
    0xf4d50d87, 0x455a14ed,
    0xa9e3e905, 0xfcefa3f8,
    0x676f02d9, 0x8d2a4c8a,
    # Round 3  (i = 32..47)
    0xfffa3942, 0x8771f681,
    0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9,
    0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa,
    0xd4ef3085, 0x04881d05,
    0xd9d4d039, 0xe6db99e5,
    0x1fa27cf8, 0xc4ac5665,
    # Round 4  (i = 48..63)
    0xf4292244, 0x432aff97,
    0xab9423a7, 0xfc93a039,
    0x655b59c3, 0x8f0ccc92,
    0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0,
    0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235,
    0x2ad7d2bb, 0xeb86d391
];

list _md5_s = [      # 64 per-round left-rotate amounts
    # Round 1
    7, 12, 17, 22,
    7, 12, 17, 22,
    7, 12, 17, 22,
    7, 12, 17, 22,
    # Round 2
    5, 9, 14, 20,
    5, 9, 14, 20,
    5, 9, 14, 20,
    5, 9, 14, 20,
    # Round 3
    4, 11, 16, 23,
    4, 11, 16, 23,
    4, 11, 16, 23,
    4, 11, 16, 23,
    # Round 4
    6, 10, 15, 21,
    6, 10, 15, 21,
    6, 10, 15, 21,
    6, 10, 15, 21
];

# ── _md5_pad_msg ──────────────────────────────────────────────────────────────
# Copies md5_input into _md5_padded then applies RFC 1321 Section 3.1-3.2 padding:
#   1. Append 0x80.
#   2. Append 0x00 bytes until length ≡ 56 (mod 64).
#   3. Append the original bit-length as a 64-bit little-endian integer.
#
# The bit-length is split into two 32-bit halves to stay within JS double
# precision:  lo = (msglen % 2^29) * 8,  hi = msglen // 2^29
proc _md5_pad_msg {
    local msglen = length md5_input;
    local bitlen_lo = (msglen % 0x20000000) * 8;
    local bitlen_hi = msglen // 0x20000000;
    local i = 1;

    delete _md5_padded;

    repeat msglen {
        add md5_input[i] to _md5_padded;
        i += 1;
    }

    add 0x80 to _md5_padded;

    until length _md5_padded % 64 == 56 {
        add 0 to _md5_padded;
    }

    # low 32 bits of bit-length
    add bitlen_lo % 0x100 to _md5_padded;
    add (bitlen_lo // 0x100) % 0x100 to _md5_padded;
    add (bitlen_lo // 0x10000) % 0x100 to _md5_padded;
    add (bitlen_lo // 0x1000000) % 0x100 to _md5_padded;
    # high 32 bits of bit-length
    add bitlen_hi % 0x100 to _md5_padded;
    add (bitlen_hi // 0x100) % 0x100 to _md5_padded;
    add (bitlen_hi // 0x10000) % 0x100 to _md5_padded;
    add (bitlen_hi // 0x1000000) % 0x100 to _md5_padded;
}

# ── _md5_process_chunk ────────────────────────────────────────────────────────
# Processes one 512-bit (64-byte) chunk.
# base: 1-based start index into _md5_padded.
proc _md5_process_chunk base {
    local wi = 0;
    local bi = 0;

    # Unpack 64 bytes -> 16 little-endian 32-bit words in _md5_M
    delete _md5_M;
    wi = 0;
    repeat 16 {
        bi = $base + wi * 4;
        add _md5_padded[bi]
          + _md5_padded[bi + 1] * 0x100
          + _md5_padded[bi + 2] * 0x10000
          + _md5_padded[bi + 3] * 0x1000000
        to _md5_M;
        wi += 1;
    }

    # Initialise working variables from current hash state
    _md5_a = _md5_H0;
    _md5_b = _md5_H1;
    _md5_c = _md5_H2;
    _md5_d = _md5_H3;

    # 64 rounds
    _md5_i = 0;
    repeat 64 {
        if _md5_i < 16 {
            # Round 1 — F(b,c,d) = (b AND c) OR (NOT b AND d)
            _md5_F = or32(and32(_md5_b, _md5_c), and32(not32(_md5_b), _md5_d));
            _md5_g = _md5_i;
        } elif _md5_i < 32 {
            # Round 2 — G(b,c,d) = (d AND b) OR (NOT d AND c)
            _md5_F = or32(and32(_md5_d, _md5_b), and32(not32(_md5_d), _md5_c));
            _md5_g = (5 * _md5_i + 1) % 16;
        } elif _md5_i < 48 {
            # Round 3 — H(b,c,d) = b XOR c XOR d
            _md5_F = xor32(xor32(_md5_b, _md5_c), _md5_d);
            _md5_g = (3 * _md5_i + 5) % 16;
        } else {
            # Round 4 — I(b,c,d) = c XOR (b OR NOT d)
            _md5_F = xor32(_md5_c, or32(_md5_b, not32(_md5_d)));
            _md5_g = (7 * _md5_i) % 16;
        }

        # temp = b + ROL32(a + F + K[i] + M[g], s[i])
        _md5_F = add32(
                   add32(add32(_md5_a, _md5_F), _md5_K[_md5_i + 1]),
                   _md5_M[_md5_g + 1]);
        _md5_temp = _md5_d;
        _md5_d    = _md5_c;
        _md5_c    = _md5_b;
        _md5_b    = add32(_md5_b, rol32(_md5_F, _md5_s[_md5_i + 1]));
        _md5_a    = _md5_temp;

        _md5_i += 1;
    }

    # Add working variables back into hash state
    _md5_H0 = add32(_md5_H0, _md5_a);
    _md5_H1 = add32(_md5_H1, _md5_b);
    _md5_H2 = add32(_md5_H2, _md5_c);
    _md5_H3 = add32(_md5_H3, _md5_d);
}

# ── _md5_emit_word ────────────────────────────────────────────────────────────
# Appends a 32-bit word to md5_output as 4 little-endian bytes.
proc _md5_emit_word w {
    add $w % 0x100 to md5_output;
    add ($w // 0x100) % 0x100 to md5_output;
    add ($w // 0x10000) % 0x100 to md5_output;
    add ($w // 0x1000000) % 0x100 to md5_output;
}

# ── md5 ───────────────────────────────────────────────────────────────────────
# Entry point.  Reads md5_input, writes 16 bytes to md5_output.
proc md5 {
    _md5_pad_msg;

    # RFC 1321 Section 3.3 — initial hash values
    _md5_H0 = 0x67452301;
    _md5_H1 = 0xefcdab89;
    _md5_H2 = 0x98badcfe;
    _md5_H3 = 0x10325476;

    _md5_nchunks = length _md5_padded // 64;
    _md5_chunk = 0;
    repeat _md5_nchunks {
        _md5_process_chunk _md5_chunk * 64 + 1;
        _md5_chunk += 1;
    }

    delete md5_output;
    _md5_emit_word _md5_H0;
    _md5_emit_word _md5_H1;
    _md5_emit_word _md5_H2;
    _md5_emit_word _md5_H3;
}
