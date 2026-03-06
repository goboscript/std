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


def resolve_includes(
    input: pathlib.Path,
    libdir: pathlib.Path,
    prefix_map: dict[str, str] | None = None,
) -> None:
    prefix_map = prefix_map or {}
    parent_dir = input.parent
    lines = input.read_text().splitlines()
    result = []
    for line in lines:
        if line.startswith("%include "):
            include_path_str = line[len("%include ") :].strip()

            # Apply prefix remapping before any other resolution.
            for from_prefix, to_prefix in prefix_map.items():
                if include_path_str.startswith(from_prefix):
                    include_path_str = to_prefix + include_path_str[len(from_prefix) :]
                    break

            if include_path_str.startswith("std/"):
                result.append(f"%include {include_path_str}")
                continue

            resolved = parent_dir.joinpath(include_path_str).resolve()
            if not resolved.exists():
                result.append(f"%include {include_path_str}")
                continue

            file_hash = hashlib.md5(str(resolved).encode()).hexdigest()
            dest = libdir.joinpath(f"{file_hash}.gs")
            if not dest.exists():
                shutil.copy2(resolved, dest)
            result.append(f"%include lib/{file_hash}.gs")
        else:
            result.append(line)
    result.append("")
    libdir.joinpath("test.gs").write_text("\n".join(result))


def parse_prefix_map(pairs: list[str]) -> dict[str, str]:
    """Parse a list of 'from=to' strings into a prefix mapping dict."""
    mapping: dict[str, str] = {}
    for pair in pairs:
        if "=" not in pair:
            sys.stderr.write(f"invalid --map entry (expected 'from=to'): {pair!r}\n")
            sys.exit(1)
        from_prefix, _, to_prefix = pair.partition("=")
        mapping[from_prefix] = to_prefix
    return mapping


argparser = argparse.ArgumentParser()
argparser.add_argument("input", type=pathlib.Path)
argparser.add_argument(
    "--map",
    metavar="FROM=TO",
    action="append",
    default=[],
    dest="prefix_map",
    help=(
        "Remap an import prefix before resolution. "
        "May be specified multiple times. "
        "Example: --map vendor/=../../third_party/"
    ),
)
args = argparser.parse_args()
input: pathlib.Path = args.input
if input.suffixes != [".test", ".gs"]:
    sys.stderr.write("input must be a `.test.gs` file\n")
    sys.exit(1)

prefix_map = parse_prefix_map(args.prefix_map)
prefix_map["std/"] = "../"

with tempfile.TemporaryDirectory() as tmpdir:
    tmpdir = pathlib.Path(tmpdir)
    tmpdir.joinpath("blank.svg").write_text(BLANK_SVG)
    tmpdir.joinpath("stage.gs").write_text(STAGE_GS)
    libdir = tmpdir.joinpath("lib")
    libdir.mkdir()
    resolve_includes(input, libdir, prefix_map)
    tmpdir.joinpath("main.gs").write_text(MAIN_GS)
    subprocess.run(shlex.split("goboscript build"), cwd=tmpdir).check_returncode()
    subprocess.run(shlex.split("tw load"), cwd=tmpdir).check_returncode()
    subprocess.run(shlex.split("tw start --listen")).check_returncode()
