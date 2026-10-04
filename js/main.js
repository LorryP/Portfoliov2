document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.work-card');

  // ---- Scroll Reveal for Work Cards ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const index = Array.from(cards).indexOf(el);
        const delay = (index % 2) * 120;

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  cards.forEach(card => revealObserver.observe(card));

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Mobile Nav Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Nav Active State (scroll spy) ----
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach(link => {
            link.classList.toggle('is-current', link.getAttribute('href') === id);
          });
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px'
    });

    sections.forEach(section => spyObserver.observe(section));
  }

  // ---- Random tilt on focus-area pills ----
  document.querySelectorAll('.work-tags li').forEach(tag => {
    const tilt = () => {
      const angle = 2 + Math.random() * 4; // between 2 and 6 degrees
      const direction = Math.random() < 0.5 ? -1 : 1;
      tag.style.setProperty('--tilt', `${(angle * direction).toFixed(1)}deg`);
    };
    tag.addEventListener('mouseenter', tilt);
    tag.addEventListener('focus', tilt);
  });

});
