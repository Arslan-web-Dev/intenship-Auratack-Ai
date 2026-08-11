/* ============================================================
   Muhammad Arslan | Portfolio  
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile sidebar toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      const isOpen = sidebar.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu after clicking a nav link (mobile)
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  /* ---------- Typed role text (replaces Typed.js) ---------- */
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    const words = (typedEl.getAttribute('data-typed-items') || '')
      .split(',')
      .map(w => w.trim())
      .filter(Boolean);

    let wordIndex = 0, charIndex = 0, deleting = false;

    const type = () => {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 2000); // pause before deleting
          return;
        }
        setTimeout(type, 80);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 50);
      }
    };

    if (words.length) type();
  }

  /* ---------- Scroll reveal (replaces AOS) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-item');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Animate skill bars once visible ---------- */
  const skillSection = document.querySelector('.skills');
  if (skillSection && 'IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill__bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-level') + '%';
          });
          skillObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    skillObserver.observe(skillSection);
  }

  /* ---------- Highlight active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(sec => navObserver.observe(sec));
  }

  /* ---------- Contact form validation (vanilla, replaces Bootstrap tooltip pattern) ---------- */
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(input => {
        const field = input.closest('.field');
        if (!input.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (valid) {
        form.reset();
        alert('Thanks! Your message details look good (demo only — no backend connected yet).');
      }
    });

    form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) input.closest('.field').classList.remove('is-invalid');
      });
    });
  }

});
