%include ../list.gs

struct xy { x=0, y=0 }

list mylist = [];
list mylist2 = [];
list xy mypts = [];
list xy mypts2 = [];

proc unique_mylist start=1, end=-1 {
    LIST_UNIQUE(mylist)
}

proc unique_mypts start=1, end=-1 {
    LIST_UNIQUE(mypts, xy, x)
}

proc test_unique_basic {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 3 to mylist;
    add 3 to mylist;
    unique_mylist;
    expect "unique basic length", length(mylist), to_be: "3";
    expect "unique basic [1]",    mylist[1],      to_be: "1";
    expect "unique basic [2]",    mylist[2],      to_be: "2";
    expect "unique basic [3]",    mylist[3],      to_be: "3";
}

proc test_unique_no_duplicates {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    unique_mylist;
    expect "unique no dupes length", length(mylist), to_be: "3";
    expect "unique no dupes [1]",    mylist[1],      to_be: "1";
    expect "unique no dupes [2]",    mylist[2],      to_be: "2";
    expect "unique no dupes [3]",    mylist[3],      to_be: "3";
}

proc test_unique_all_duplicates {
    delete mylist;
    add 5 to mylist;
    add 5 to mylist;
    add 5 to mylist;
    unique_mylist;
    expect "unique all dupes length", length(mylist), to_be: "1";
    expect "unique all dupes [1]",    mylist[1],      to_be: "5";
}

proc test_unique_partial {
    delete mylist;
    add 9 to mylist;
    add 2 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 9 to mylist;
    unique_mylist start:2, end:4;
    expect "unique partial [1] untouched", mylist[1], to_be: "9";
    expect "unique partial length",        length(mylist), to_be: "4";
    expect "unique partial [2]",           mylist[2], to_be: "2";
    expect "unique partial [3]",           mylist[3], to_be: "3";
    expect "unique partial [4] untouched", mylist[4], to_be: "9";
}

proc test_unique_negative_indices {
    delete mylist;
    add 9 to mylist;
    add 2 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 9 to mylist;
    unique_mylist start:2, end:-2;
    expect "unique neg [1] untouched", mylist[1], to_be: "9";
    expect "unique neg length",        length(mylist), to_be: "4";
    expect "unique neg [2]",           mylist[2], to_be: "2";
    expect "unique neg [3]",           mylist[3], to_be: "3";
    expect "unique neg [4] untouched", mylist[4], to_be: "9";
}

proc test_unique_key {
    delete mypts;
    local xy p = xy{};
    p.x = 1; p.y = 10; add p to mypts;
    p.x = 2; p.y = 20; add p to mypts;
    p.x = 2; p.y = 99; add p to mypts;
    p.x = 3; p.y = 30; add p to mypts;
    unique_mypts;
    expect "unique key length",   length(mypts), to_be: "3";
    expect "unique key [1].x",    mypts[1].x,    to_be: "1";
    expect "unique key [2].x",    mypts[2].x,    to_be: "2";
    expect "unique key [2].y kept first", mypts[2].y, to_be: "20";
    expect "unique key [3].x",    mypts[3].x,    to_be: "3";
}

proc sort_mylist start=1, end=-1 {
    LIST_SORT(mylist)
}

proc sort_mypts start=1, end=-1 {
    LIST_SORT(mypts, xy, x)
}

proc test_sort_basic {
    delete mylist;
    add 3 to mylist;
    add 1 to mylist;
    add 4 to mylist;
    add 2 to mylist;
    sort_mylist;
    expect "sort basic [1]", mylist[1], to_be: "1";
    expect "sort basic [2]", mylist[2], to_be: "2";
    expect "sort basic [3]", mylist[3], to_be: "3";
    expect "sort basic [4]", mylist[4], to_be: "4";
}

proc test_sort_partial {
    delete mylist;
    add 9 to mylist;
    add 3 to mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 9 to mylist;
    sort_mylist start:2, end:4;
    expect "sort partial [1] untouched", mylist[1], to_be: "9";
    expect "sort partial [2]",           mylist[2], to_be: "1";
    expect "sort partial [3]",           mylist[3], to_be: "2";
    expect "sort partial [4]",           mylist[4], to_be: "3";
    expect "sort partial [5] untouched", mylist[5], to_be: "9";
}

proc test_sort_negative_indices {
    delete mylist;
    add 9 to mylist;
    add 4 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 9 to mylist;
    sort_mylist start:2, end:-2;
    expect "sort neg [1] untouched", mylist[1], to_be: "9";
    expect "sort neg [2]",           mylist[2], to_be: "2";
    expect "sort neg [3]",           mylist[3], to_be: "3";
    expect "sort neg [4]",           mylist[4], to_be: "4";
    expect "sort neg [5] untouched", mylist[5], to_be: "9";
}

proc test_sort_key {
    delete mypts;
    local xy p = xy{};
    p.x = 5; p.y = 0; add p to mypts;
    p.x = 1; p.y = 0; add p to mypts;
    p.x = 3; p.y = 0; add p to mypts;
    sort_mypts;
    expect "sort key [1].x", mypts[1].x, to_be: "1";
    expect "sort key [2].x", mypts[2].x, to_be: "3";
    expect "sort key [3].x", mypts[3].x, to_be: "5";
}

proc test_sort_already_sorted {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    sort_mylist;
    expect "sort already sorted [1]", mylist[1], to_be: "1";
    expect "sort already sorted [2]", mylist[2], to_be: "2";
    expect "sort already sorted [3]", mylist[3], to_be: "3";
}

proc test_sort_single_element {
    delete mylist;
    add 42 to mylist;
    sort_mylist;
    expect "sort single element", mylist[1], to_be: "42";
}

# ── LIST_JOIN ────────────────────────────────────────────────────────────────

func join_mylist(start=1, end=-1, sep=",") {
    LIST_JOIN(mylist)
}

func join_mypts(start=1, end=-1, sep=",") {
    LIST_JOIN(mypts, x)
}

proc test_join_basic {
    delete mylist;
    add "a" to mylist;
    add "b" to mylist;
    add "c" to mylist;
    expect "join basic", join_mylist(), to_be: "a,b,c";
}

proc test_join_sep {
    delete mylist;
    add "x" to mylist;
    add "y" to mylist;
    add "z" to mylist;
    expect "join sep", join_mylist(sep:" | "), to_be: "x | y | z";
}

proc test_join_partial {
    delete mylist;
    add "a" to mylist;
    add "b" to mylist;
    add "c" to mylist;
    add "d" to mylist;
    expect "join partial", join_mylist(start:2, end:3), to_be: "b,c";
}

proc test_join_negative_indices {
    delete mylist;
    add "a" to mylist;
    add "b" to mylist;
    add "c" to mylist;
    add "d" to mylist;
    expect "join neg indices", join_mylist(start:2, end:-2), to_be: "b,c";
}

proc test_join_single {
    delete mylist;
    add "only" to mylist;
    expect "join single", join_mylist(), to_be: "only";
}

proc test_join_key {
    delete mypts;
    local xy p = xy{};
    p.x = 1; p.y = 0; add p to mypts;
    p.x = 2; p.y = 0; add p to mypts;
    p.x = 3; p.y = 0; add p to mypts;
    expect "join key", join_mypts(), to_be: "1,2,3";
}

# ── LIST_SUM ─────────────────────────────────────────────────────────────────

func sum_mylist(start=1, end=-1) {
    LIST_SUM(mylist)
}

func sum_mypts(start=1, end=-1) {
    LIST_SUM(mypts, x)
}

proc test_sum_basic {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 4 to mylist;
    expect "sum basic", sum_mylist(), to_be: "10";
}

proc test_sum_partial {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 4 to mylist;
    expect "sum partial", sum_mylist(start:2, end:3), to_be: "5";
}

proc test_sum_negative_indices {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 4 to mylist;
    expect "sum neg indices", sum_mylist(start:2, end:-2), to_be: "5";
}

proc test_sum_key {
    delete mypts;
    local xy p = xy{};
    p.x = 10; p.y = 0; add p to mypts;
    p.x = 20; p.y = 0; add p to mypts;
    p.x = 30; p.y = 0; add p to mypts;
    expect "sum key", sum_mypts(), to_be: "60";
}

# ── LIST_MIN ─────────────────────────────────────────────────────────────────

func min_mylist(start=1, end=-1) {
    LIST_MIN(mylist)
}

func min_mypts(start=1, end=-1) {
    LIST_MIN(mypts, x)
}

proc test_min_basic {
    delete mylist;
    add 3 to mylist;
    add 1 to mylist;
    add 4 to mylist;
    add 2 to mylist;
    expect "min basic", min_mylist(), to_be: "1";
}

proc test_min_partial {
    delete mylist;
    add 1 to mylist;
    add 5 to mylist;
    add 3 to mylist;
    add 1 to mylist;
    expect "min partial", min_mylist(start:2, end:3), to_be: "3";
}

proc test_min_negative_indices {
    delete mylist;
    add 1 to mylist;
    add 5 to mylist;
    add 3 to mylist;
    add 1 to mylist;
    expect "min neg indices", min_mylist(start:2, end:-2), to_be: "3";
}

proc test_min_key {
    delete mypts;
    local xy p = xy{};
    p.x = 7; p.y = 0; add p to mypts;
    p.x = 2; p.y = 0; add p to mypts;
    p.x = 5; p.y = 0; add p to mypts;
    expect "min key", min_mypts(), to_be: "2";
}

# ── LIST_MAX ─────────────────────────────────────────────────────────────────

func max_mylist(start=1, end=-1) {
    LIST_MAX(mylist)
}

func max_mypts(start=1, end=-1) {
    LIST_MAX(mypts, x)
}

proc test_max_basic {
    delete mylist;
    add 3 to mylist;
    add 1 to mylist;
    add 4 to mylist;
    add 2 to mylist;
    expect "max basic", max_mylist(), to_be: "4";
}

proc test_max_partial {
    delete mylist;
    add 9 to mylist;
    add 2 to mylist;
    add 5 to mylist;
    add 9 to mylist;
    expect "max partial", max_mylist(start:2, end:3), to_be: "5";
}

proc test_max_negative_indices {
    delete mylist;
    add 9 to mylist;
    add 2 to mylist;
    add 5 to mylist;
    add 9 to mylist;
    expect "max neg indices", max_mylist(start:2, end:-2), to_be: "5";
}

proc test_max_key {
    delete mypts;
    local xy p = xy{};
    p.x = 7; p.y = 0; add p to mypts;
    p.x = 2; p.y = 0; add p to mypts;
    p.x = 5; p.y = 0; add p to mypts;
    expect "max key", max_mypts(), to_be: "7";
}

# ── LIST_REVERSE ─────────────────────────────────────────────────────────────

proc reverse_mylist start=1, end=-1 {
    LIST_REVERSE(mylist)
}

proc reverse_mypts start=1, end=-1 {
    LIST_REVERSE(xy, mypts)
}

proc test_reverse_basic {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 4 to mylist;
    reverse_mylist;
    expect "reverse basic [1]", mylist[1], to_be: "4";
    expect "reverse basic [2]", mylist[2], to_be: "3";
    expect "reverse basic [3]", mylist[3], to_be: "2";
    expect "reverse basic [4]", mylist[4], to_be: "1";
}

proc test_reverse_partial {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 4 to mylist;
    add 5 to mylist;
    reverse_mylist start:2, end:4;
    expect "reverse partial [1] untouched", mylist[1], to_be: "1";
    expect "reverse partial [2]",           mylist[2], to_be: "4";
    expect "reverse partial [3]",           mylist[3], to_be: "3";
    expect "reverse partial [4]",           mylist[4], to_be: "2";
    expect "reverse partial [5] untouched", mylist[5], to_be: "5";
}

proc test_reverse_negative_indices {
    delete mylist;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    add 4 to mylist;
    add 5 to mylist;
    reverse_mylist start:2, end:-2;
    expect "reverse neg [1] untouched", mylist[1], to_be: "1";
    expect "reverse neg [2]",           mylist[2], to_be: "4";
    expect "reverse neg [3]",           mylist[3], to_be: "3";
    expect "reverse neg [4]",           mylist[4], to_be: "2";
    expect "reverse neg [5] untouched", mylist[5], to_be: "5";
}

proc test_reverse_single {
    delete mylist;
    add 42 to mylist;
    reverse_mylist;
    expect "reverse single", mylist[1], to_be: "42";
}

proc test_reverse_typed {
    delete mypts;
    local xy p = xy{};
    p.x = 1; p.y = 10; add p to mypts;
    p.x = 2; p.y = 20; add p to mypts;
    p.x = 3; p.y = 30; add p to mypts;
    reverse_mypts;
    expect "reverse typed [1].x", mypts[1].x, to_be: "3";
    expect "reverse typed [2].x", mypts[2].x, to_be: "2";
    expect "reverse typed [3].x", mypts[3].x, to_be: "1";
    expect "reverse typed [1].y", mypts[1].y, to_be: "30";
}

# ── LIST_COPY ────────────────────────────────────────────────────────────────

proc copy_mylist_to_mylist2 start=1, end=-1 {
    LIST_COPY(mylist, mylist2)
}

proc test_copy_basic {
    delete mylist;
    delete mylist2;
    add 10 to mylist;
    add 20 to mylist;
    add 30 to mylist;
    copy_mylist_to_mylist2;
    expect "copy basic length", length(mylist2), to_be: "3";
    expect "copy basic [1]",    mylist2[1],      to_be: "10";
    expect "copy basic [2]",    mylist2[2],      to_be: "20";
    expect "copy basic [3]",    mylist2[3],      to_be: "30";
}

proc test_copy_partial {
    delete mylist;
    delete mylist2;
    add 10 to mylist;
    add 20 to mylist;
    add 30 to mylist;
    add 40 to mylist;
    copy_mylist_to_mylist2 start:2, end:3;
    expect "copy partial length", length(mylist2), to_be: "2";
    expect "copy partial [1]",    mylist2[1],      to_be: "20";
    expect "copy partial [2]",    mylist2[2],      to_be: "30";
}

proc test_copy_negative_indices {
    delete mylist;
    delete mylist2;
    add 10 to mylist;
    add 20 to mylist;
    add 30 to mylist;
    add 40 to mylist;
    copy_mylist_to_mylist2 start:2, end:-2;
    expect "copy neg length", length(mylist2), to_be: "2";
    expect "copy neg [1]",    mylist2[1],      to_be: "20";
    expect "copy neg [2]",    mylist2[2],      to_be: "30";
}

proc test_copy_appends {
    delete mylist;
    delete mylist2;
    add 1 to mylist;
    add 2 to mylist;
    add 99 to mylist2;
    copy_mylist_to_mylist2;
    expect "copy appends length", length(mylist2), to_be: "3";
    expect "copy appends [1]",    mylist2[1],      to_be: "99";
    expect "copy appends [2]",    mylist2[2],      to_be: "1";
    expect "copy appends [3]",    mylist2[3],      to_be: "2";
}

# ── LIST_EXTEND ──────────────────────────────────────────────────────────────

proc extend_mylist_to_mylist2 start=1, end=-1 {
    LIST_EXTEND(mylist, mylist2)
}

proc test_extend_basic {
    delete mylist;
    delete mylist2;
    add 1 to mylist;
    add 2 to mylist;
    add 3 to mylist;
    extend_mylist_to_mylist2;
    expect "extend basic length", length(mylist2), to_be: "3";
    expect "extend basic [1]",    mylist2[1],      to_be: "1";
    expect "extend basic [2]",    mylist2[2],      to_be: "2";
    expect "extend basic [3]",    mylist2[3],      to_be: "3";
}

proc test_extend_partial {
    delete mylist;
    delete mylist2;
    add 10 to mylist;
    add 20 to mylist;
    add 30 to mylist;
    add 40 to mylist;
    extend_mylist_to_mylist2 start:2, end:3;
    expect "extend partial length", length(mylist2), to_be: "2";
    expect "extend partial [1]",    mylist2[1],      to_be: "20";
    expect "extend partial [2]",    mylist2[2],      to_be: "30";
}

proc test_extend_negative_indices {
    delete mylist;
    delete mylist2;
    add 10 to mylist;
    add 20 to mylist;
    add 30 to mylist;
    add 40 to mylist;
    extend_mylist_to_mylist2 start:2, end:-2;
    expect "extend neg length", length(mylist2), to_be: "2";
    expect "extend neg [1]",    mylist2[1],      to_be: "20";
    expect "extend neg [2]",    mylist2[2],      to_be: "30";
}

proc test_extend_appends {
    delete mylist;
    delete mylist2;
    add 7 to mylist;
    add 8 to mylist;
    add 99 to mylist2;
    extend_mylist_to_mylist2;
    expect "extend appends length", length(mylist2), to_be: "3";
    expect "extend appends [1]",    mylist2[1],      to_be: "99";
    expect "extend appends [2]",    mylist2[2],      to_be: "7";
    expect "extend appends [3]",    mylist2[3],      to_be: "8";
}

# ── RUN ALL ──────────────────────────────────────────────────────────────────

proc test {
    test_sort_basic;
    test_sort_partial;
    test_sort_negative_indices;
    test_sort_key;
    test_sort_already_sorted;
    test_sort_single_element;

    test_join_basic;
    test_join_sep;
    test_join_partial;
    test_join_negative_indices;
    test_join_single;
    test_join_key;

    test_sum_basic;
    test_sum_partial;
    test_sum_negative_indices;
    test_sum_key;

    test_min_basic;
    test_min_partial;
    test_min_negative_indices;
    test_min_key;

    test_max_basic;
    test_max_partial;
    test_max_negative_indices;
    test_max_key;

    test_reverse_basic;
    test_reverse_partial;
    test_reverse_negative_indices;
    test_reverse_single;
    test_reverse_typed;

    test_copy_basic;
    test_copy_partial;
    test_copy_negative_indices;
    test_copy_appends;

    test_extend_basic;
    test_extend_partial;
    test_extend_negative_indices;
    test_extend_appends;

    test_unique_basic;
    test_unique_no_duplicates;
    test_unique_all_duplicates;
    test_unique_partial;
    test_unique_negative_indices;
    test_unique_key;
}
