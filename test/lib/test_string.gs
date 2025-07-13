proc test_string {
    if not strcmp("Hello, World!", "Hello, World!") == true {
        error "strcmp(\"Hello, World!\", \"Hello, World!\")";
    }
    if not strcmp("hello, world!", "Hello, World!") == false {
        error "strcmp(\"hello, world!\", \"Hello, World!\")";
    }

    if not startswith("Hello, World!", "Hello") {
        error "startswith(\"Hello, World!\", \"Hello\")";
    }
    if not startswith_from(8, "Hello, World!", "World!") {
        error "startswith(\"Hello, World!\", \"Hello\")";
    }
    if not endswith("Hello, World!", "World!") {
        error "endswith(\"Hello, World!\", \"World!\")";
    }
}
