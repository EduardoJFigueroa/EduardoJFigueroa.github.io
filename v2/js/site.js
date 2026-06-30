(function () {
  var btn = document.getElementById('menu-btn');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('sidebar-backdrop');
  if (!btn || !sidebar) return;

  var MOBILE = 860;

  function isMobile() {
    return window.innerWidth <= MOBILE;
  }

  function setMenuOpen(open) {
    sidebar.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (backdrop) backdrop.classList.toggle('visible', open);
    document.body.style.overflow = open && isMobile() ? 'hidden' : '';
    if (isMobile()) {
      if (open) sidebar.removeAttribute('inert');
      else sidebar.setAttribute('inert', '');
    } else {
      sidebar.removeAttribute('inert');
    }
  }

  function closeMenu() { setMenuOpen(false); }

  btn.addEventListener('click', function () {
    setMenuOpen(!sidebar.classList.contains('open'));
  });

  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeMenu();
  });

  sidebar.querySelectorAll('.sidebar-nav a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      closeMenu();
      sidebar.removeAttribute('inert');
    } else if (!sidebar.classList.contains('open')) {
      sidebar.setAttribute('inert', '');
    }
  });

  if (isMobile()) sidebar.setAttribute('inert', '');

  /* Active nav — pick topmost visible section */
  var navLinks = sidebar.querySelectorAll('.sidebar-nav a');
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('section[id], header[id]')
  );

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  function updateActiveNav() {
    var visible = sections.filter(function (s) {
      var r = s.getBoundingClientRect();
      return r.top < window.innerHeight * 0.45 && r.bottom > 80;
    });
    if (visible.length) {
      visible.sort(function (a, b) {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
      });
      setActive(visible[0].id);
    } else if (window.scrollY < 80) {
      setActive('about');
    }
  }

  setActive('about');
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}());
