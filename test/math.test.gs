%include ../math.gs

proc test_math {
    expect "PI", PI, to_be: "3.141592653589793";
    expect "E", E, to_be: "2.718281828459045";

    # MIN
    expect "MIN(1, 2)", MIN(_(1), _(2)), to_be: "1";
    expect "MIN(2, 1)", MIN(_(2), _(1)), to_be: "1";
    expect "MIN(1, 1)", MIN(_(1), _(1)), to_be: "1";
    expect "MIN(-1, 1)", MIN(_(-1), _(1)), to_be: "-1";
    expect "MIN(1, -1)", MIN(_(1), _(-1)), to_be: "-1";
    expect "MIN(-1, -2)", MIN(_(-1), _(-2)), to_be: "-2";
    expect "MIN(-2, -1)", MIN(_(-2), _(-1)), to_be: "-2";
    expect "MIN(0, 0)", MIN(_(0), _(0)), to_be: "0";
    expect "MIN(0, 1)", MIN(_(0), _(1)), to_be: "0";
    expect "MIN(1, 0)", MIN(_(1), _(0)), to_be: "0";

    # MAX
    expect "MAX(1, 2)", MAX(_(1), _(2)), to_be: "2";
    expect "MAX(2, 1)", MAX(_(2), _(1)), to_be: "2";
    expect "MAX(1, 1)", MAX(_(1), _(1)), to_be: "1";
    expect "MAX(-1, 1)", MAX(_(-1), _(1)), to_be: "1";
    expect "MAX(1, -1)", MAX(_(1), _(-1)), to_be: "1";
    expect "MAX(-1, -2)", MAX(_(-1), _(-2)), to_be: "-1";
    expect "MAX(-2, -1)", MAX(_(-2), _(-1)), to_be: "-1";
    expect "MAX(0, 0)", MAX(_(0), _(0)), to_be: "0";
    expect "MAX(0, 1)", MAX(_(0), _(1)), to_be: "1";
    expect "MAX(1, 0)", MAX(_(1), _(0)), to_be: "1";

    # RGB
    expect "RGB(0, 0, 0)", RGB(_(0), _(0), _(0)), to_be: "0";
    expect "RGB(255, 255, 255)", RGB(_(255), _(255), _(255)), to_be: "16777215";
    expect "RGB(255, 0, 0)", RGB(_(255), _(0), _(0)), to_be: "16711680";
    expect "RGB(0, 255, 0)", RGB(_(0), _(255), _(0)), to_be: "65280";
    expect "RGB(0, 0, 255)", RGB(_(0), _(0), _(255)), to_be: "255";
    expect "RGB(128, 0, 0)", RGB(_(128), _(0), _(0)), to_be: "8388608";
    expect "RGB(0, 128, 0)", RGB(_(0), _(128), _(0)), to_be: "32768";
    expect "RGB(0, 0, 128)", RGB(_(0), _(0), _(128)), to_be: "128";
    expect "RGB(255, 128, 0)", RGB(_(255), _(128), _(0)), to_be: "16744448";
    expect "RGB(64, 128, 192)", RGB(_(64), _(128), _(192)), to_be: "4227264";

    # RGBA
    expect "RGBA(0, 0, 0, 0)", RGBA(_(0), _(0), _(0), _(0)), to_be: "0";
    expect "RGBA(255, 255, 255, 255)", RGBA(_(255), _(255), _(255), _(255)), to_be: "4294967295";
    expect "RGBA(255, 0, 0, 255)", RGBA(_(255), _(0), _(0), _(255)), to_be: "4278190080" + 16711680;
    expect "RGBA(0, 0, 0, 255)", RGBA(_(0), _(0), _(0), _(255)), to_be: "4278190080";
    expect "RGBA(255, 255, 255, 0)", RGBA(_(255), _(255), _(255), _(0)), to_be: "16777215";
    expect "RGBA(0, 255, 0, 128)", RGBA(_(0), _(255), _(0), _(128)), to_be: "2147549184";
    expect "RGBA(0, 0, 255, 1)", RGBA(_(0), _(0), _(255), _(1)), to_be: "16777471";
    expect "RGBA(128, 128, 128, 128)", RGBA(_(128), _(128), _(128), _(128)), to_be: "2155905152";
    expect "RGBA(10, 20, 30, 40)", RGBA(_(10), _(20), _(30), _(40)), to_be: "671154206";
    expect "RGBA(1, 2, 3, 4)", RGBA(_(1), _(2), _(3), _(4)), to_be: "67305987";

    # HEX
    expect "HEX('FF')", HEX(_("FF")), to_be: "255";
    expect "HEX('0')", HEX(_("0")), to_be: "0";
    expect "HEX('10')", HEX(_("10")), to_be: "16";
    expect "HEX('1A')", HEX(_("1A")), to_be: "26";
    expect "HEX('FF0000')", HEX(_("FF0000")), to_be: "16711680";
    expect "HEX('00FF00')", HEX(_("00FF00")), to_be: "65280";
    expect "HEX('0000FF')", HEX(_("0000FF")), to_be: "255";
    expect "HEX('FFFFFF')", HEX(_("FFFFFF")), to_be: "16777215";
    expect "HEX('A')", HEX(_("A")), to_be: "10";
    expect "HEX('64')", HEX(_("64")), to_be: "100";

    # BIN
    expect "BIN('0')", BIN(_("0")), to_be: "0";
    expect "BIN('1')", BIN(_("1")), to_be: "1";
    expect "BIN('10')", BIN(_("10")), to_be: "2";
    expect "BIN('11')", BIN(_("11")), to_be: "3";
    expect "BIN('100')", BIN(_("100")), to_be: "4";
    expect "BIN('1000')", BIN(_("1000")), to_be: "8";
    expect "BIN('1010')", BIN(_("1010")), to_be: "10";
    expect "BIN('1111')", BIN(_("1111")), to_be: "15";
    expect "BIN('10000000')", BIN(_("10000000")), to_be: "128";
    expect "BIN('11111111')", BIN(_("11111111")), to_be: "255";

    # OCT
    expect "OCT('0')", OCT(_("0")), to_be: "0";
    expect "OCT('1')", OCT(_("1")), to_be: "1";
    expect "OCT('7')", OCT(_("7")), to_be: "7";
    expect "OCT('10')", OCT(_("10")), to_be: "8";
    expect "OCT('17')", OCT(_("17")), to_be: "15";
    expect "OCT('20')", OCT(_("20")), to_be: "16";
    expect "OCT('77')", OCT(_("77")), to_be: "63";
    expect "OCT('100')", OCT(_("100")), to_be: "64";
    expect "OCT('377')", OCT(_("377")), to_be: "255";
    expect "OCT('144')", OCT(_("144")), to_be: "100";

    # SIGN
    expect "SIGN(1)", SIGN(_(1)), to_be: "1";
    expect "SIGN(0)", SIGN(_(0)), to_be: "0";
    expect "SIGN(-1)", SIGN(_(-1)), to_be: "-1";
    expect "SIGN(100)", SIGN(_(100)), to_be: "1";
    expect "SIGN(-100)", SIGN(_(-100)), to_be: "-1";
    expect "SIGN(0.5)", SIGN(_(0.5)), to_be: "1";
    expect "SIGN(-0.5)", SIGN(_(-0.5)), to_be: "-1";
    expect "SIGN(0.001)", SIGN(_(0.001)), to_be: "1";
    expect "SIGN(-0.001)", SIGN(_(-0.001)), to_be: "-1";
    expect "SIGN(Infinity)", SIGN(_("Infinity")), to_be: "1";

    # ACOSH
    expect "ACOSH(1)", ACOSH(_(1)), to_be: "0";
    expect "ACOSH(2)", ACOSH(_(2)), to_be: "1.3169578969248166";
    expect "ACOSH(10)", ACOSH(_(10)), to_be: "2.993222846126381";
    expect "ACOSH(100)", ACOSH(_(100)), to_be: "5.298292365610484";
    expect "ACOSH(1.5)", ACOSH(_(1.5)), to_be: "0.9624236501192069";
    expect "ACOSH(3)", ACOSH(_(3)), to_be: "1.7627471740390859";
    expect "ACOSH(5)", ACOSH(_(5)), to_be: "2.2924316695611777";
    expect "ACOSH(1.0001)", ACOSH(_(1.0001)), to_be: "0.014142136284990758";
    expect "ACOSH(50)", ACOSH(_(50)), to_be: "4.605220183488258";
    expect "ACOSH(1000)", ACOSH(_(1000)), to_be: "7.600902209541989";

    # ASINH
    expect "ASINH(0)", ASINH(_(0)), to_be: "0";
    expect "ASINH(1)", ASINH(_(1)), to_be: "0.881373587019543";
    expect "ASINH(-1)", ASINH(_(-1)), to_be: "-0.881373587019543";
    expect "ASINH(2)", ASINH(_(2)), to_be: "1.4436354751788103";
    expect "ASINH(-2)", ASINH(_(-2)), to_be: "-1.4436354751788103";
    expect "ASINH(10)", ASINH(_(10)), to_be: "2.99822295029797";
    expect "ASINH(-10)", ASINH(_(-10)), to_be: "-2.99822295029797";
    expect "ASINH(0.5)", ASINH(_(0.5)), to_be: "0.48121182505960347";
    expect "ASINH(-0.5)", ASINH(_(-0.5)), to_be: "-0.48121182505960347";
    expect "ASINH(100)", ASINH(_(100)), to_be: "5.298342365610589";

    # ATANH
    expect "ATANH(0)", ATANH(_(0)), to_be: "0";
    expect "ATANH(0.5)", ATANH(_(0.5)), to_be: "0.5493061443340548";
    expect "ATANH(-0.5)", ATANH(_(-0.5)), to_be: "-0.5493061443340548";
    expect "ATANH(0.9)", ATANH(_(0.9)), to_be: "1.4722194895832204";
    expect "ATANH(-0.9)", ATANH(_(-0.9)), to_be: "-1.4722194895832204";
    expect "ATANH(0.1)", ATANH(_(0.1)), to_be: "0.10033534773107558";
    expect "ATANH(-0.1)", ATANH(_(-0.1)), to_be: "-0.10033534773107558";
    expect "ATANH(0.99)", ATANH(_(0.99)), to_be: "2.6466524123622457";
    expect "ATANH(-0.99)", ATANH(_(-0.99)), to_be: "-2.6466524123622457";
    expect "ATANH(0.25)", ATANH(_(0.25)), to_be: "0.25541281188299536";

    # COSH
    expect "COSH(0)", COSH(_(0)), to_be: "1";
    expect "COSH(1)", COSH(_(1)), to_be: "1.5430806348152437";
    expect "COSH(-1)", COSH(_(-1)), to_be: "1.5430806348152437";
    expect "COSH(2)", COSH(_(2)), to_be: "3.7621956910836446";
    expect "COSH(-2)", COSH(_(-2)), to_be: "3.7621956910836446";
    expect "COSH(0.5)", COSH(_(0.5)), to_be: "1.1276259652063807";
    expect "COSH(-0.5)", COSH(_(-0.5)), to_be: "1.1276259652063807";
    expect "COSH(3)", COSH(_(3)), to_be: "10.067661995777765";
    expect "COSH(5)", COSH(_(5)), to_be: "74.20994852478785";
    expect "COSH(10)", COSH(_(10)), to_be: "11013.232920103323";

    # SINH
    expect "SINH(0)", SINH(_(0)), to_be: "0";
    expect "SINH(1)", SINH(_(1)), to_be: "1.1752011936438014";
    expect "SINH(-1)", SINH(_(-1)), to_be: "-1.1752011936438014";
    expect "SINH(2)", SINH(_(2)), to_be: "3.626860407847019";
    expect "SINH(-2)", SINH(_(-2)), to_be: "-3.626860407847019";
    expect "SINH(0.5)", SINH(_(0.5)), to_be: "0.5210953054937474";
    expect "SINH(-0.5)", SINH(_(-0.5)), to_be: "-0.5210953054937474";
    expect "SINH(3)", SINH(_(3)), to_be: "10.017874927409903";
    expect "SINH(5)", SINH(_(5)), to_be: "74.20321057778875";
    expect "SINH(10)", SINH(_(10)), to_be: "11013.232874703393";

    # TANH
    expect "TANH(0)", TANH(_(0)), to_be: "0";
    expect "TANH(1)", TANH(_(1)), to_be: "0.7615941559557649";
    expect "TANH(-1)", TANH(_(-1)), to_be: "-0.7615941559557649";
    expect "TANH(2)", TANH(_(2)), to_be: "0.9640275801075868";
    expect "TANH(-2)", TANH(_(-2)), to_be: "-0.9640275801075868";
    expect "TANH(0.5)", TANH(_(0.5)), to_be: "0.46211715726000974";
    expect "TANH(-0.5)", TANH(_(-0.5)), to_be: "-0.46211715726000974";
    expect "TANH(10)", TANH(_(10)), to_be: "0.9999999958776927";
    expect "TANH(-10)", TANH(_(-10)), to_be: "-0.9999999958776927";
    expect "TANH(0.1)", TANH(_(0.1)), to_be: "0.09966799462495582";

    # MAG
    expect "MAG(3, 4)", MAG(_(3), _(4)), to_be: "5";
    expect "MAG(0, 0)", MAG(_(0), _(0)), to_be: "0";
    expect "MAG(1, 0)", MAG(_(1), _(0)), to_be: "1";
    expect "MAG(0, 1)", MAG(_(0), _(1)), to_be: "1";
    expect "MAG(5, 12)", MAG(_(5), _(12)), to_be: "13";
    expect "MAG(8, 15)", MAG(_(8), _(15)), to_be: "17";
    expect "MAG(-3, 4)", MAG(_(-3), _(4)), to_be: "5";
    expect "MAG(3, -4)", MAG(_(3), _(-4)), to_be: "5";
    expect "MAG(-3, -4)", MAG(_(-3), _(-4)), to_be: "5";
    expect "MAG(1, 1)", MAG(_(1), _(1)), to_be: "1.4142135623730951";

    # DIST
    expect "DIST(0, 0, 3, 4)", DIST(_(0), _(0), _(3), _(4)), to_be: "5";
    expect "DIST(0, 0, 0, 0)", DIST(_(0), _(0), _(0), _(0)), to_be: "0";
    expect "DIST(1, 1, 1, 1)", DIST(_(1), _(1), _(1), _(1)), to_be: "0";
    expect "DIST(0, 0, 5, 12)", DIST(_(0), _(0), _(5), _(12)), to_be: "13";
    expect "DIST(1, 1, 4, 5)", DIST(_(1), _(1), _(4), _(5)), to_be: "5";
    expect "DIST(-1, -1, 2, 3)", DIST(_(-1), _(-1), _(2), _(3)), to_be: "5";
    expect "DIST(0, 0, -3, -4)", DIST(_(0), _(0), _(-3), _(-4)), to_be: "5";
    expect "DIST(2, 3, 2, 7)", DIST(_(2), _(3), _(2), _(7)), to_be: "4";
    expect "DIST(2, 3, 6, 3)", DIST(_(2), _(3), _(6), _(3)), to_be: "4";
    expect "DIST(0, 0, 1, 1)", DIST(_(0), _(0), _(1), _(1)), to_be: "1.4142135623730951";

    # RAD
    expect "RAD(0)", RAD(_(0)), to_be: "0";
    expect "RAD(180)", RAD(_(180)), to_be: "3.141592653589793";
    expect "RAD(90)", RAD(_(90)), to_be: "1.5707963267948966";
    expect "RAD(360)", RAD(_(360)), to_be: "6.283185307179586";
    expect "RAD(45)", RAD(_(45)), to_be: "0.7853981633974483";
    expect "RAD(60)", RAD(_(60)), to_be: "1.0471975511965976";
    expect "RAD(30)", RAD(_(30)), to_be: "0.5235987755982988";
    expect "RAD(270)", RAD(_(270)), to_be: "4.71238898038469";
    expect "RAD(-90)", RAD(_(-90)), to_be: "-1.5707963267948966";
    expect "RAD(1)", RAD(_(1)), to_be: "0.017453292519943295";

    # DEG
    expect "DEG(0)", DEG(_(0)), to_be: "0";
    expect "DEG(PI)", DEG(_(PI)), to_be: "180";
    expect "DEG(PI/2)", DEG(_(PI/2)), to_be: "90";
    expect "DEG(2*PI)", DEG(_(2*PI)), to_be: "360";
    expect "DEG(PI/4)", DEG(_(PI/4)), to_be: "45";
    expect "DEG(PI/3)", DEG(_(PI/3)), to_be: "60";
    expect "DEG(PI/6)", DEG(_(PI/6)), to_be: "30";
    expect "DEG(3*PI/2)", DEG(_(3*PI/2)), to_be: "270";
    expect "DEG(-PI/2)", DEG(_(-PI/2)), to_be: "-90";
    expect "DEG(1)", DEG(_(1)), to_be: "57.29577951308232";

    # POW
    expect "POW(2, 10)", POW(_(2), _(10)), to_be: "1024";
    expect "POW(2, 0)", POW(_(2), _(0)), to_be: "1";
    expect "POW(2, 1)", POW(_(2), _(1)), to_be: "2";
    expect "POW(10, 3)", POW(_(10), _(3)), to_be: "1000";
    expect "POW(3, 3)", POW(_(3), _(3)), to_be: "27";
    expect "POW(5, 2)", POW(_(5), _(2)), to_be: "25";
    expect "POW(2, 8)", POW(_(2), _(8)), to_be: "256";
    expect "POW(4, 0.5)", POW(_(4), _(0.5)), to_be: "2";
    expect "POW(27, 1/3)", POW(_(27), _(1/3)), to_be: "3";
    expect "POW(1, 100)", POW(_(1), _(100)), to_be: "1";

    # ROOT
    expect "ROOT(4, 2)", ROOT(_(4), _(2)), to_be: "2";
    expect "ROOT(8, 3)", ROOT(_(8), _(3)), to_be: "2";
    expect "ROOT(16, 4)", ROOT(_(16), _(4)), to_be: "2";
    expect "ROOT(27, 3)", ROOT(_(27), _(3)), to_be: "3";
    expect "ROOT(100, 2)", ROOT(_(100), _(2)), to_be: "10";
    expect "ROOT(1, 5)", ROOT(_(1), _(5)), to_be: "1";
    expect "ROOT(32, 5)", ROOT(_(32), _(5)), to_be: "2";
    expect "ROOT(1000000, 6)", ROOT(_(1000000), _(6)), to_be: "10";
    expect "ROOT(256, 8)", ROOT(_(256), _(8)), to_be: "2";
    expect "ROOT(9, 2)", ROOT(_(9), _(2)), to_be: "3";

    # LOG
    expect "LOG(100, 10)", LOG(_(100), _(10)), to_be: "2";
    expect "LOG(8, 2)", LOG(_(8), _(2)), to_be: "3";
    expect "LOG(1, 10)", LOG(_(1), _(10)), to_be: "0";
    expect "LOG(10, 10)", LOG(_(10), _(10)), to_be: "1";
    expect "LOG(1000, 10)", LOG(_(1000), _(10)), to_be: "3";
    expect "LOG(16, 2)", LOG(_(16), _(2)), to_be: "4";
    expect "LOG(256, 2)", LOG(_(256), _(2)), to_be: "8";
    expect "LOG(27, 3)", LOG(_(27), _(3)), to_be: "3";
    expect "LOG(E, E)", LOG(_(E), _(E)), to_be: "1";
    expect "LOG(1024, 2)", LOG(_(1024), _(2)), to_be: "10";

    # LERP
    expect "LERP(0, 0, 10)", LERP(_(0), _(0), _(10)), to_be: "0";
    expect "LERP(1, 0, 10)", LERP(_(1), _(0), _(10)), to_be: "10";
    expect "LERP(0.5, 0, 10)", LERP(_(0.5), _(0), _(10)), to_be: "5";
    expect "LERP(0.25, 0, 10)", LERP(_(0.25), _(0), _(10)), to_be: "2.5";
    expect "LERP(0.75, 0, 10)", LERP(_(0.75), _(0), _(10)), to_be: "7.5";
    expect "LERP(0, -10, 10)", LERP(_(0), _(-10), _(10)), to_be: "-10";
    expect "LERP(1, -10, 10)", LERP(_(1), _(-10), _(10)), to_be: "10";
    expect "LERP(0.5, -10, 10)", LERP(_(0.5), _(-10), _(10)), to_be: "0";
    expect "LERP(0.5, 5, 15)", LERP(_(0.5), _(5), _(15)), to_be: "10";
    expect "LERP(0.1, 0, 100)", LERP(_(0.1), _(0), _(100)), to_be: "10";

    # INVLERP
    expect "INVLERP(0, 0, 10)", INVLERP(_(0), _(0), _(10)), to_be: "0";
    expect "INVLERP(10, 0, 10)", INVLERP(_(10), _(0), _(10)), to_be: "1";
    expect "INVLERP(5, 0, 10)", INVLERP(_(5), _(0), _(10)), to_be: "0.5";
    expect "INVLERP(2.5, 0, 10)", INVLERP(_(2.5), _(0), _(10)), to_be: "0.25";
    expect "INVLERP(7.5, 0, 10)", INVLERP(_(7.5), _(0), _(10)), to_be: "0.75";
    expect "INVLERP(-10, -10, 10)", INVLERP(_(-10), _(-10), _(10)), to_be: "0";
    expect "INVLERP(10, -10, 10)", INVLERP(_(10), _(-10), _(10)), to_be: "1";
    expect "INVLERP(0, -10, 10)", INVLERP(_(0), _(-10), _(10)), to_be: "0.5";
    expect "INVLERP(5, 0, 100)", INVLERP(_(5), _(0), _(100)), to_be: "0.05";
    expect "INVLERP(50, 0, 200)", INVLERP(_(50), _(0), _(200)), to_be: "0.25";

    # REMAP
    expect "REMAP(0, 0, 1, 0, 100)", REMAP(_(0), _(0), _(1), _(0), _(100)), to_be: "0";
    expect "REMAP(1, 0, 1, 0, 100)", REMAP(_(1), _(0), _(1), _(0), _(100)), to_be: "100";
    expect "REMAP(0.5, 0, 1, 0, 100)", REMAP(_(0.5), _(0), _(1), _(0), _(100)), to_be: "50";
    expect "REMAP(5, 0, 10, 0, 100)", REMAP(_(5), _(0), _(10), _(0), _(100)), to_be: "50";
    expect "REMAP(0, 0, 10, -1, 1)", REMAP(_(0), _(0), _(10), _(-1), _(1)), to_be: "-1";
    expect "REMAP(10, 0, 10, -1, 1)", REMAP(_(10), _(0), _(10), _(-1), _(1)), to_be: "1";
    expect "REMAP(5, 0, 10, -1, 1)", REMAP(_(5), _(0), _(10), _(-1), _(1)), to_be: "0";
    expect "REMAP(2, 0, 4, 100, 200)", REMAP(_(2), _(0), _(4), _(100), _(200)), to_be: "150";
    expect "REMAP(3, 0, 10, 0, 1)", REMAP(_(3), _(0), _(10), _(0), _(1)), to_be: "0.3";
    expect "REMAP(25, 0, 100, 0, 1)", REMAP(_(25), _(0), _(100), _(0), _(1)), to_be: "0.25";

    # CLAMP
    expect "CLAMP(5, 0, 10)", CLAMP(_(5), _(0), _(10)), to_be: "5";
    expect "CLAMP(-5, 0, 10)", CLAMP(_(-5), _(0), _(10)), to_be: "0";
    expect "CLAMP(15, 0, 10)", CLAMP(_(15), _(0), _(10)), to_be: "10";
    expect "CLAMP(0, 0, 10)", CLAMP(_(0), _(0), _(10)), to_be: "0";
    expect "CLAMP(10, 0, 10)", CLAMP(_(10), _(0), _(10)), to_be: "10";
    expect "CLAMP(5, 5, 5)", CLAMP(_(5), _(5), _(5)), to_be: "5";
    expect "CLAMP(-100, -10, 10)", CLAMP(_(-100), _(-10), _(10)), to_be: "-10";
    expect "CLAMP(100, -10, 10)", CLAMP(_(100), _(-10), _(10)), to_be: "10";
    expect "CLAMP(0, -10, 10)", CLAMP(_(0), _(-10), _(10)), to_be: "0";
    expect "CLAMP(3, 1, 5)", CLAMP(_(3), _(1), _(5)), to_be: "3";

    # POSITIVE_CLAMP
    expect "POSITIVE_CLAMP(5)", POSITIVE_CLAMP(_(5)), to_be: "5";
    expect "POSITIVE_CLAMP(-5)", POSITIVE_CLAMP(_(-5)), to_be: "0";
    expect "POSITIVE_CLAMP(0)", POSITIVE_CLAMP(_(0)), to_be: "0";
    expect "POSITIVE_CLAMP(100)", POSITIVE_CLAMP(_(100)), to_be: "100";
    expect "POSITIVE_CLAMP(-100)", POSITIVE_CLAMP(_(-100)), to_be: "0";
    expect "POSITIVE_CLAMP(0.5)", POSITIVE_CLAMP(_(0.5)), to_be: "0.5";
    expect "POSITIVE_CLAMP(-0.5)", POSITIVE_CLAMP(_(-0.5)), to_be: "0";
    expect "POSITIVE_CLAMP(0.001)", POSITIVE_CLAMP(_(0.001)), to_be: "0.001";
    expect "POSITIVE_CLAMP(-0.001)", POSITIVE_CLAMP(_(-0.001)), to_be: "0";
    expect "POSITIVE_CLAMP(1000000)", POSITIVE_CLAMP(_(1000000)), to_be: "1000000";

    # NEGATIVE_CLAMP
    expect "NEGATIVE_CLAMP(-5)", NEGATIVE_CLAMP(_(-5)), to_be: "-5";
    expect "NEGATIVE_CLAMP(5)", NEGATIVE_CLAMP(_(5)), to_be: "0";
    expect "NEGATIVE_CLAMP(0)", NEGATIVE_CLAMP(_(0)), to_be: "0";
    expect "NEGATIVE_CLAMP(-100)", NEGATIVE_CLAMP(_(-100)), to_be: "-100";
    expect "NEGATIVE_CLAMP(100)", NEGATIVE_CLAMP(_(100)), to_be: "0";
    expect "NEGATIVE_CLAMP(-0.5)", NEGATIVE_CLAMP(_(-0.5)), to_be: "-0.5";
    expect "NEGATIVE_CLAMP(0.5)", NEGATIVE_CLAMP(_(0.5)), to_be: "0";
    expect "NEGATIVE_CLAMP(-0.001)", NEGATIVE_CLAMP(_(-0.001)), to_be: "-0.001";
    expect "NEGATIVE_CLAMP(0.001)", NEGATIVE_CLAMP(_(0.001)), to_be: "0";
    expect "NEGATIVE_CLAMP(-1000000)", NEGATIVE_CLAMP(_(-1000000)), to_be: "-1000000";

    # APPROX
    expect "APPROX(1, 1, 0.0001)", APPROX(_(1), _(1), _(0.0001)), to_be: "1";
    expect "APPROX(1, 2, 0.0001)", APPROX(_(1), _(2), _(0.0001)), to_be: "0";
    expect "APPROX(1, 1.00001, 0.0001)", APPROX(_(1), _(1.00001), _(0.0001)), to_be: "1";
    expect "APPROX(1, 1.001, 0.0001)", APPROX(_(1), _(1.001), _(0.0001)), to_be: "0";
    expect "APPROX(0, 0, 1)", APPROX(_(0), _(0), _(1)), to_be: "1";
    expect "APPROX(0, 0.5, 1)", APPROX(_(0), _(0.5), _(1)), to_be: "1";
    expect "APPROX(0, 1, 1)", APPROX(_(0), _(1), _(1)), to_be: "0";
    expect "APPROX(-1, 1, 3)", APPROX(_(-1), _(1), _(3)), to_be: "1";
    expect "APPROX(-1, 1, 1)", APPROX(_(-1), _(1), _(1)), to_be: "0";
    expect "APPROX(100, 100.0001, 0.001)", APPROX(_(100), _(100.0001), _(0.001)), to_be: "1";
}
