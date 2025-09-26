document.addEventListener("DOMContentLoaded", () => {
  // Progress bar animations
  const progressBars = document.querySelectorAll(".progress-bar");

  function animateBars() {
    progressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      const rect = bar.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight - 100) {
        bar.style.width = "100%";
        bar.style.transition = "width 1s ease-in-out";
        bar.style.setProperty("--progress", percent + "%");
        bar.style.setProperty("width", percent + "%");
      }
    });
  }

  // Fade-in sections on scroll
  const fadeInSections = document.querySelectorAll(".fade-in-section");
  
  function checkFadeIn() {
    fadeInSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });
  }

  // Back to top button functionality
  const backToTopBtn = document.getElementById("backToTop");
  
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Navigation bar scroll effect
  const nav = document.querySelector("nav");
  
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Professional typing animation (plays once on page load)
  const typingElements = document.querySelectorAll('.typing-animation');
  
  function initializeTypingAnimation() {
    typingElements.forEach(element => {
      // Add the animate class after a short delay for better effect
      setTimeout(() => {
        element.classList.add('animate');
      }, 300);
    });
  }

  // Initialize typing animation on page load
  initializeTypingAnimation();

  // Enhanced hover effects for portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add loading animation to page
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // Event listeners
  window.addEventListener("scroll", () => {
    animateBars();
    checkFadeIn();
    toggleBackToTop();
    handleNavScroll();
  });

  // Initial checks
  checkFadeIn();
  toggleBackToTop();
  handleNavScroll();

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
    
    if (e.key === 'Home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (e.key === 'End') {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });

  // Contact Form Functionality
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Initialize EmailJS (Replace with your actual public key)
  emailjs.init("0kMjDT_V4F4iHI23U");

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      submitBtn.classList.add('loading');
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value || 'Portfolio Contact',
        message: document.getElementById('message').value
      };

      // Send email using EmailJS
      emailjs.send('service_ofl0lsh', 'template_jtljfrfl', formData)
        .then(function() {
          // Success
          submitBtn.classList.remove('loading');
          contactForm.style.display = 'none';
          successMessage.classList.add('show');
          
          // Reset form after 3 seconds
          setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.classList.remove('show');
          }, 3000);
          
        }, function(error) {
          // Error
          console.error('EmailJS error:', error);
          submitBtn.classList.remove('loading');
          errorMessage.classList.add('show');
          
          // Hide error message after 3 seconds
          setTimeout(() => {
            errorMessage.classList.remove('show');
          }, 3000);
        });
    });
  }

  // Form validation enhancement
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  });
});
