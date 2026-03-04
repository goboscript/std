import argparse
import hashlib
import pathlib
import shlex
import shutil
import subprocess
import sys
import tempfile

BLANK_SVG = '<svg xmlns="http://www.w3.org/2000/svg"/>\n'
STAGE_GS = 'costumes "blank.svg";\n'
MAIN_GS = """\
costumes "blank.svg" as "@ascii/";

%include lib/test.gs

func __testing_eq(a, b) {
    if length($a) != length($b) {
        return false;
    }
    local i = 1;
    repeat length($a) {
        switch_costume $a;
        local c = costume_number();
        switch_costume $b;
        if c != costume_number() {
            return false;
        }
        i++;
    }
    return true;
}

proc expect expr, value, to_be {
    if not __testing_eq($value+"", $to_be+"") {
        error "expected `" & $expr & "` to be `" & $to_be & "` but got `" & $value & "`";
    }
}

proc expect_true expr, value {
    if not $value {
        error "expected `" & $expr & "` to be true but got `" & $value & "`";
    }
}

proc expect_false expr, value {
    if $value {
        error "expected `" & $expr & "` to be false but got `" & $value & "`";
    }
}

func _(value) {
    return $value;
}

onflag {
    test;
}
"""


def resolve_includes(input: pathlib.Path, libdir: pathlib.Path) -> None:
    parent_dir = input.parent
    lines = input.read_text().splitlines()
    result = []
    for line in lines:
        if line.startswith("%include "):
            include_path_str = line[len("%include ") :].strip()
            if include_path_str.startswith("std/"):
                result.append(line)
                continue
            resolved = parent_dir.joinpath(include_path_str).resolve()
            if not resolved.exists():
                result.append(line)
                continue
            file_hash = hashlib.md5(str(resolved).encode()).hexdigest()
            dest = libdir.joinpath(f"{file_hash}.gs")
            if not dest.exists():
                shutil.copy2(resolved, dest)
            new_line = f"%include lib/{file_hash}.gs"
            result.append(new_line)
        else:
            result.append(line)
    result.append("")
    libdir.joinpath("test.gs").write_text("\n".join(result))


argparser = argparse.ArgumentParser()
argparser.add_argument("input", type=pathlib.Path)
args = argparser.parse_args()
input: pathlib.Path = args.input
if input.suffixes != [".test", ".gs"]:
    sys.stderr.write("input must be a `.test.gs` file\n")
    sys.exit(1)


with tempfile.TemporaryDirectory() as tmpdir:
    tmpdir = pathlib.Path(tmpdir)
    tmpdir.joinpath("blank.svg").write_text(BLANK_SVG)
    tmpdir.joinpath("stage.gs").write_text(STAGE_GS)
    libdir = tmpdir.joinpath("lib")
    libdir.mkdir()
    resolve_includes(input, libdir)
    tmpdir.joinpath("main.gs").write_text(MAIN_GS)
    subprocess.run(shlex.split("goboscript build"), cwd=tmpdir).check_returncode()
    subprocess.run(shlex.split("tw load"), cwd=tmpdir).check_returncode()
    subprocess.run(shlex.split("tw start --listen")).check_returncode()
