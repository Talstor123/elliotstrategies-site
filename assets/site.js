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
    if (e.key === 'Escape') { setMenu(false); if (btn) btn.focus(); }
  });

  // Mobile nav
  var mt = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (mt && nav) mt.addEventListener('click', function () {
    var open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    mt.setAttribute('aria-expanded', open ? 'true' : 'false');
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
