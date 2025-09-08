/**
 * Scrollspy Controller - Manages navigation active states based on scroll position
 * Provides robust section tracking with fallbacks
 */
export class ScrollspyController {
  constructor() {
    this.sections = ['about', 'projects', 'blog', 'contact'];
    this.navMap = new Map();
    this.ratioMap = new Map();
    this.observer = null;
    
    this.init();
  }

  init() {
    // Build navigation map
    this.sections.forEach(id => {
      const navElement = document.querySelector(`[data-nav="${id}"]`);
      if (navElement) {
        this.navMap.set(id, navElement);
      }
    });

    this.setupIntersectionObserver();
    this.setupEventListeners();
    
    // Set initial active state
    this.setInitialActiveState();
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.ratioMap.set(entry.target.id, entry.intersectionRatio);
        });
        
        this.updateActiveState();
      }, { 
        rootMargin: '-40% 0px -50% 0px', 
        threshold: [0.01, 0.25, 0.5, 0.75, 1] 
      });

      this.sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          this.observer.observe(element);
        }
      });
    }
  }

  setupEventListeners() {
    // Handle hash changes
    window.addEventListener('hashchange', () => {
      const hash = (location.hash || '').replace('#', '');
      if (this.sections.includes(hash)) {
        this.setActive(hash);
      }
    });

    // Fallback scroll listener for safety
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        this.updateActiveState();
        ticking = false;
      });
    }, { passive: true });
  }

  updateActiveState() {
    // Find section with highest intersection ratio
    let bestId = null;
    let bestRatio = 0;
    
    this.ratioMap.forEach((ratio, id) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });

    if (bestRatio > 0) {
      this.setActive(bestId);
    } else {
      // Fallback: find closest section to viewport center
      const closestId = this.getClosestSectionByViewport();
      if (closestId) {
        this.setActive(closestId);
      }
    }
  }

  getClosestSectionByViewport() {
    const center = window.innerHeight * 0.33;
    let best = { id: null, distance: Infinity };
    
    this.sections.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top - center);
      
      if (distance < best.distance) {
        best = { id, distance };
      }
    });
    
    return best.id;
  }

  setActive(id) {
    // Clear all active states
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.classList.remove('nav-active');
      link.removeAttribute('aria-current');
    });

    // Set new active state
    const activeLink = this.navMap.get(id);
    if (activeLink) {
      activeLink.classList.add('nav-active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  setInitialActiveState() {
    const hash = (location.hash || '').replace('#', '');
    const initialSection = this.sections.includes(hash) ? 
      hash : (this.getClosestSectionByViewport() || this.sections[0]);
    
    this.setActive(initialSection);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    this.navMap.clear();
    this.ratioMap.clear();
  }
}
