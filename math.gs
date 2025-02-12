# Return the minimum of `A` and `B`.
%define MIN(A,B) ((A) - ((A) - (B)) * ((A) > (B)))

# Return the maximum of `A` and `B`.
%define MAX(A,B) ((A) + ((B) - (A)) * ((A) < (B)))

################################################################

# Combine RGB values into a single value for use with the `set_pen_color` block.
%define RGB(R,G,B) (((R) * 65536) + ((G) * 256) + (B))

# Combine RGBA values into a single value for use with the `set_pen_color` block.
%define RGBA(R,G,B,A) (((R) * 65536) + ((G) * 256) + (B) + ((A) * 16777216))

################################################################

# Parse a hexadecimal value.
%define HEX(VALUE) (("0x"&(VALUE))+0)

# Parse an octal value.
%define OCT(VALUE) (("0o"&(VALUE))+0)

# Parse a binary value.
%define BIN(VALUE) (("0b"&(VALUE))+0)

################################################################

# Return `BASE` raised to the power of `EXP`.
%define POW(BASE,EXP) antiln(ln(BASE)*(EXP))

# Return nth root of x
%define NROOT(n,x) antiln(ln(x) / n)

# Return `log base b of x`
%define LOGB(b,x) ln(x) / ln(b)

# Power function that always works so long as it's not a complex result (doesn't break with negative base)
func safepow(x, y) {
    return (POW(abs($x), $y)) * (2 * (not($x < 0 and $y % 2)) - 1);
}

################################################################

# Return the gamma function of `VALUE`.
%define GAMMA(VALUE) antiln(ln(VALUE)/2.2)

################################################################

# Clamp `VALUE` above zero. (Returns 0 for `VALUE` < 0)
%define POSITIVE_CLAMP(VALUE) (((VALUE)>0)*(VALUE))

# Clamp `VALUE` below zero. (Returns 0 for `VALUE` > 0)
%define NEGATIVE_CLAMP(VALUE) (((VALUE)<0)*(VALUE))

# Clamp `VALUE` between `MIN` and `MAX`.
# (Returns `MIN` for `VALUE` < `MIN`, `MAX` for `VALUE` > `MAX`)
%define CLAMP(VALUE,MIN,MAX) (((VALUE)>(MIN))*((MAX)+((VALUE)-(MAX))*((VALUE)<(MAX))))

################################################################

# Return the `N`th bit of `V`'s binary representation.
%define BIT(N, V) (((V) // antiln((N) * ln 2) % 2)

################################################################

# Return the distance between the points `(X1,Y1)` and `(X2,Y2)`.
%define DIST(X1,Y1,X2,Y2) sqrt(((X2)-(X1))*((X2)-(X1))+((Y2)-(Y1))*((Y2)-(Y1)))

# Return the direction (of a sprite) from a position  `(CX, CY)` to `(X, Y)`
%define DIR(X,Y,CX,CY) atan (((X)-(CX)) / ((Y)-(CY))) + 180 * ((CY) > (Y))

################################################################

%define ACOSH(X) ln((X)+sqrt((X)*(X)-1))
%define ASINH(X) ln((X)+sqrt((X)*(X)+1))
%define ATANH(X) ln((1+(X))/(1-(X)))/2
%define COSH(X) ((antiln(X)+antiln(-(X)))/2)
%define SINH(X) ((antiln(X)-antiln(-(X)))/2)
%define TANH(X) ((antiln(X)-antiln(-(X)))/(antiln(X)+antiln(-(X))))

# Atan2 value of y, then x. Adapted from meunspeakable
# You may want to check edge cases at angles of 90 degrees (0, 90, 180, 270)
%define ATAN2(Y,X) (-2 * (Y < 0) + 1) * acos(X / sqrt(X * X + Y * Y)) / 57.2957795131
################################################################

# Return SIGN of V. If V < 0, return -1, elif V == 0, return 0, else return 1
# 'Undefined' behaviour when used with non-numbers or booleans
%define SIGN(V) (V > 0) - (V[1] == "-")

################################################################

# Linear interpolation from a to b, with a ratio of t
%define LERP(A,B,T) (A) + ((B) - (A)) * (T)

# Work out the ratio of val from a to b
%define INVLERP(VAL,A,B) ((VAL) - (A)) / ((B) - (A))

################################################################

%define PI 3.141592653589793
%define E 2.718281828459045
