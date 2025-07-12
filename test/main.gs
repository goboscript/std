%define ASSERT_USE_STRCMP
%include ../assert
%include ../math
%include ../string
%include lib/test_math
%include lib/test_string

costumes "blank.svg" as "@ascii/";

func blackbox(value)  {
    return $value;
}

onflag {
    test_math;
    test_string;
}
