(function () {
  var btn = document.getElementById('menu-btn');
  var sidebar = document.getElementById('sidebar');
  if (!btn || !sidebar) return;

  btn.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      sidebar.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}());
