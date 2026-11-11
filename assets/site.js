(function () {
  var root = document.documentElement;

  // Day / night theme
  var toggle = document.querySelector('.theme-toggle');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    if (toggle) {
      toggle.setAttribute('aria-pressed', t === 'night' ? 'true' : 'false');
      toggle.setAttribute('aria-label', t === 'night' ? 'Switch to day mode' : 'Switch to night mode');
    }
    try { localStorage.setItem('es-theme', t); } catch (e) {}
  }
  setTheme(root.getAttribute('data-theme') || 'day');
  if (toggle) toggle.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'night' ? 'day' : 'night');
  });

  // Mega menu
  var btn = document.querySelector('.nav-btn');
  var mega = document.getElementById('mega');
  function setMenu(open) {
    if (!btn || !mega) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mega.classList.toggle('open', open);
  }
  if (btn) btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('click', function (e) {
    if (mega && !mega.contains(e.target) && window.innerWidth > 960) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); if (typeof setNav === 'function') setNav(false); }
  });

  // Mobile nav
  var mt = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  var header = document.querySelector('.site-header');
  function setNav(open) {
    if (!mt || !nav) return;
    nav.classList.toggle('open', open);
    if (header) header.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-lock', open);
    mt.setAttribute('aria-expanded', open ? 'true' : 'false');
    mt.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open) setMenu(false);
  }
  if (mt && nav) mt.addEventListener('click', function () {
    setNav(!nav.classList.contains('open'));
  });
  // Close the menu after tapping any link inside it
  document.querySelectorAll('.nav a, #mega a').forEach(function (a) {
    a.addEventListener('click', function () { setNav(false); setMenu(false); });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && nav && nav.classList.contains('open')) setNav(false);
  });

  // Inquiry form -> opens an email to the firm (no data is stored on the server)
  var form = document.querySelector('form.inquiry');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var body = 'Name or alias: ' + f.name.value + '\nReply to: ' + f.email.value +
      '\nI am a: ' + f.role.value + '\n\nOverview:\n' + f.overview.value;
    window.location.href = 'mailto:elliotstrategies@proton.me?subject=' +
      encodeURIComponent('Confidential inquiry') + '&body=' + encodeURIComponent(body);
  });
})();
