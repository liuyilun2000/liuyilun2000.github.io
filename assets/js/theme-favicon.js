/* Theme favicon: Font Awesome sun/moon paths; fill matches #theme-icon computed color (navbar). */
(function () {
  'use strict';
  var SUN_VB = '0 -32 576 544';
  var SUN_D =
    'M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1 498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288zm0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z';
  var MOON_VB = '0 0 512 512';
  var MOON_D =
    'M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z';

  var icon = document.getElementById('theme-icon');
  var btn = document.getElementById('theme-toggle');
  if (!btn || !icon) return;

  function faviconDataUri(viewBox, d, fill) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' +
      viewBox +
      '"><path fill="' +
      String(fill).replace(/&/g, '&amp;').replace(/"/g, '&quot;') +
      '" d="' +
      d +
      '"/></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function favLink() {
    var l = document.getElementById('theme-favicon');
    if (!l) {
      l = document.createElement('link');
      l.id = 'theme-favicon';
      l.rel = 'icon';
      l.type = 'image/svg+xml';
      document.head.appendChild(l);
    }
    return l;
  }

  function upd(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    var fill = window.getComputedStyle(icon).color;
    var vb = theme === 'dark' ? SUN_VB : MOON_VB;
    var path = theme === 'dark' ? SUN_D : MOON_D;
    favLink().href = faviconDataUri(vb, path, fill);
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
