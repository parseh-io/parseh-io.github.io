# parseh.io

The site of [Parseh](https://github.com/parseh-io/Parseh), served by GitHub Pages at
<https://parseh.io>. Plain files, no build: what is committed on `main` is what is published.

| File | What it is |
|---|---|
| `index.html` | The front page: the curtain (one screen of Parseh's accent), then two sepia sheets for spaced repetition and language learning, with a small interactive book excerpt. |
| `downloads/index.html` | Every released version, read from GitHub when the page opens. |
| `examples/index.html` | The list of examples. |
| `examples/<name>/index.html`, `deck.html` | One example: `deck.html` is a deck exported by Parseh itself ("Export selected to HTML"), untouched; `index.html` shows it in a frame under the site's bar. |
| `examples/sources/` | What the examples are made from: the exercises of each deck as Markdown, their pictures, and `build.py`, which has a Parseh checkout make the decks again. |
| `404.html` | What any address with no page answers, under the whole domain (the guide's too). |
| `assets/site.css` | Parseh's colours and faces. The curtain is CSS alone: a block that sticks when only its last strip, the bar, is left. |
| `assets/site.js` | How far up the curtain is (the words fade, the bar appears); the excerpt's phrase glosses; the latest release and the list of releases; the notice a phone gets instead of the download button. |
| `CNAME` | The domain GitHub Pages serves this repository at. |

The guide is not here: it is published at `parseh.io/guide` by the repository `guide` of the same organisation.
The front page links to its `exercises/`, `studio/`, `books/` and `videos/` sections, ready for the guide update in a0.4.4.

## The reading sample

The front page includes the first two complete sentences of *The Blind Owl* (*Boof-e-koor*) by Sadeq Hedayat.
The Persian text, transliterations, vocabulary notes and meanings are taken from the generated
`books/persian/boof-e-koor/reader/index.html` in `Parseh-mine`: reading units 1.1 through 1.5, chunks 0 through 42.
Only that excerpt is copied, with its glosses in HTML templates; no audio, full book or Parseh runtime is loaded.
Hover, click/tap or keyboard focus opens a gloss; Escape, the close button or an outside click dismisses it.
The two front-page sheets stretch to equal heights on a wide screen and take their own heights when stacked.

## The homepage exercise

`assets/exercise-demo.html` is a single English fill-in-the-blanks exercise made by Parseh's document exporter.
It keeps the app's word bank, mouse/touch/keyboard interaction, answer checking, explanations and fonts.
Only the surrounding page bar, footer and margins are adjusted for the homepage's automatically sized frame.
Its source is `examples/sources/homepage-exercise.md`. To rebuild it without rebuilding the other examples:

```bash
PYTHONDONTWRITEBYTECODE=1 /path/to/parseh's/python3 examples/sources/build-homepage-exercise.py /path/to/Parseh
```

Raise the frame's `?v=N` in `index.html` after rebuilding. The embedded TeX Gyre Pagella and Heros fonts have
the same GUST licence as the other TeX Gyre font below.

## When the stylesheet or the script changes

Every page asks for `assets/site.css?v=N` and `assets/site.js?v=N`. A browser keeps those two files for ten minutes
(GitHub Pages says so), so a page that is new with a stylesheet that is old comes out unstyled. Raise `N` in every
page whenever either file changes, so the new pages ask for the new files.

## Where the releases are

`REPO` at the top of `assets/site.js`, and the plain links (the ones that work with scripts off) in
`index.html`, `downloads/index.html` and `404.html`. When Parseh's repository moves, change them together.

## Trying it

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

and open <http://127.0.0.1:8765/>. The addresses in the pages start at the root of the site, so the folder must be
served, not opened as a file.

## The examples

```bash
PYTHONDONTWRITEBYTECODE=1 /path/to/parseh's/python3 examples/sources/build.py /path/to/Parseh [/path/to/a/texmf]
```

The decks are put together in a temporary folder and exported by that Parseh's own exporter; nothing is written in
the Parseh named. The LaTeX drawings need TeX on the computer, and the chemistry ones the packages a Parseh has got
for its chemistry theme: the second path names the `texmf/` of a Parseh that has them, when the first has not. The
script stops, and publishes nothing, if a drawing could not be made.

The pictograms in `examples/sources/images/arasaac-*.png` are the property of the Government of Aragón and were
created by Sergio Palao for [ARASAAC](https://arasaac.org), which distributes them under the Creative Commons licence
BY-NC-SA. The pages that show them say so.

## Fonts

`assets/fonts/NotoNastaliqUrdu.woff2` — Noto Nastaliq Urdu, © 2014 Google Inc., SIL Open Font License 1.1
(`assets/fonts/OFL.txt`). `assets/fonts/Vazirmatn.woff2` — Vazirmatn, © 2015 The Vazirmatn Project Authors,
SIL Open Font License 1.1 (same licence file). `assets/fonts/texgyrechorus-mediumitalic.otf` — TeX Gyre Chorus, © B. Jackowski,
J. M. Nowacki and the TeX users groups, GUST Font License (`assets/fonts/GUST-FONT-LICENSE.txt`). These fonts are
not Parseh's work.

## Licensing and sharing

Copyright © 2026 Bruno Ursino. This is a mixed-license repository:

- The original website code specified in [LICENSE](LICENSE) is available under
  [MIT](LICENSES/MIT.txt), including reusable layout and styling. The grant
  excludes embedded prose, exercise content, artwork and branding.
- Original content and branding have reserved rights with explicit permission
  for screenshots, recordings, short excerpts and identifying logo use in
  discussion, education, reviews and promotion, including commercial coverage.
  Read the [content and brand policy](licensing/index.html), published at
  <https://parseh.io/licensing/>.
- Embedded Parseh export code retains GPL-3.0-or-later; fonts, pictograms and
  MathJax retain their separate licenses. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
  The literary excerpt is not claimed as original website material.

These terms do not change the separate Parseh application or guide licenses.
When contributing, identify whether a change is code, original content or
third-party material, and preserve its applicable notices. Do not assume that
an entire HTML file has one license merely because it contains MIT markup.
