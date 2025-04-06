# pyright: reportAny=false
# pyright: reportUnusedCallResult=false

import argparse
import re
import xml.etree.ElementTree
from dataclasses import dataclass
from pathlib import Path
from typing import cast

ns = {
    "svg": "http://www.w3.org/2000/svg",
    "inkscape": "http://www.inkscape.org/namespaces/inkscape",
    "dc": "http://purl.org/dc/elements/1.1/",
    "cc": "http://creativecommons.org/ns#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
}

CHARSET = "".join(map(chr, range(ord(" "), ord("~") + 1)))

argparser = argparse.ArgumentParser()
argparser.add_argument("font", type=Path, help="Font .svg file to convert")
argparser.add_argument("output", type=Path, help="Output .txt file")


@dataclass
class Args:
    font: Path
    output: Path


args = Args(**argparser.parse_args().__dict__)
name = args.font.stem
root = xml.etree.ElementTree.parse(args.font).getroot()
width = int(cast(str, root.get("width")))
height = int(cast(str, root.get("height")))
creator = root.find(".//dc:creator/dc:Agent/dc:title", ns) or ""
rights = root.find(".//dc:rights/dc:Agent/dc:title", ns) or ""
chars: dict[str, list[str]] = {}


def modulate(d: list[str]) -> list[str]:
    cmd: str = ""
    i = 0
    while i < len(d):
        if d[i].isalpha():
            cmd = d[i]
            i += 1
        if cmd.upper() in "ML":
            if cmd.isupper():
                d[i] = str(int(float(d[i])) % (width * 2))
            i += 2
        elif cmd.upper() == "H":
            if cmd.isupper():
                d[i] = str(int(float(d[i])) % (width * 2))
            i += 1
        elif cmd.upper() == "V":
            i += 1
    return d


for path in root.findall(".//svg:path", ns):
    sd = cast(str, path.get("d"))
    label = cast(str, path.get("{%s}label" % ns["inkscape"]))
    if len(label) == 1:
        chars[label] = modulate(re.split(r"[,\s]+", sd))

with args.output.open("w") as f:

    def print(*objs: object, sep: str = " ", end: str = "\n") -> None:
        f.write(sep.join(map(str, objs)) + end)

    print(name)
    print(creator)
    print(rights)
    print(width)
    print(height)

    i = 0
    for ch in CHARSET:
        d = chars.get(ch, [])
        d.append("#")
        print(6 + len(CHARSET) + i)
        i += len(d)
    for ch in CHARSET:
        d: list[str] = chars.get(ch, ["#"])
        for x in d:
            if str(x).islower() and x not in "Zz":
                x = "d" + x
            print(x)
