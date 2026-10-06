#!/usr/bin/env python3
"""The example decks of parseh.io, made by Parseh itself.

Each `<name>.md` beside this file holds the exercises of one deck, one
`:::exercise` block after another.  This script puts them into a deck of a
Parseh checkout -- in a temporary folder, never in that Parseh's own decks --
and exports the deck with Parseh's "Export selected to HTML", so the page in
`examples/<name>/deck.html` is exactly what Parseh hands a person.

    <parseh's python> examples/sources/build.py /path/to/Parseh [/path/to/texmf]

The LaTeX drawings need TeX on this computer, as they do in Parseh, and the
chemistry ones the packages Parseh has got for its chemistry theme (Settings
-> LaTeX drawings): they are in that Parseh's `texmf/`, or in the `texmf/` of
another Parseh named second, which is only read.
"""
import re
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parent.parent
DECKS = [("english-basics", "English: one exercise of every kind", "en"),
         ("maths-and-chemistry", "Mathematics and chemistry", "en")]


def blocks(text):
    return [b.strip() + "\n" for b in re.findall(r"^:::exercise .*?^:::\s*$", text, re.S | re.M)]


def main(parseh, texmf=None):
    parseh = Path(parseh).resolve()
    for p in (parseh / "lib", parseh / "markdown" / "exlex", parseh / "markdown" / "app"):
        sys.path.insert(0, str(p))
    import decks
    import htmlgen
    import latexdraw
    import texpackages
    import webexport
    # the studio's server hands the renderer its LaTeX drawer; so must this
    htmlgen.set_latex(latexdraw.draw, latexdraw.draw_all, settings=None, peek=latexdraw.peek)
    if texmf:
        texpackages.TREE = str(Path(texmf).resolve())
    with tempfile.TemporaryDirectory() as tmp:
        decks.set_dir(Path(tmp) / "exercises")
        decks.set_clips_dir(Path(tmp) / "clips")
        latexdraw.DRAWN = str(Path(tmp) / "latex")      # the drawings too: nothing is left in that Parseh
        for name, title, lang in DECKS:
            deck = decks.create_deck(title, lang)
            folder, slug = deck["folder"], deck["slug"]
            source = (HERE / (name + ".md")).read_text(encoding="utf-8")
            for img in sorted(set(re.findall(r"images/([A-Za-z0-9._-]+)", source))):
                decks.add_image(folder, slug, img, (HERE / "images" / img).read_bytes())
            ids = []
            for b in blocks(source):
                ans = decks.add_item(folder, slug, b)
                if ans.get("warnings"):
                    print("  !", name, ans["warnings"])
                ids += [i["id"] for i in ans.get("items", [ans])] if "items" in ans else [ans["id"]]
            items = decks.cram_items(folder, slug, ids)
            items.sort(key=lambda it: ids.index(it["id"]))

            def media(path):
                kind, _, f = (path or "").partition("/")
                try:
                    if kind == "images":
                        return decks.image_file(folder, slug, f)
                    if kind == "audio":
                        return decks.audio_file(folder, slug, f)
                except (decks.NotFound, decks.DeckError, OSError):
                    return None
                return None

            lost = {}

            def render(item, asset_base, preview):
                said = {}
                out = decks.render_item({"lang": lang}, item, asset_base, preview=preview,
                                        docs=None, report=said)
                lost[item["id"]] = max(lost.get(item["id"], 0), said.get("latex_failed", 0))
                return out

            _, data = webexport.deck_html(decks.get_deck(folder, slug), items, media, render)
            out = SITE / "examples" / name / "deck.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(data)
            print("%s: %d exercises, %d KB, %d drawings not made"
                  % (name, len(items), len(data) // 1024, sum(lost.values())))
            if sum(lost.values()):
                sys.exit("a LaTeX drawing could not be made: the page is not fit to publish")


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    main(*sys.argv[1:])
