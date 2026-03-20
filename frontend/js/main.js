// --- Global Config ---
window.API_CONFIG = {
  BASE_URL: 'http://localhost:5000'
};

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle (Dark / Light Mode) ---
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('rewindTheme') || 'luxury';
  body.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'luxury' ? 'modern' : 'luxury';
      body.setAttribute('data-theme', next);
      localStorage.setItem('rewindTheme', next);
      updateToggleIcon(next);
    });
  }

  function updateToggleIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'luxury') {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.title = 'Switch to Light Mode';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.title = 'Switch to Dark Mode';
    }
  }

  // --- Sticky Navbar ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  // --- Mobile Menu ---
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- Scroll Animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-fade-up');
  animatedElements.forEach(el => observer.observe(el));
});
