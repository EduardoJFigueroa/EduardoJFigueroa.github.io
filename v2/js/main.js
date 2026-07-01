(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var mobBtn  = document.getElementById('mob-btn');
  var mobNav  = document.getElementById('mob-nav');

  if (mobBtn && mobNav) {
    mobBtn.addEventListener('click', function () {
      var open = mobNav.hidden;
      mobNav.hidden = !open;
      mobBtn.setAttribute('aria-expanded', String(open));
      mobBtn.classList.toggle('open', open);
    });

    mobNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobNav.hidden = true;
        mobBtn.setAttribute('aria-expanded', 'false');
        mobBtn.classList.remove('open');
      });
    });
  }

  /* ---- Rail dot active state ---- */
  var railDots = Array.from(document.querySelectorAll('.rail-dot'));
  var panels   = Array.from(document.querySelectorAll('.panel[id]'));

  if (panels.length) {
    var panelObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          railDots.forEach(function (dot) {
            dot.classList.toggle('active', dot.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4 });

    panels.forEach(function (p) { panelObserver.observe(p); });
  }

  /* ---- Scroll reveal ---- */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ---- Rotating role tagline ---- */
  var roles = Array.from(document.querySelectorAll('.role'));
  var current = 0;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (roles.length > 1 && !prefersReduced) {
    setInterval(function () {
      roles[current].classList.remove('role--active');
      roles[current].setAttribute('aria-hidden', 'true');
      current = (current + 1) % roles.length;
      roles[current].classList.add('role--active');
      roles[current].setAttribute('aria-hidden', 'false');
    }, 2800);
  }

  /* ---- Bento stat counters ---- */
  function countUp(el) {
    var target  = parseInt(el.getAttribute('data-count'), 10);
    var suffix  = el.getAttribute('data-suffix') || '';
    var start   = performance.now();
    var dur     = target > 100 ? 1400 : 1000;

    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObs.observe(el);
  });

  /* ---- Skill bar animation ---- */
  var barObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.lb-fill').forEach(function (bar) {
          bar.classList.add('animated');
        });
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var skillsLayout = document.querySelector('.skills-layout');
  if (skillsLayout) barObs.observe(skillsLayout);

  /* ---- Accordion ---- */
  document.querySelectorAll('.acc-head').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.acc-item');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.acc-item.open').forEach(function (open) {
        open.classList.remove('open');
        open.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Wrap acc-body content so grid-template-rows trick works */
  document.querySelectorAll('.acc-body').forEach(function (body) {
    var inner = document.createElement('div');
    inner.className = 'acc-body-inner';
    while (body.firstChild) inner.appendChild(body.firstChild);
    body.appendChild(inner);
  });

  /* ---- Experience filter ---- */
  var ftags = document.querySelectorAll('.ftag');
  var accItems = document.querySelectorAll('.acc-item[data-cats]');

  ftags.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-f');

      ftags.forEach(function (b) { b.classList.remove('ftag--on'); });
      btn.classList.add('ftag--on');

      accItems.forEach(function (item) {
        var cats = item.getAttribute('data-cats').split(' ');
        var show = f === 'all' || cats.indexOf(f) !== -1;
        item.classList.toggle('hidden', !show);
        if (item.classList.contains('hidden') && item.classList.contains('open')) {
          item.classList.remove('open');
          item.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

}());
