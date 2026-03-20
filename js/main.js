document.addEventListener('DOMContentLoaded', () => {

  // ---- Portfolio Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.bento-card');

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

  // ---- Scroll Reveal (Intersection Observer) ----
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

  // ---- Scroll Reveal for Thinking Cards ----
  const thinkingCards = document.querySelectorAll('.thinking-card');
  const thinkingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const index = Array.from(thinkingCards).indexOf(el);
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
        thinkingObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  thinkingCards.forEach(card => thinkingObserver.observe(card));

  // ---- Scroll Reveal for Lab Cards ----
  const labCards = document.querySelectorAll('.lab-card');
  const labObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const index = Array.from(labCards).indexOf(el);
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
        labObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  labCards.forEach(card => labObserver.observe(card));

  // ---- Scroll Reveal for About Section ----
  const aboutLayout = document.querySelector('.about-layout');
  if (aboutLayout) {
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
    aboutObserver.observe(aboutLayout);
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Header background on scroll ----
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.style.borderBottomColor = 'rgba(0,0,0,0.08)';
    } else {
      header.style.borderBottomColor = 'rgba(0,0,0,0.04)';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ---- Hide scroll indicator on scroll ----
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transition = 'opacity 0.4s ease';
      }
    }, { passive: true });
  }

});
