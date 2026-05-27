document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. THEME SWITCHER (DARK/LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save theme choice to local storage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // ==========================================
  // 2. STICKY NAVBAR SCROLL ACTION
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.getElementById('nav-links');
  
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinksList.classList.toggle('active');
  });

  // Close mobile menu when clicking outside or on links
  document.addEventListener('click', () => {
    navLinksList.classList.remove('active');
  });

  const navAnchors = navLinksList.querySelectorAll('a');
  navAnchors.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
    });
  });

  // ==========================================
  // 4. TYPEWRITER EFFECT FOR HEROTAG
  // ==========================================
  const typewriterSpan = document.getElementById('typewriter');
  const roles = [
    "Data Science.", 
    "Machine Learning.", 
    "Generative AI.", 
    "Web Development.",
    "Full-Stack Python."
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting character
      typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      // Adding character
      typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // standard typing speed
    }

    // Word completely typed
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1500; // pause at end of word
    } 
    // Word completely deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typewriter loop
  if (typewriterSpan) {
    type();
  }

  // ==========================================
  // 5. SCROLL SPY & TIMELINE SCROLL FADE-IN
  // ==========================================
  const sections = document.querySelectorAll('section');
  const scrollSpyOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -25% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, scrollSpyOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Timeline visual entry animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target); // Animates once
      }
    });
  }, timelineOptions);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // ==========================================
  // 6. CONTACT FORM HANDLING WITH TOAST TONGUE
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();
      const subjectVal = document.getElementById('form-subject').value.trim();
      const messageVal = document.getElementById('form-message').value.trim();

      if (!nameVal || !emailVal || !subjectVal || !messageVal) {
        showToast("Please fill in all details.", "error");
        return;
      }

      // Simple mock successful submission
      showToast("Thank you, " + nameVal + "! Your message was sent.");
      contactForm.reset();
    });
  }

  function showToast(message, type = "success") {
    toastText.textContent = message;
    
    // Change background styling for error context
    if (type === "error") {
      toast.style.borderColor = "var(--color-pink)";
      toast.querySelector('.toast-icon').textContent = "✕";
      toast.querySelector('.toast-icon').style.background = "rgba(244, 63, 94, 0.1)";
      toast.querySelector('.toast-icon').style.color = "var(--color-pink)";
    } else {
      toast.style.borderColor = "var(--border-medium)";
      toast.querySelector('.toast-icon').textContent = "✓";
      toast.querySelector('.toast-icon').style.background = "rgba(16, 185, 129, 0.1)";
      toast.querySelector('.toast-icon').style.color = "var(--color-green)";
    }

    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});
