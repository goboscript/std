# Sort `LIST` in ascending order using the insertion sorting algorithm.
%define INSERTION_SORT(LIST)                                                           \
    local i = 2;                                                                       \
    until i > length(LIST) {                                                           \
        local isx = LIST[i];                                                           \
        local j = i;                                                                   \
        until j <= 1 or LIST[j - 1] <= isx {                                           \
            LIST[j] = LIST[j - 1];                                                     \
            j--;                                                                       \
        }                                                                              \
        LIST[j] = isx;                                                                 \
        i++;                                                                           \
    }

# Sort `LIST` of type `TYPE` in ascending order of the value of `FIELD` using the
# insertion sorting algorithm.
%define INSERTION_SORT_BY_FIELD(TYPE,LIST,FIELD)                                       \
    local i = 2;                                                                       \
    until i > length(LIST) {                                                           \
        local TYPE isfx = LIST[i];                                                     \
        local j = i;                                                                   \
        until j <= 1 or LIST[j - 1]FIELD <= isfx FIELD {                               \
            LIST[j] = LIST[j - 1];                                                     \
            j--;                                                                       \
        }                                                                              \
        LIST[j] = isfx;                                                                \
        i++;                                                                           \
    }

# Count the number of elements in `LIST` that satisfy `CMP`, and store the result in
# `STORE`. local `i` is the index of the current element.
%define COUNT(LIST,CMP,STORE)                                                          \
    local STORE = 0;                                                                   \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            STORE += 1;                                                                \
        }                                                                              \
        i++;                                                                           \
    }

# Sum the elements in `LIST` that satisfy `CMP`, and store the result in `STORE`.
# local `i` is the index of the current element.
%define SUM(LIST,CMP,STORE)                                                            \
    local STORE = 0;                                                                   \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            STORE += LIST[i];                                                          \
        }                                                                              \
        i++;                                                                           \
    }

# Find the largest element in `LIST` that satisfies `CMP`, and store the result in
# `STORE`. local `i` is the index of the current element.
%define FINDMAX(LIST,CMP,STORE)                                                        \
    local STORE = "-Infinity";                                                         \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            if LIST[i] > STORE {                                                       \
                STORE = LIST[i];                                                       \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }

# Find the smallest element in `LIST` that satisfies `CMP`, and store the result in
# `STORE`. local `i` is the index of the current element.
%define FINDMIN(LIST,CMP,STORE)                                                        \
    local STORE = "Infinity";                                                          \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            if LIST[i] < STORE {                                                       \
                STORE = LIST[i];                                                       \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }

# Reverse `LIST` in place.
%define REVERSE(LIST)                                                                  \
    local i = 1;                                                                       \
    local j = length(LIST);                                                            \
    repeat length(LIST) / 2 {                                                          \
        local x = LIST[i];                                                             \
        LIST[i] = LIST[j];                                                             \
        LIST[j] = x;                                                                   \
        i++;                                                                           \
        j--;                                                                           \
    }

# Copy `SRC` to `DEST`.
%define COPY(SRC,DEST)                                                                 \
    delete DEST;                                                                       \
    local i = 1;                                                                       \
    repeat length(SRC) {                                                               \
        add SRC[i] to DEST;                                                            \
        i++;                                                                           \
    }

# Extend `DEST` with the elements of `SRC`.
%define EXTEND(SRC,DEST)                                                               \
    local i = 1;                                                                       \
    repeat length(SRC) {                                                               \
        add SRC[i] to DEST;                                                            \
        i++;                                                                           \
    }

# Remove duplicate elements from `LIST`.
%define UNIQUE(LIST)                                                                   \
    local i = 1;                                                                       \
    until i > length(LIST) {                                                           \
        local j = i + 1;                                                               \
        until j > length(LIST) {                                                       \
            if LIST[i] == LIST[j] {                                                    \
                delete LIST[j];                                                        \
            } else {                                                                   \
                j++;                                                                   \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }

# Sum the field `FIELD` in `LIST` that satisfy `CMP`, and store the result in `STORE`.
%define SUM_BY_FIELD(LIST,FIELD,CMP,STORE)                                             \
    local STORE = 0;                                                                   \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            STORE += LIST[i]FIELD;                                                     \
        }                                                                              \
        i++;                                                                           \
    }

# TODO [BLOCKED BY]: https://github.com/aspizu/goboscript/issues/71
# Find the largest `FIELD` value in `LIST` of type `TYPE` that satisfies `CMP` and store
# the result in `STORE`.
%define FINDMAX_BY_FIELD(TYPE,LIST,FIELD,CMP,STORE)                                    \
    local TYPE STORE;                                                                  \
    STORE FIELD = "-Infinity";                                                         \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            if LIST[i]FIELD > STORE FIELD {                                            \
                STORE = LIST[i];                                                       \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }

# TODO [BLOCKED BY]: https://github.com/aspizu/goboscript/issues/71
# Find the smallest `FIELD` value in `LIST` of type `TYPE` that satisfies `CMP` and
# store the result in `STORE`.
%define FINDMIN_BY_FIELD(TYPE,LIST,FIELD,CMP,STORE)                                    \
    local TYPE STORE;                                                                  \
    STORE FIELD = "Infinity";                                                          \
    local i = 1;                                                                       \
    repeat length(LIST) {                                                              \
        if CMP {                                                                       \
            if LIST[i]FIELD < STORE FIELD {                                            \
                STORE = LIST[i];                                                       \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }

# Remove duplicate elements from `LIST` by field `FIELD`.
%define UNIQUE_BY_FIELD(LIST,FIELD)                                                    \ 
    local i = 1;                                                                       \
    until i > length(LIST) {                                                           \
        local j = i + 1;                                                               \
        until j > length(LIST) {                                                       \
            if LIST[i] FIELD == LIST[j] FIELD {                                        \
                delete LIST[j];                                                        \
            } else {                                                                   \
                j++;                                                                   \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }
