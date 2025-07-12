proc test_string {
    if not strcmp("Hello, World!", "Hello, World!") == true {
        error "strcmp(\"Hello, World!\", \"Hello, World!\")";
    }
    if not strcmp("hello, world!", "Hello, World!") == false {
        error "strcmp(\"hello, world!\", \"Hello, World!\")";
    }
}
