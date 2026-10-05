# parseh.io

The site of [Parseh](https://github.com/Addicted2BayesianEpistemology/Parseh), served by GitHub Pages at
<https://parseh.io>. Plain files, no build: what is committed on `main` is what is published.

| File | What it is |
|---|---|
| `index.html` | The front page: the curtain (one screen of Parseh's accent) and, under it, the sepia paper. |
| `downloads/index.html` | Every released version, read from GitHub when the page opens. |
| `404.html` | What any address with no page answers, under the whole domain (the guide's too). |
| `assets/site.css` | Parseh's colours and faces. The curtain is CSS alone: a block that sticks when only its last strip, the bar, is left. |
| `assets/site.js` | How far up the curtain is (the words fade, the bar appears); the latest release and the list of releases; the notice a phone gets instead of the download button. |
| `CNAME` | The domain GitHub Pages serves this repository at. |

The guide is not here: it is published at `parseh.io/guide` by the repository `guide` of the same organisation.

## Where the releases are

`REPO` at the top of `assets/site.js`, and the plain links (the ones that work with scripts off) in
`index.html`, `downloads/index.html` and `404.html`. When Parseh's repository moves, change them together.

## Trying it

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

and open <http://127.0.0.1:8765/>. The addresses in the pages start at the root of the site, so the folder must be
served, not opened as a file.

## Fonts

`assets/fonts/NotoNastaliqUrdu.woff2` — Noto Nastaliq Urdu, © 2014 Google Inc., SIL Open Font License 1.1
(`assets/fonts/OFL.txt`). `assets/fonts/texgyrechorus-mediumitalic.otf` — TeX Gyre Chorus, © B. Jackowski,
J. M. Nowacki and the TeX users groups, GUST Font License (`assets/fonts/GUST-FONT-LICENSE.txt`). Neither is
Parseh's work.
