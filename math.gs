%define PI 3.141592653589793

%define E 2.718281828459045

%define MIN(A,B) ((A)+(((A)>(B))*((B)-(A))))

%define MAX(A,B) ((A)+(((A)<(B))*((B)-(A))))

%define RGB(R, G, B) (((R)*65536)+((G)*256)+(B))

%define RGBA(R, G, B, A) (((R)*65536)+((G)*256)+(B)+((A)*16777216))

%define HEX(VALUE) (("0x"&(VALUE))+0)

%define BIN(VALUE) (("0b"&(VALUE))+0)

%define OCT(VALUE) (("0o"&(VALUE))+0)

%define SIGN(VALUE) (((VALUE)>0)-((VALUE)<0))

%define ACOSH(X) ln((X)+sqrt((X)*(X)-1))

%define ASINH(X) ln((X)+sqrt((X)*(X)+1))

%define ATANH(X) ln((1+(X))/(1-(X)))/2

%define COSH(X) ((antiln(X)+antiln(-(X)))/2)

%define SINH(X) ((antiln(X)-antiln(-(X)))/2)

%define TANH(X) ((antiln(X)-antiln(-(X)))/(antiln(X)+antiln(-(X))))

%define MAG(X,Y) sqrt((X)*(X)+(Y)*(Y))

%define DIST(X1, Y1, X2, Y2) MAG(X2-X1,Y2-Y1)

%define RAD(DEG) ((DEG) * 0.017453292519943295)

%define DEG(RAD) ((RAD) * 57.29577951308232)

%define POW(BASE,EXP) antiln(ln(BASE)*(EXP))

%define ROOT(BASE,N) antiln(ln(BASE)/(N))

%define LOG(VAL,BASE) (ln(VAL)/ln(BASE))

%define LERP(T,OUT0,OUT1) ((OUT0)+(T)*((OUT1)-(OUT0)))

%define INVLERP(VAL,IN0,IN1) (((VAL)-(IN0))/((IN1)-(IN0)))

%define REMAP(T,IN0,IN1,OUT0,OUT1) (LERP(INVLERP(IN0,IN1,T),OUT0,OUT1))

%define CLAMP(VAL,MIN,MAX) ((MAX)-(((MAX)-((((VAL)-(MIN))*((VAL)>(MIN)))+ (MIN)))*((VAL)<(MAX))))

%define POSITIVE_CLAMP(VAL) (((VAL)>0)*(VAL))

%define NEGATIVE_CLAMP(VALUE) (((VALUE)<0)*(VALUE))

%define RANDOM() random("0.0", "1.0")

%define RANDOM_ANGLE() random("0.0", "360.0")

%define APPROX(A,B,TOLERANCE) (abs((B)-(A)) < (TOLERANCE))
