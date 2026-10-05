#!/usr/bin/env python3
"""Render the homepage sample using Parseh's document exporter.

    <parseh's python> examples/sources/build-homepage-exercise.py /path/to/Parseh

The exercise markup, word bank, grading, explanations and fonts come from
Parseh. Only the surrounding page chrome and margins are adapted for the
homepage's frame. The Parseh checkout is read, never written.
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def main(parseh):
    parseh = Path(parseh).resolve()
    for path in (parseh / "lib", parseh / "markdown" / "exlex", parseh / "markdown" / "app"):
        sys.path.insert(0, str(path))
    import webexport

    source = (HERE / "homepage-exercise.md").read_text(encoding="utf-8")
    _, data = webexport.document_html(
        "homepage-exercise", {"title": "English: fill in the blanks"}, source, lambda _: None)
    page = data.decode("utf-8")
    page = re.sub(r'<header class="xp-bar">.*?</header>', '', page, flags=re.S)
    page = re.sub(r'<footer class="xp-foot">.*?</footer>', '', page, flags=re.S)
    page = page.replace('>Check exercises</button>', '>Check answer</button>')
    # Let the parent measure the content, rather than a viewport-sized body.
    page = page.replace('</style>', '''
/* Homepage frame: the exercise itself retains Parseh's styling. */
html, body { height: auto; min-height: 0; background: transparent; }
.xp-main { padding: 0; }
.xp-main > .sheet {
  --base-size: 16px;
  max-width: none; margin: 0; padding: 0;
  box-shadow: none; background: transparent;
}
.sheet .exercise { margin: 0; }
.exercise-correction { margin-bottom: 0; }
</style>''', 1)
    output = HERE.parent.parent / "assets" / "exercise-demo.html"
    output.write_text(page, encoding="utf-8")
    print(f"{output.name}: {len(page.encode('utf-8')):,} bytes")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
