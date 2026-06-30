/* ============================================================
   main.js — Eduardo Figueroa Portfolio
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Sticky header
  ---------------------------------------------------------- */
  const header = document.getElementById('site-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial call in case page is loaded scrolled

  /* ----------------------------------------------------------
     Mobile navigation
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  toggle.addEventListener('click', function () {
    const isOpen = toggle.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on any nav link click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside the menu
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ----------------------------------------------------------
     Scroll reveal
  ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
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

  /* ----------------------------------------------------------
     Hero canvas — animated data nodes
  ---------------------------------------------------------- */
  const canvas  = document.getElementById('hero-canvas');
  const ctx     = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let   animId;

  if (prefersReduced) {
    // Just draw a static faint grid and stop
    resizeCanvas();
    drawStatic();
    return;
  }

  var NODE_COUNT = 55;
  var MAX_DIST   = 130;
  var nodes      = [];

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  function initNodes() {
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.8 + 0.8,
      });
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          var alpha = (1 - d / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(20, 184, 166, ' + alpha + ')';
          ctx.lineWidth   = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 184, 166, 0.55)';
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }

    animId = requestAnimationFrame(drawFrame);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dotCount = 30;
    for (var i = 0; i < dotCount; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 184, 166, 0.3)';
      ctx.fill();
    }
  }

  resizeCanvas();
  initNodes();
  drawFrame();

  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      cancelAnimationFrame(animId);
      resizeCanvas();
      initNodes();
      drawFrame();
    }, 150);
  });

  /* ----------------------------------------------------------
     Active nav link highlight on scroll
  ---------------------------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

}());
