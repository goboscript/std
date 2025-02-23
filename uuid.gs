%define UUID_RANDHEX "0123456789ABCDEF"[random(1, 16)]
%define UUID_RANDHEX2 UUID_RANDHEX & UUID_RANDHEX
%define UUID_RANDHEX3 UUID_RANDHEX2 & UUID_RANDHEX
%define UUID_RANDHEX4 UUID_RANDHEX2 & UUID_RANDHEX2
%define UUID_RANDHEX8 UUID_RANDHEX4 & UUID_RANDHEX4
%define UUID_RANDHEX12 UUID_RANDHEX8 & UUID_RANDHEX4
%define UUID_V4 UUID_RANDHEX8                                                          \
    & "-" & UUID_RANDHEX4                                                              \
    & "-4" & UUID_RANDHEX3                                                             \
    & "-" & "89AB"[random(1, 4)] & UUID_RANDHEX3                                       \
    & "-" & UUID_RANDHEX12
%define UUID_NIL "00000000-0000-0000-0000-000000000000"
%define UUID_MAX "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF"
