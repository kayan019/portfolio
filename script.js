/**
 * Njogu Wilson Kiiru - Portfolio Interactive Controller
 * Features: Dark/Light Mode, Mobile Navigation, Project Filtering,
 *           Interactive Modal Dialog, Form Validation, Clipboard Copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light) with Persistence
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-moon theme-icon';
    } else {
      themeIcon.className = 'fa-solid fa-sun theme-icon';
    }
  }

  // 3. Mobile Navigation Menu Toggle with Backdrop Overlay
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function closeMobileNav() {
    if (!navLinks) return;
    navLinks.classList.remove('show');
    if (navBackdrop) navBackdrop.classList.remove('show');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
    document.body.classList.remove('no-scroll');
  }

  function openMobileNav() {
    if (!navLinks) return;
    navLinks.classList.add('show');
    if (navBackdrop) navBackdrop.classList.add('show');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-xmark';
    }
    document.body.classList.add('no-scroll');
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('show');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav when clicking any link inside drawer
    navLinks.querySelectorAll('.nav-link, .nav-mobile-cta').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on window resize if transitioned to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && navLinks.classList.contains('show')) {
        closeMobileNav();
      }
    }, { passive: true });
  }

  // 4. Scroll Active Navigation Link Highlight
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 5. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Project Modal Details Data & Trigger
  const projectData = {
    'ai-career': {
      title: 'AI Career Recommendation System',
      category: 'AI, Python, Flask & Database Architecture',
      summary: 'A sophisticated intelligent guidance system that leverages multi-dimensional assessment metrics to help students and early career professionals discover the best computer science and engineering career tracks.',
      highlights: [
        'Proprietary recommendation algorithm evaluating student academic strengths, interests, and technical capabilities.',
        'Interactive questionnaire and skill profiler with instant real-time career matching breakdown.',
        'Dynamic roadmaps detailing specific programming languages, tools, and courses required for each suggested role.',
        'Flask backend managing authentication, user history, and relational database profile persistence in SQLite/MySQL.'
      ],
      technologies: ['Python', 'Flask', 'SQL / Relational Schema', 'HTML5', 'CSS3', 'JavaScript', 'Scikit-Learn logic'],
      github: 'https://github.com/Kayan019'
    },
    'pos-system': {
      title: 'Supermarket POS System',
      category: 'Business Software, Desktop/Web & Database Management',
      summary: 'A high-throughput Point of Sale and inventory administration solution built to handle fast-paced retail checkout workflows and automated stock level replenishment.',
      highlights: [
        'Rapid item lookup via barcode scanning simulations and instant SKU database queries.',
        'Automated real-time inventory deduction and low-stock reorder warnings.',
        'Multi-tender transaction logging (Cash, Mobile Money, Card) with printable receipts.',
        'Administrative dashboard providing daily gross revenue, best-selling goods, and transactional reconciliation audit trails.'
      ],
      technologies: ['Python', 'MySQL', 'SQLite', 'Flask / UI Framework', 'Data Reporting', 'Transactional SQL'],
      github: 'https://github.com/Kayan019'
    },
    'dairy-farm': {
      title: 'Dairy Farming Management Website',
      category: 'Full-Stack AgroTech Web Development',
      summary: 'A dedicated web platform engineered for modern Kenyan and global dairy farm operations, consolidating milk yield monitoring, cow herd veterinary logs, and commercial distribution.',
      highlights: [
        'Daily morning and evening milk production logs with automated yield performance calculations.',
        'Cattle health, vaccination schedules, and breeding cycle timeline alerts.',
        'Direct customer dairy supply ordering portal with order status tracking.',
        'Clean, accessible responsive UI optimized for farmers using smartphones in outdoor settings.'
      ],
      technologies: ['HTML5', 'CSS3 / Flexbox', 'JavaScript', 'Python / Flask', 'Responsive UX'],
      github: 'https://github.com/Kayan019'
    },
    'car-showroom': {
      title: 'Car Showroom Website',
      category: 'Frontend Engineering & Modern Automotive UI/UX',
      summary: 'A luxury automotive dealership web application designed to deliver an immersive, showroom-quality vehicle exploration experience for prospective car buyers.',
      highlights: [
        'Multi-attribute vehicle filter enabling instant search by manufacturer, price range, fuel type, and transmission.',
        'Vehicle specification showcase featuring performance stats (0-60 mph, horsepower, torque).',
        'Interactive test drive scheduler with date/time pickers and automated confirmation simulation.',
        'Interactive vehicle financing estimator with real-time monthly payment calculation.'
      ],
      technologies: ['JavaScript (ES6)', 'CSS Grid & Flexbox', 'CSS Keyframe Animations', 'HTML5 Semantic'],
      github: 'https://github.com/Kayan019'
    },
    'photography': {
      title: 'Photography Portfolio Website',
      category: 'Creative Visual Arts & Responsive UI/UX',
      summary: 'An aesthetic, image-centric portfolio created to spotlight photography artistry across portrait, landscape, architectural, and commercial photography genres.',
      highlights: [
        'Masonry layout grid with progressive loading and high-resolution lightbox preview.',
        'Categorized photo albums with smooth filter animations.',
        'Client photoshoot booking inquiry form with package selector and date preferences.',
        'Dark minimalist aesthetic prioritizing visual artwork balance and typography.'
      ],
      technologies: ['Modern JavaScript', 'CSS Flexbox/Masonry Grid', 'HTML5', 'Lightbox Architecture'],
      github: 'https://github.com/Kayan019'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const demoTriggers = document.querySelectorAll('.demo-trigger');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalContent || !projectModal) return;

    modalContent.innerHTML = `
      <div class="modal-body">
        <span class="modal-category">${data.category}</span>
        <h2>${data.title}</h2>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">${data.summary}</p>

        <h4 class="modal-section-title">Key Capabilities & Architecture:</h4>
        <ul class="modal-list">
          ${data.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 class="modal-section-title">Technologies Used:</h4>
        <div class="tech-tag-group" style="margin-bottom: 24px;">
          ${data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="modal-actions">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
          <button class="btn btn-secondary btn-sm" id="modalDismissBtn">
            Close Preview
          </button>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook dismiss button inside modal
    const dismissBtn = document.getElementById('modalDismissBtn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  demoTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 7. Copy Email to Clipboard Feature
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const emailAddress = 'kayannjogu019@gmail.com';

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyFeedback.textContent = 'Copied to Clipboard!';
        copyBtn.style.color = 'var(--success)';
        copyBtn.style.borderColor = 'var(--success)';

        setTimeout(() => {
          copyFeedback.textContent = 'Copy Email';
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2500);
      } catch (err) {
        // Fallback for environments where clipboard API might be restricted
        const tempInput = document.createElement('input');
        tempInput.value = emailAddress;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        copyFeedback.textContent = 'Copied!';
        setTimeout(() => {
          copyFeedback.textContent = 'Copy Email';
        }, 2000);
      }
    });
  }

  // 8. Contact Form Handling & Validation
  const contactForm = document.getElementById('portfolioContactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, true);
        isValid = false;
      } else {
        showError(nameInput, false);
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, true);
        isValid = false;
      } else {
        showError(emailInput, false);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showError(subjectInput, true);
        isValid = false;
      } else {
        showError(subjectInput, false);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showError(messageInput, true);
        isValid = false;
      } else {
        showError(messageInput, false);
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;

          // Open mailto link as direct client mail trigger
          const mailtoUri = `mailto:kayannjogu019@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent("Sender: " + nameInput.value.trim() + " (" + emailInput.value.trim() + ")\n\n" + messageInput.value.trim())}`;

          // Show success message
          if (formSuccessAlert) {
            formSuccessAlert.classList.remove('hidden');
          }

          // Trigger mail client in background
          window.location.href = mailtoUri;

          // Reset form
          contactForm.reset();

          // Hide success message after 6 seconds
          setTimeout(() => {
            if (formSuccessAlert) formSuccessAlert.classList.add('hidden');
          }, 6000);
        }, 800);
      }
    });

    function showError(inputElement, hasError) {
      const parent = inputElement.closest('.form-group');
      if (parent) {
        if (hasError) {
          parent.classList.add('has-error');
        } else {
          parent.classList.remove('has-error');
        }
      }
    }
  }

  // 9. Floating Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
