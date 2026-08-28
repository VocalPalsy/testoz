// Testoz Client Application JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Background Blur on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Showcase Tabs Switching Logic
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update active button state
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      // Update active content
      tabContents.forEach((content) => {
        if (content.id === `content-${targetTab}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Animated Metric Counter on Scroll
  const metricNumbers = document.querySelectorAll('.metric-number');
  let animated = false;

  const animateCounters = () => {
    metricNumbers.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.innerText.replace(/[0-9.]/g, '');
      let current = 0;
      const step = target / 50;

      const updateCount = () => {
        current += step;
        if (current < target) {
          counter.innerText = (target % 1 === 0 ? Math.floor(current) : current.toFixed(2)) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCount();
    });
  };

  // IntersectionObserver for trigger metrics animation
  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(metricsSection);
  }

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('btn-mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'rgba(7, 9, 19, 0.95)';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    });
  }
});
