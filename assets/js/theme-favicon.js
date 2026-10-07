/* Theme toggle (sun/moon) + fixed crown favicon. */
(function () {
  'use strict';

  var icon = document.getElementById('theme-icon');
  var btn = document.getElementById('theme-toggle');

  function crownHref() {
    var scripts = document.getElementsByTagName('script');
    var src = '';
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && /theme-favicon\.js/.test(scripts[i].src)) {
        src = scripts[i].src;
        break;
      }
    }
    return src.replace(/js\/theme-favicon\.js(?:\?.*)?$/, 'favicon.svg');
  }

  function favLink() {
    var l = document.getElementById('site-favicon');
    if (!l) {
      l = document.createElement('link');
      l.id = 'site-favicon';
      l.rel = 'icon';
      l.type = 'image/svg+xml';
      document.head.appendChild(l);
    }
    return l;
  }

  favLink().href = crownHref();

  if (!btn || !icon) return;

  function upd(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  upd(document.documentElement.getAttribute('data-theme') || 'dark');
  btn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var nxt = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nxt);
    localStorage.setItem('theme', nxt);
    upd(nxt);
  });
})();
