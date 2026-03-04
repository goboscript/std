%include ../bitwise.gs

proc test {
    # XOR32
    expect "XOR32(0xDEADBEEF, 0xCAFEBABE)", XOR32(_(0xDEADBEEF), _(0xCAFEBABE)), to_be: "340984913";

    # AND8
    expect "AND8(0xF0, 0xAD)", AND8(_(0xF0), _(0xAD)), to_be: "160";

    # AND16
    expect "AND16(0xFF0F, 0xA5C3)", AND16(_(0xFF0F), _(0xA5C3)), to_be: "42243";

    # AND32
    expect "AND32(0xDEADBEEF, 0x0F0F0F0F)", AND32(_(0xDEADBEEF), _(0x0F0F0F0F)), to_be: "235736591";

    # OR8
    expect "OR8(0xB4, 0x2D)", OR8(_(0xB4), _(0x2D)), to_be: "189";

    # OR16
    expect "OR16(0xB00B, 0x1234)", OR16(_(0xB00B), _(0x1234)), to_be: "45631";

    # OR32
    expect "OR32(0xDEAD0000, 0x0000BEEF)", OR32(_(0xDEAD0000), _(0x0000BEEF)), to_be: "3735928559";

    # xor8 (func) — chosen so result is 0xFF (255), a good boundary check
    expect "xor8(0xA3, 0x5C)", xor8(_(0xA3), _(0x5C)), to_be: "255";

    # xor16 (func)
    expect "xor16(0xBEEF, 0xDEAD)", xor16(_(0xBEEF), _(0xDEAD)), to_be: "24642";

    # xor32 (func)
    expect "xor32(0x12345678, 0x9ABCDEF0)", xor32(_(0x12345678), _(0x9ABCDEF0)), to_be: "2290649224";

    # and8 (func)
    expect "and8(0xE7, 0x3C)", and8(_(0xE7), _(0x3C)), to_be: "36";

    # and16 (func)
    expect "and16(0xFACE, 0xBEEF)", and16(_(0xFACE), _(0xBEEF)), to_be: "47822";

    # and32 (func)
    expect "and32(0xCAFEBABE, 0xDEADBEEF)", and32(_(0xCAFEBABE), _(0xDEADBEEF)), to_be: "3400317614";

    # or8 (func)
    expect "or8(0x81, 0x42)", or8(_(0x81), _(0x42)), to_be: "195";

    # or16 (func)
    expect "or16(0x1337, 0xC0DE)", or16(_(0x1337), _(0xC0DE)), to_be: "54271";

    # or32 (func)
    expect "or32(0xC0DE0000, 0x0000CAFE)", or32(_(0xC0DE0000), _(0x0000CAFE)), to_be: "3235826430";
}
