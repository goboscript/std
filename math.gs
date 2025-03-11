%define PI 3.141592653589793
%define E 2.718281828459045
%define SQRT2 1.4142135623730951

# Return the minimum of `A` and `B`.
%define MIN(A,B) ((A) - ((A) - (B)) * ((A) > (B)))

# Return the maximum of `A` and `B`.
%define MAX(A,B) ((A) + ((B) - (A)) * ((A) < (B)))

# Combine RGB values into a single value for use with the `set_pen_color` block.
%define RGB(R,G,B) (((R) * 65536) + ((G) * 256) + (B))

# Combine RGBA values into a single value for use with the `set_pen_color` block.
%define RGBA(R,G,B,A) (((R) * 65536) + ((G) * 256) + (B) + ((A) * 16777216))

# Parse a hexadecimal value.
%define HEX(VALUE) (("0x"&(VALUE))+0)

# Parse a binary value.
%define BIN(VALUE) (("0b"&(VALUE))+0)

# Parse a octal value.
%define OCT(VALUE) (("0o"&(VALUE))+0)

%define ACOSH(X) ln((X)+sqrt((X)*(X)-1))
%define ASINH(X) ln((X)+sqrt((X)*(X)+1))
%define ATANH(X) ln((1+(X))/(1-(X)))/2
%define COSH(X) ((antiln(X)+antiln(-(X)))/2)
%define SINH(X) ((antiln(X)-antiln(-(X)))/2)
%define TANH(X) ((antiln(X)-antiln(-(X)))/(antiln(X)+antiln(-(X))))

# Return the distance between the points `(X1,Y1)` and `(X2,Y2)`.
%define DIST(X1,Y1,X2,Y2) sqrt(((X2)-(X1))*((X2)-(X1))+((Y2)-(Y1))*((Y2)-(Y1)))

# Return the magnitude of the vector `(X,Y)`.
%define MAG(X,Y) sqrt((X)*(X)+(Y)*(Y))

# Return `BASE` raised to the power of `EXP`.
%define POW(BASE,EXP) antiln(ln(BASE)*(EXP))

# Should the paramaters be reversed?
%define LOGB(VALUE,BASE) ln(VALUE) / ln(BASE)

# Return the sign of `VALUE` (-1 when negative, 1 when positive, and 0 if 0)
%define SIGN(VALUE) ((VALUE > 0) - (VALUE < 0))

func safepow(base, exp) {
    return POW($base, abs($exp)) * SIGN($exp);
}

func atan2(y, x) {
    # It is better to make it a function since it uses the arguments multiple times
    # formula from https://en.wikipedia.org/wiki/Atan2
    return 2 * atan((MAG($x, $y) - $x) / $y);
}

# Gamma correct `VALUE` with power 2.2
%define GAMMA(VALUE) antiln(ln(VALUE)/2.2)

# Clamp `VALUE` above zero. (Returns 0 for `VALUE` < 0)
%define POSITIVE_CLAMP(VALUE) (((VALUE)>0)*(VALUE))

# Clamp `VALUE` below zero. (Returns 0 for `VALUE` > 0)
%define NEGATIVE_CLAMP(VALUE) (((VALUE)<0)*(VALUE))

# Clamp `VALUE` between `MIN` and `MAX`.
# (Returns `MIN` for `VALUE` < `MIN`, `MAX` for `VALUE` > `MAX`)
%define CLAMP(VALUE,MIN,MAX) (((VALUE)>(MIN))*((MAX)+((VALUE)-(MAX))*((VALUE)<(MAX))))

# Return the `N`th bit of `V`'s binary representation.
%define BIT(N,V) (((V) // antiln((N) * ln 2) % 2))

# Linearly interpolate between `A` and `B` by `T`.
%define LERP(A,B,T) ((A)+((B)-(A))*(T))

# Work out the ratio of `VAL` from `A` to `B`.
%define INVLERP(VAL,A,B) ((VAL) - (A)) / ((B) - (A))

# Re-maps a `V` from the range `A` to `B` to the range `C` to `D`.
%define MAP(A,B,C,D,V) (((V)-(B))*((D)-(C))/((A)-(B))+(C))

# Convert degrees to radians.
%define RAD(DEG) ((DEG) * 0.017453292519943295)

# Convert radians to degrees.
%define DEG(RAD) ((RAD) * 57.29577951308232)
