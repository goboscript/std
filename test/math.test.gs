%include ../math.gs

proc test {
    expect "PI", PI, to_be: "3.141592653589793";
    expect "E", E, to_be: "2.718281828459045";

    # MIN / MAX — boundary inversion, negatives, equality
    expect "MIN(-1, 1)",  MIN(_(-1), _(1)),  to_be: "-1";
    expect "MIN(-2, -1)", MIN(_(-2), _(-1)), to_be: "-2";
    expect "MIN(1, 1)",   MIN(_(1), _(1)),   to_be: "1";
    expect "MAX(-1, 1)",  MAX(_(-1), _(1)),  to_be: "1";
    expect "MAX(-2, -1)", MAX(_(-2), _(-1)), to_be: "-1";
    expect "MAX(1, 1)",   MAX(_(1), _(1)),   to_be: "1";

    # RGB / RGBA — black, white, primaries, alpha boundary
    expect "RGB(0, 0, 0)",       RGB(_(0), _(0), _(0)),       to_be: "0";
    expect "RGB(255, 255, 255)", RGB(_(255), _(255), _(255)), to_be: "16777215";
    expect "RGB(255, 0, 0)",     RGB(_(255), _(0), _(0)),     to_be: "16711680";
    expect "RGB(0, 255, 0)",     RGB(_(0), _(255), _(0)),     to_be: "65280";
    expect "RGB(0, 0, 255)",     RGB(_(0), _(0), _(255)),     to_be: "255";
    expect "RGBA(0, 0, 0, 0)",         RGBA(_(0), _(0), _(0), _(0)),         to_be: "0";
    expect "RGBA(255, 255, 255, 255)", RGBA(_(255), _(255), _(255), _(255)), to_be: "4294967295";
    expect "RGBA(0, 0, 0, 255)",       RGBA(_(0), _(0), _(0), _(255)),       to_be: "4278190080";
    expect "RGBA(255, 255, 255, 0)",   RGBA(_(255), _(255), _(255), _(0)),   to_be: "16777215";
    expect "RGBA(1, 2, 3, 4)",         RGBA(_(1), _(2), _(3), _(4)),         to_be: "67305987";

    # HEX / BIN / OCT — zero, single digit, multi-byte
    expect "HEX('0')",      HEX(_("0")),      to_be: "0";
    expect "HEX('FF')",     HEX(_("FF")),     to_be: "255";
    expect "HEX('FF0000')", HEX(_("FF0000")), to_be: "16711680";
    expect "BIN('0')",      BIN(_("0")),      to_be: "0";
    expect "BIN('1')",      BIN(_("1")),      to_be: "1";
    expect "BIN('10')",     BIN(_("10")),     to_be: "2";
    expect "BIN('11111111')", BIN(_("11111111")), to_be: "255";
    expect "OCT('0')",   OCT(_("0")),   to_be: "0";
    expect "OCT('7')",   OCT(_("7")),   to_be: "7";
    expect "OCT('10')",  OCT(_("10")),  to_be: "8";
    expect "OCT('377')", OCT(_("377")), to_be: "255";

    # SIGN — positive, zero, negative, fractional, infinity
    expect "SIGN(1)",        SIGN(_(1)),           to_be: "1";
    expect "SIGN(0)",        SIGN(_(0)),           to_be: "0";
    expect "SIGN(-1)",       SIGN(_(-1)),          to_be: "-1";
    expect "SIGN(0.001)",    SIGN(_(0.001)),       to_be: "1";
    expect "SIGN(Infinity)", SIGN(_("Infinity")),  to_be: "1";

    # Hyperbolic trig — zero, identity, symmetry
    expect "ACOSH(1)",  ACOSH(_(1)),  to_be: "0";
    expect "ACOSH(2)",  ACOSH(_(2)),  to_be: "1.3169578969248166";
    expect "ASINH(0)",  ASINH(_(0)),  to_be: "0";
    expect "ASINH(1)",  ASINH(_(1)),  to_be: "0.8813735870195429";
    expect "ASINH(-1)", ASINH(_(-1)), to_be: "-0.8813735870195428";
    expect "ATANH(0)",   ATANH(_(0)),   to_be: "0";
    expect "ATANH(0.5)", ATANH(_(0.5)), to_be: "0.5493061443340548";
    expect "ATANH(-0.5)",ATANH(_(-0.5)),to_be: "-0.5493061443340548";
    expect "ATANH(0.99)",ATANH(_(0.99)),to_be: "2.6466524123622457";
    expect "COSH(0)",  COSH(_(0)),  to_be: "1";
    expect "COSH(1)",  COSH(_(1)),  to_be: "1.5430806348152437";
    expect "COSH(-1)", COSH(_(-1)), to_be: "1.5430806348152437";  # even function
    expect "SINH(0)",  SINH(_(0)),  to_be: "0";
    expect "SINH(1)",  SINH(_(1)),  to_be: "1.1752011936438014";
    expect "SINH(-1)", SINH(_(-1)), to_be: "-1.1752011936438014"; # odd function
    expect "TANH(0)",   TANH(_(0)),   to_be: "0";
    expect "TANH(1)",   TANH(_(1)),   to_be: "0.7615941559557649";
    expect "TANH(-1)",  TANH(_(-1)),  to_be: "-0.7615941559557649";
    expect "TANH(10)",  TANH(_(10)),  to_be: "0.9999999958776927"; # near-1 saturation

    # MAG / DIST — zero, axis-aligned, Pythagorean triple, negatives
    expect "MAG(0, 0)",   MAG(_(0), _(0)),   to_be: "0";
    expect "MAG(3, 4)",   MAG(_(3), _(4)),   to_be: "5";
    expect "MAG(-3, -4)", MAG(_(-3), _(-4)), to_be: "5";
    expect "DIST(0, 0, 0, 0)",   DIST(_(0), _(0), _(0), _(0)),     to_be: "0";
    expect "DIST(0, 0, 3, 4)",   DIST(_(0), _(0), _(3), _(4)),     to_be: "5";
    expect "DIST(-1, -1, 2, 3)", DIST(_(-1), _(-1), _(2), _(3)),   to_be: "5";
    expect "DIST(2, 3, 2, 7)",   DIST(_(2), _(3), _(2), _(7)),     to_be: "4"; # vertical

    # RAD / DEG — zero, full circle, inverse relationship
    expect "RAD(0)",   RAD(_(0)),   to_be: "0";
    expect "RAD(180)", RAD(_(180)), to_be: "3.141592653589793";
    expect "RAD(360)", RAD(_(360)), to_be: "6.283185307179586";
    expect "RAD(-90)", RAD(_(-90)), to_be: "-1.5707963267948966";
    expect "DEG(0)",     DEG(_(0)),     to_be: "0";
    expect "DEG(PI)",    DEG(_(PI)),    to_be: "180";
    expect "DEG(2*PI)",  DEG(_(2*PI)), to_be: "360";
    expect "DEG(-PI/2)", DEG(_(-PI/2)),to_be: "-90";

    # POW / ROOT — identity, zero exp, fractional, inverse pair
    expect "POW(2, 0)",   POW(_(2), _(0)),   to_be: "1";
    expect "POW(2, 10)",  POW(_(2), _(10)),  to_be: "1024";
    expect "POW(4, 0.5)", POW(_(4), _(0.5)), to_be: "2";
    expect "POW(1, 100)", POW(_(1), _(100)), to_be: "1";
    expect "ROOT(4, 2)",  ROOT(_(4), _(2)),  to_be: "2";
    expect "ROOT(8, 3)",  ROOT(_(8), _(3)),  to_be: "2";
    expect "ROOT(1, 5)",  ROOT(_(1), _(5)),  to_be: "1";

    # LOG — log(1)=0, log(base)=1, powers
    expect "LOG(1, 10)",    LOG(_(1), _(10)),    to_be: "0";
    expect "LOG(10, 10)",   LOG(_(10), _(10)),   to_be: "1";
    expect "LOG(1000, 10)", LOG(_(1000), _(10)), to_be: "2.9999999999999996";
    expect "LOG(E, E)",     LOG(_(E), _(E)),     to_be: "1";
    expect "LOG(1024, 2)",  LOG(_(1024), _(2)),  to_be: "10";

    # LERP — endpoints, midpoint, negative range
    expect "LERP(0, 0, 10)",    LERP(_(0), _(0), _(10)),    to_be: "0";
    expect "LERP(1, 0, 10)",    LERP(_(1), _(0), _(10)),    to_be: "10";
    expect "LERP(0.5, 0, 10)",  LERP(_(0.5), _(0), _(10)), to_be: "5";
    expect "LERP(0.5, -10, 10)",LERP(_(0.5), _(-10), _(10)),to_be: "0";

    # INVLERP — inverse of LERP, endpoints, midpoint
    expect "INVLERP(0, 0, 10)",  INVLERP(_(0), _(0), _(10)),  to_be: "0";
    expect "INVLERP(10, 0, 10)", INVLERP(_(10), _(0), _(10)), to_be: "1";
    expect "INVLERP(5, 0, 10)",  INVLERP(_(5), _(0), _(10)),  to_be: "0.5";
    expect "INVLERP(0, -10, 10)",INVLERP(_(0), _(-10), _(10)),to_be: "0.5";

    # REMAP — endpoint preservation, midpoint, range flip
    expect "REMAP(0, 0, 1, 0, 100)",   REMAP(_(0), _(0), _(1), _(0), _(100)),   to_be: "0";
    expect "REMAP(1, 0, 1, 0, 100)",   REMAP(_(1), _(0), _(1), _(0), _(100)),   to_be: "100";
    expect "REMAP(0.5, 0, 1, 0, 100)", REMAP(_(0.5), _(0), _(1), _(0), _(100)), to_be: "50";
    expect "REMAP(5, 0, 10, -1, 1)",   REMAP(_(5), _(0), _(10), _(-1), _(1)),   to_be: "0";

    # CLAMP — within, below, above, boundary exact
    expect "CLAMP(5, 0, 10)",    CLAMP(_(5), _(0), _(10)),   to_be: "5";
    expect "CLAMP(-5, 0, 10)",   CLAMP(_(-5), _(0), _(10)),  to_be: "0";
    expect "CLAMP(15, 0, 10)",   CLAMP(_(15), _(0), _(10)),  to_be: "10";
    expect "CLAMP(0, 0, 10)",    CLAMP(_(0), _(0), _(10)),   to_be: "0";   # lower boundary
    expect "CLAMP(10, 0, 10)",   CLAMP(_(10), _(0), _(10)),  to_be: "10";  # upper boundary

    # POSITIVE_CLAMP / NEGATIVE_CLAMP — zero crossing, fractional
    expect "POSITIVE_CLAMP(5)",    POSITIVE_CLAMP(_(5)),    to_be: "5";
    expect "POSITIVE_CLAMP(-5)",   POSITIVE_CLAMP(_(-5)),   to_be: "0";
    expect "POSITIVE_CLAMP(0)",    POSITIVE_CLAMP(_(0)),    to_be: "0";
    expect "POSITIVE_CLAMP(-0.001)",POSITIVE_CLAMP(_(-0.001)),to_be: "0";
    expect "NEGATIVE_CLAMP(-5)",   NEGATIVE_CLAMP(_(-5)),   to_be: "-5";
    expect "NEGATIVE_CLAMP(5)",    NEGATIVE_CLAMP(_(5)),    to_be: "0";
    expect "NEGATIVE_CLAMP(0)",    NEGATIVE_CLAMP(_(0)),    to_be: "0";
    expect "NEGATIVE_CLAMP(0.001)",NEGATIVE_CLAMP(_(0.001)),to_be: "0";

    # APPROX — equal, within epsilon, just outside, negative span
    expect "APPROX(1, 1, 0.0001)",       APPROX(_(1), _(1), _(0.0001)),       to_be: "1";
    expect "APPROX(1, 1.00001, 0.0001)", APPROX(_(1), _(1.00001), _(0.0001)), to_be: "1";
    expect "APPROX(1, 1.001, 0.0001)",   APPROX(_(1), _(1.001), _(0.0001)),   to_be: "0";
    expect "APPROX(0, 1, 1)",            APPROX(_(0), _(1), _(1)),            to_be: "0"; # exactly at boundary
    expect "APPROX(-1, 1, 3)",           APPROX(_(-1), _(1), _(3)),           to_be: "1";
    expect "APPROX(-1, 1, 1)",           APPROX(_(-1), _(1), _(1)),           to_be: "0";
}
