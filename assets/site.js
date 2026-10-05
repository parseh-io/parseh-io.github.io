// parseh.io -- the curtain's progress, and what GitHub says the releases are.
// The pages work without this file: the curtain scrolls and sticks by CSS
// alone, and the download links then lead to the releases page on GitHub.
(function () {
  'use strict';

  // WHERE PARSEH'S RELEASES ARE.  The one place to change when the repository
  // moves (and the plain links in index.html, downloads/index.html, 404.html).
  var REPO = 'Addicted2BayesianEpistemology/Parseh';
  var API = 'https://api.github.com/repos/' + REPO + '/releases?per_page=100';

  var root = document.documentElement;
  root.classList.add('js');

  // ── the curtain ──────────────────────────────────────────────────────
  var curtain = document.querySelector('.curtain');
  if (curtain) {
    var bar = curtain.querySelector('.bar');
    var hero = curtain.querySelector('.hero');
    var set = function () {
      var run = curtain.offsetHeight - bar.offsetHeight;
      var p = run > 0 ? Math.min(1, Math.max(0, window.scrollY / run)) : 1;
      root.style.setProperty('--p', p.toFixed(4));
      curtain.classList.toggle('rising', p > .5 && p < .98);
      curtain.classList.toggle('up', p >= .98);
      // what cannot be seen cannot be tabbed to
      if (hero) hero.inert = p >= .98;
      bar.inert = p <= .5;
    };
    var waiting = false;
    var later = function () {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(function () { waiting = false; set(); });
    };
    window.addEventListener('scroll', later, {passive: true});
    window.addEventListener('resize', later);
    set();

    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var go = function (y) { window.scrollTo({top: y, behavior: calm ? 'auto' : 'smooth'}); };
    var more = curtain.querySelector('.more');
    if (more) more.addEventListener('click', function () { go(curtain.offsetHeight - bar.offsetHeight); });
    // the logo of the bar lets the curtain down again
    var home = bar.querySelector('.home');
    if (home) home.addEventListener('click', function (e) { e.preventDefault(); go(0); });
  }

  // ── the releases ─────────────────────────────────────────────────────
  var button = document.querySelector('[data-latest]');
  var list = document.querySelector('[data-releases]');

  function size(bytes) { return Math.round(bytes / 1048576) + ' MB'; }
  function zipOf(r) {
    return (r.assets || []).filter(function (a) { return /\.zip$/.test(a.name); })[0];
  }
  function sumOf(r) {
    return (r.assets || []).filter(function (a) { return /\.sha256$/.test(a.name); })[0];
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function link(cls, text, href) { var a = el('a', cls, text); a.href = href; return a; }

  // Parseh is installed on a computer: a phone or a tablet is told so, and is
  // not handed a zip it can do nothing with
  var ua = navigator.userAgent || '';
  var phone = !!(navigator.userAgentData && navigator.userAgentData.mobile) ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);   // an iPad says it is a Mac
  var notice = document.querySelector('.dl[data-phone]');
  if (phone) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-phone]'), function (e) { e.hidden = false; });
    if (button && notice) button.hidden = true;
  }

  function show(all) {
    // what a person installs: published, not a rehearsal, with its zip
    var rs = all.filter(function (r) { return !r.draft && !r.prerelease && zipOf(r); });
    if (!rs.length) return;
    if (button) {
      var z = zipOf(rs[0]);
      button.href = z.browser_download_url;
      button.querySelector('small').textContent =
        'Parseh ' + rs[0].tag_name + ' · zip, ' + size(z.size);
      if (notice) notice.querySelector('small').textContent =
        'Open parseh.io there to download it · the latest version is ' + rs[0].tag_name;
    }
    if (list) {
      list.textContent = '';
      rs.forEach(function (r, i) {
        var z = zipOf(r), s = sumOf(r), li = el('li');
        li.appendChild(el('span', 'v', 'Parseh ' + r.tag_name));
        if (i === 0) li.appendChild(el('span', 'newest', 'latest'));
        var d = new Date(r.published_at);
        li.appendChild(el('span', 'when', d.toLocaleDateString('en-GB',
          {day: 'numeric', month: 'long', year: 'numeric'})));
        li.appendChild(link('', 'What changed', r.html_url));
        if (s) li.appendChild(link('', 'Checksum', s.browser_download_url));
        li.appendChild(link('zip', 'Download · ' + size(z.size), z.browser_download_url));
        list.appendChild(li);
      });
      var note = document.querySelector('[data-releases-note]');
      if (note) note.hidden = true;
    }
  }

  // one question to GitHub per visit, not per page
  var KEY = 'parseh-releases';
  var kept = null;
  try { kept = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) {}
  if (kept) { show(kept); return; }
  fetch(API, {headers: {Accept: 'application/vnd.github+json'}})
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (all) {
      var slim = all.map(function (r) {
        return {tag_name: r.tag_name, draft: r.draft, prerelease: r.prerelease,
                published_at: r.published_at, html_url: r.html_url,
                assets: (r.assets || []).map(function (a) {
                  return {name: a.name, size: a.size, browser_download_url: a.browser_download_url};
                })};
      });
      try { sessionStorage.setItem(KEY, JSON.stringify(slim)); } catch (e) {}
      show(slim);
    })
    .catch(function () { /* the plain links of the page stand */ });
})();
