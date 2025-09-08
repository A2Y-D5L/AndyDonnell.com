/**
 * Animation Controller - Manages scroll-reveal and magnetic hover effects
 * Respects user's motion preferences and provides fallbacks
 */
export class AnimationController {
  constructor() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observers = [];
    
    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupMagneticHover();
  }

  // Method to refresh animations after content is dynamically loaded
  refresh() {
    // Clean up existing observers first
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    // Re-setup with new elements
    this.setupScrollReveal();
    this.setupMagneticHover();
  }

  setupScrollReveal() {
    const elements = document.querySelectorAll('[data-animate="fade-up"]:not(.animated)');
    
    if (!this.reduceMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            
            // Skip if already animated
            if (el.classList.contains('animated')) return;
            
            const delay = parseInt(el.getAttribute('data-animate-delay') || '0', 10);
            
            setTimeout(() => {
              // Override CSS with inline styles for reliable animation
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              el.classList.add('animated');
            }, delay);
            
            observer.unobserve(el);
          }
        });
      }, { 
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.1 
      });

      elements.forEach((el) => {
        // Ensure Tailwind classes are available for other effects
        el.classList.add('opacity-100', 'translate-y-0');
        el.classList.remove('opacity-100', 'translate-y-0');
        observer.observe(el);
      });

      this.observers.push(observer);
    } else {
      // Fallback: show all elements immediately
      elements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.classList.add('animated');
      });
    }
  }

  setupMagneticHover() {
    if (this.reduceMotion) return;

    const hoverables = document.querySelectorAll('article.project-card:not(.magnet), a.inline-flex:not(.magnet)');
    
    hoverables.forEach((el) => {
      el.classList.add('magnet');
      
      const onMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        el.style.setProperty('--tx', `${x * 2}px`);
        el.style.setProperty('--ty', `${y * 2}px`);
      };

      const onMouseLeave = () => {
        el.style.removeProperty('--tx');
        el.style.removeProperty('--ty');
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
      
      // Store references for cleanup
      el._magneticHandlers = { onMouseMove, onMouseLeave };
    });
  }

  destroy() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Clean up magnetic hover listeners
    document.querySelectorAll('.magnet').forEach(el => {
      if (el._magneticHandlers) {
        el.removeEventListener('mousemove', el._magneticHandlers.onMouseMove);
        el.removeEventListener('mouseleave', el._magneticHandlers.onMouseLeave);
        delete el._magneticHandlers;
      }
    });
  }
}
