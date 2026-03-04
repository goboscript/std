%define LIST_SORT(LIST)                                                                \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local i = start + 1;                                                               \
    until i > end {                                                                    \
        local key = LIST[i];                                                           \
        local j = i - 1;                                                               \
        until j < start or LIST[j] <= key {                                            \
            LIST[j + 1] = LIST[j];                                                     \
            j--;                                                                       \
        }                                                                              \
        LIST[j + 1] = key;                                                             \
        i++;                                                                           \
    }

%define LIST_SORT(LIST, TYPE, KEY)                                                     \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local i = start + 1;                                                               \
    until i > end {                                                                    \
        local TYPE key = LIST[i];                                                      \
        local j = i - 1;                                                               \
        until j < start or LIST[j].KEY <= key.KEY {                                    \
            LIST[j + 1] = LIST[j];                                                     \
            j--;                                                                       \
        }                                                                              \
        LIST[j + 1] = key;                                                             \
        i++;                                                                           \
    }

%define LIST_JOIN(LIST)                                                                \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = "";                                                                    \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        if i != start {                                                                \
            out &= $sep;                                                               \
        }                                                                              \
        out &= LIST[i];                                                                \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_JOIN(LIST, KEY)                                                           \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = "";                                                                    \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        if i != start {                                                                \
            out &= $sep;                                                               \
        }                                                                              \
        out &= LIST[i].KEY;                                                            \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_SUM(LIST)                                                                 \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = 0;                                                                     \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        out += LIST[i];                                                                \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_SUM(LIST, KEY)                                                            \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = 0;                                                                     \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        out += LIST[i].KEY;                                                            \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_MIN(LIST)                                                                 \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = 1/0;                                                                   \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        if LIST[i] < out {                                                             \
            out = LIST[i];                                                             \
        }                                                                              \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_MIN(LIST, KEY)                                                            \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = 1/0;                                                                   \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        if LIST[i].KEY < out {                                                         \
            out = LIST[i].KEY;                                                         \
        }                                                                              \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_MAX(LIST)                                                                 \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = -1/0;                                                                  \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        if LIST[i] > out {                                                             \
            out = LIST[i];                                                             \
        }                                                                              \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_MAX(LIST, KEY)                                                            \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(LIST) + end + 1;                                                  \
    }                                                                                  \
    local out = -1/0;                                                                  \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        if LIST[i].KEY > out {                                                         \
            out = LIST[i].KEY;                                                         \
        }                                                                              \
        i++;                                                                           \
    }                                                                                  \
    return out;

%define LIST_REVERSE(LIST)                                                             \
    local lo = $start;                                                                 \
    local hi = $end;                                                                   \
    if lo < 0 {                                                                        \
        lo = length(LIST) + lo + 1;                                                    \
    }                                                                                  \
    if hi < 0 {                                                                        \
        hi = length(LIST) + hi + 1;                                                    \
    }                                                                                  \
    until lo >= hi {                                                                   \
        local tmp = LIST[lo];                                                          \
        LIST[lo] = LIST[hi];                                                           \
        LIST[hi] = tmp;                                                                \
        lo++;                                                                          \
        hi--;                                                                          \
    }

%define LIST_REVERSE(TYPE, LIST)                                                       \
    local lo = $start;                                                                 \
    local hi = $end;                                                                   \
    if lo < 0 {                                                                        \
        lo = length(LIST) + lo + 1;                                                    \
    }                                                                                  \
    if hi < 0 {                                                                        \
        hi = length(LIST) + hi + 1;                                                    \
    }                                                                                  \
    until lo >= hi {                                                                   \
        local TYPE tmp = LIST[lo];                                                     \
        LIST[lo] = LIST[hi];                                                           \
        LIST[hi] = tmp;                                                                \
        lo++;                                                                          \
        hi--;                                                                          \
    }

%define LIST_COPY(SRC, DST)                                                            \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(SRC) + start + 1;                                               \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(SRC) + end + 1;                                                   \
    }                                                                                  \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        add SRC[i] to DST;                                                             \
        i++;                                                                           \
    }

%define LIST_EXTEND(SRC, DST)                                                          \
    local i = 1;                                                                       \
    repeat length SRC {                                                                \
        add SRC[i] to DST;                                                             \
        i++;                                                                           \
    }

%define LIST_EXTEND(SRC, DST)                                                          \
    local start = $start;                                                              \
    local end = $end;                                                                  \
    if start < 0 {                                                                     \
        start = length(SRC) + start + 1;                                               \
    }                                                                                  \
    if end < 0 {                                                                       \
        end = length(SRC) + end + 1;                                                   \
    }                                                                                  \
    local i = start;                                                                   \
    repeat end - start + 1 {                                                           \
        add SRC[i] to DST;                                                             \
        i++;                                                                           \
    }

%define LIST_UNIQUE(LIST)                                                              \
    local start = $start;                                                              \
    local end_ = $end;                                                                 \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end_ < 0 {                                                                      \
        end_ = length(LIST) + end_ + 1;                                                \
    }                                                                                  \
    local i = start;                                                                   \
    until i > end_ {                                                                   \
        local j = i + 1;                                                               \
        until j > end_ {                                                               \
            if LIST[i] == LIST[j] {                                                    \
                delete LIST[j];                                                        \
                end_--;                                                                \
            } else {                                                                   \
                j++;                                                                   \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }

%define LIST_UNIQUE(LIST, TYPE, KEY)                                                   \
    local start = $start;                                                              \
    local end_ = $end;                                                                 \
    if start < 0 {                                                                     \
        start = length(LIST) + start + 1;                                              \
    }                                                                                  \
    if end_ < 0 {                                                                      \
        end_ = length(LIST) + end_ + 1;                                                \
    }                                                                                  \
    local i = start;                                                                   \
    until i > end_ {                                                                   \
        local j = i + 1;                                                               \
        until j > end_ {                                                               \
            if LIST[i].KEY == LIST[j].KEY {                                            \
                delete LIST[j];                                                        \
                end_--;                                                                \
            } else {                                                                   \
                j++;                                                                   \
            }                                                                          \
        }                                                                              \
        i++;                                                                           \
    }
