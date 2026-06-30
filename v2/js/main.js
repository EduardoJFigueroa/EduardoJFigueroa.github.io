/* v2 main.js — v1 interactivity + filters, counters, rotating tagline */

(function () {
  'use strict';

  var header = document.getElementById('site-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  toggle.addEventListener('click', function () {
    var isOpen = toggle.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Scroll reveal */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Hero canvas — violet / amber nodes */
  var canvas = document.getElementById('hero-canvas');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animId;

  if (canvas) {
    var ctx = canvas.getContext('2d');
    var NODE_COUNT = 60;
    var MAX_DIST = 140;
    var nodes = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }

    function initNodes() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 0.8,
        });
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            var alpha = (1 - d / MAX_DIST) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(139, 92, 246, ' + alpha + ')';
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = k % 5 === 0 ? 'rgba(245, 158, 11, 0.6)' : 'rgba(139, 92, 246, 0.55)';
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      animId = requestAnimationFrame(drawFrame);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < 35; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.35)';
        ctx.fill();
      }
    }

    resizeCanvas();
    if (prefersReduced) drawStatic();
    else { initNodes(); drawFrame(); }

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        cancelAnimationFrame(animId);
        resizeCanvas();
        if (prefersReduced) drawStatic();
        else { initNodes(); drawFrame(); }
      }, 150);
    });
  }

  /* Active nav */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* Rotating hero tagline */
  var rotateEl = document.getElementById('hero-rotate');
  if (rotateEl && !prefersReduced) {
    var phrases = [
      'Bioinformatics Researcher',
      'ML Pipeline Builder',
      'Dashboard Developer',
      'Data Science Enthusiast',
      'HuBMAP Collaborator',
    ];
    var idx = 0;

    setInterval(function () {
      rotateEl.classList.add('fade-out');
      setTimeout(function () {
        idx = (idx + 1) % phrases.length;
        rotateEl.textContent = phrases[idx];
        rotateEl.classList.remove('fade-out');
      }, 300);
    }, 3200);
  }

  /* Animated stat counters */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = target > 100 ? 1200 : 1800;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = Math.round(eased * target);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-num[data-count]').forEach(function (el) {
    statObserver.observe(el);
  });

  /* Experience filter */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var timelineItems = document.querySelectorAll('.timeline-item[data-tags]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });

      timelineItems.forEach(function (item) {
        var tags = item.getAttribute('data-tags').split(' ');
        var show = filter === 'all' || tags.indexOf(filter) !== -1;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

}());
