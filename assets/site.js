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
  // It is either down or up.  One turn of the wheel, one key, one swipe sends
  // it all the way; nothing leaves it half open.
  var curtain = document.querySelector('.curtain');
  if (curtain) {
    var bar = curtain.querySelector('.bar');
    var hero = curtain.querySelector('.hero');
    var run = function () { return curtain.offsetHeight - bar.offsetHeight; };
    var set = function () {
      var r = run();
      var p = r > 0 ? Math.min(1, Math.max(0, window.scrollY / r)) : 1;
      root.style.setProperty('--p', p.toFixed(4));
      curtain.classList.toggle('rising', p > .5 && p < .98);
      curtain.classList.toggle('up', p >= .98);
      // what cannot be seen cannot be tabbed to
      if (hero) hero.inert = p >= .98;
      bar.inert = p <= .5;
    };

    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var moving = false;     // the curtain is on its way
    var from = 0, to = 0, t0 = 0;
    var ease = function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
    var step = function (now) {
      var x = Math.min(1, (now - t0) / 620);
      window.scrollTo(0, from + (to - from) * ease(x));
      set();
      if (x < 1) requestAnimationFrame(step); else moving = false;
    };
    var send = function (up) {          // up: the curtain goes up
      if (moving) return;
      to = up ? run() : 0;
      from = window.scrollY;
      if (Math.abs(to - from) < 1) return;
      if (calm) { window.scrollTo(0, to); set(); return; }
      moving = true; t0 = performance.now();
      requestAnimationFrame(step);
    };
    var isDown = function () { return window.scrollY < 1; };
    var atSeam = function () { return window.scrollY <= run() + 1; };   // up, and the paper at its top

    // the wheel: a touchpad keeps sending turns long after the fingers have
    // left, so one gesture is every turn until a pause
    var lastTurn = 0, spent = false;
    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey) return;                       // a pinch to zoom
      var now = performance.now();
      if (now - lastTurn > 140) spent = false;
      lastTurn = now;
      if (moving || spent) { e.preventDefault(); return; }
      if (e.deltaY > 0 && window.scrollY < run() - 1) { e.preventDefault(); spent = true; send(true); }
      else if (e.deltaY < 0 && atSeam() && !isDown()) { e.preventDefault(); spent = true; send(false); }
    }, {passive: false});

    window.addEventListener('keydown', function (e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      var el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      var down = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey && !(el && /^(A|BUTTON)$/.test(el.tagName)));
      var up = e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home' || (e.key === ' ' && e.shiftKey);
      if (down && window.scrollY < run() - 1) { e.preventDefault(); send(true); }
      else if (up && atSeam() && !isDown()) { e.preventDefault(); send(false); }
    });

    // a finger: the page follows it, and when it lets go between the two
    // states the curtain finishes the way it was going
    var touching = false, lastY = 0, dir = 0, settle = 0;
    var finish = function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        if (touching || moving) return;
        var y = window.scrollY;
        if (y > 1 && y < run() - 1) send(dir >= 0);
      }, 90);
    };
    window.addEventListener('touchstart', function () { touching = true; }, {passive: true});
    window.addEventListener('touchend', function () { touching = false; finish(); }, {passive: true});
    window.addEventListener('touchcancel', function () { touching = false; finish(); }, {passive: true});

    var waiting = false;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y !== lastY) { dir = y > lastY ? 1 : -1; lastY = y; }
      if (!moving) finish();
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(function () { waiting = false; set(); });
    }, {passive: true});
    window.addEventListener('resize', set);
    set();

    var more = curtain.querySelector('.more');
    if (more) more.addEventListener('click', function () { send(true); });
    // the logo of the bar lets the curtain down again
    var home = bar.querySelector('.home');
    if (home) home.addEventListener('click', function (e) { e.preventDefault(); send(false); });
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
