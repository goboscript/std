%define PI 3.141592653589793
%define E 2.718281828459045
%define SQRT2 1.4142135623730951
%define MIN(A, B) (((A) + (B) - abs((A) - (B))) / 2)
%define MAX(A, B) (((A) + (B) + abs((A) - (B))) / 2)
%define CLAMP(VAL, MIN, MAX) ((MAX) - (((MAX) - ((((VAL) - (MIN)) * ((VAL) > (MIN))) + (MIN))) * ((VAL) < (MAX))))
%define HEX(VALUE) (("0x" & (VALUE)) + 0)
%define BIN(VALUE) (("0b" & (VALUE)) + 0)
%define OCT(VALUE) (("0o" & (VALUE)) + 0)
%define DIST(X1, Y1, X2, Y2) sqrt((((X2) - (X1)) * ((X2) - (X1))) + ((Y2) - (Y1)) * ((Y2) - (Y1)))
%define MAG(X, Y) sqrt((X) * (X) + (Y) * (Y))
%define POW(BASE, EXP) antiln(ln(BASE) * (EXP))
%define ROOT(BASE, N) antiln(ln(BASE) / (N))
%define LOG(VAL, BASE) (ln(VAL) / ln(BASE))
%define LERP(A, B, T) ((A) + ((B) - (A)) * (T))
%define SIGN(VAL) (((VAL) > 0) - ((VAL) < 0))
