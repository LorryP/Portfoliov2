document.addEventListener('DOMContentLoaded', () => {

  // ---- Portfolio Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const categories = card.dataset.category.split(' ');
          card.classList.toggle('hidden', !categories.includes(filter));
        }
      });
    });
  });

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

  // ---- Scroll Reveal for About Section ----
  const aboutInner = document.querySelector('.about-inner');
  if (aboutInner) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          aboutObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });
    aboutObserver.observe(aboutInner);
  }

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
  const navLinks = document.querySelectorAll('.nav-link');
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

  // ---- Header background on scroll ----
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 50
      ? 'rgba(0,0,0,0.08)'
      : 'rgba(0,0,0,0.04)';
  }, { passive: true });

});
