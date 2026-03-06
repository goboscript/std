%include ../bitwise.gs

proc test {
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

    # NOT4 (macro)
    expect "NOT4(0x0)", NOT4(0x0), to_be: "15";
    expect "NOT4(0xF)", NOT4(0xF), to_be: "0";
    expect "NOT4(0xA)", NOT4(0xA), to_be: "5";
    expect "NOT4(0x5)", NOT4(0x5), to_be: "10";

    # not8 (func)
    expect "not8(0x00)", not8(_(0x00)), to_be: "255";
    expect "not8(0xFF)", not8(_(0xFF)), to_be: "0";
    expect "not8(0xA5)", not8(_(0xA5)), to_be: "90";   # 0x5A
    expect "not8(0xF0)", not8(_(0xF0)), to_be: "15";   # 0x0F

    # not16 (func)
    expect "not16(0x0000)", not16(_(0x0000)), to_be: "65535";
    expect "not16(0xFFFF)", not16(_(0xFFFF)), to_be: "0";
    expect "not16(0xA5A5)", not16(_(0xA5A5)), to_be: "23130"; # 0x5A5A
    expect "not16(0xDEAD)", not16(_(0xDEAD)), to_be: "8530";  # 0x2152

    # not32 (func)
    expect "not32(0x00000000)", not32(_(0x00000000)), to_be: "4294967295";
    expect "not32(0xFFFFFFFF)", not32(_(0xFFFFFFFF)), to_be: "0";
    expect "not32(0xDEADBEEF)", not32(_(0xDEADBEEF)), to_be: "559038736"; # 0x21524110
    expect "not32(0xA5A5A5A5)", not32(_(0xA5A5A5A5)), to_be: "1515870810"; # 0x5A5A5A5A

    # ADD32 (macro)
    expect "ADD32(1, 1)", ADD32(1, 1), to_be: "2";
    expect "ADD32(0xFFFFFFFF, 1) wraps", ADD32(0xFFFFFFFF, 1), to_be: "0";
    expect "ADD32(0x80000000, 0x80000000) wraps", ADD32(0x80000000, 0x80000000), to_be: "0";
    expect "ADD32(0xDEADBEEF, 0x12345678)", ADD32(0xDEADBEEF, 0x12345678), to_be: "4041348455"; # 0xF0E21567

    # add32 (func)
    expect "add32(0, 0)", add32(_(0), _(0)), to_be: "0";
    expect "add32(1, 1)", add32(_(1), _(1)), to_be: "2";
    expect "add32(0xFFFFFFFF, 1) wraps", add32(_(0xFFFFFFFF), _(1)), to_be: "0";
    expect "add32(0x80000000, 0x80000000) wraps", add32(_(0x80000000), _(0x80000000)), to_be: "0";
    expect "add32(0xDEADBEEF, 0x12345678)", add32(_(0xDEADBEEF), _(0x12345678)), to_be: "4041348455";
    expect "add32(0xCAFEBABE, 0xDEADBEEF)", add32(_(0xCAFEBABE), _(0xDEADBEEF)), to_be: "2846652845"; # 0xA9AC79AD

    # ROL32 (macro, single step)
    # NOTE: ROL32 has a bug — (A) > 0xFFFFFFFF is always 0, so the MSB carry
    # is never captured. The two tests below expose it.
    expect "ROL32(1)", ROL32(1), to_be: "2";
    expect "ROL32(0x40000000)", ROL32(0x40000000), to_be: "2147483648"; # MSB 0 → safe
    expect "ROL32(0x80000000) carry bug", ROL32(0x80000000), to_be: "1"; # FAILS: gives 0
    expect "ROL32(0xDEADBEEF) carry bug", ROL32(0xDEADBEEF), to_be: "2932443615"; # 0xBD5B7DDF — FAILS: gives 0xBD5B7DDE

    # rol32 (func)
    expect "rol32(1, 0) identity", rol32(_(1), _(0)), to_be: "1";
    expect "rol32(1, 1)", rol32(_(1), _(1)), to_be: "2";
    expect "rol32(1, 31)", rol32(_(1), _(31)), to_be: "2147483648"; # 0x80000000
    expect "rol32(0x12345678, 8)", rol32(_(0x12345678), _(8)), to_be: "878082066"; # 0x34567812
    expect "rol32(1, 32) mod wraps to identity", rol32(_(1), _(32)), to_be: "1";
    expect "rol32(0x80000000, 1) carry bug", rol32(_(0x80000000), _(1)), to_be: "1"; # FAILS: gives 0
    expect "rol32(0xDEADBEEF, 4) carry bug", rol32(_(0xDEADBEEF), _(4)), to_be: "3940282109"; # 0xEADBEEFD — FAILS

}
