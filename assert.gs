%if ASSERT_USE_STRCMP
proc assert result, expected, message = "" {
    if not strcmp($result, $expected) {
        if $message == "" {
            error "assertion failed: expected " & $expected & ", got " & $result;
        } else {
            error $message & ": expected " & $expected & ", got " & $result;
        }
    }    
}
%endif

%if not ASSERT_USE_STRCMP
proc assert result, expected, message = "" {
    if $result != $expected {
        if $message == "" {
            error "assertion failed: expected " & $expected & ", got " & $result;
        } else {
            error $message & ": expected " & $expected & ", got " & $result;
        }
    }    
}
%endif

# assert true
proc assert_t condition, message {
    if not $condition {
        error $message;
    }
}
