/**
 * Theme Controller - Manages adaptive theming system
 * Handles light/dark mode switching and accent color variations
 */
export class ThemeController {
  constructor() {
    this.root = document.documentElement;
    this.THEME_KEY = 'theme-preference';
    this.ACCENT_KEY = 'accent-preference';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  init() {
    // Initialize from storage or defaults
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 
                      this.root.getAttribute('data-theme') || 'system';
    const savedAccent = localStorage.getItem(this.ACCENT_KEY) || 
                       this.root.getAttribute('data-accent') || 'default';
    
    this.applyTheme(savedTheme);
    this.applyAccent(savedAccent);
    
    // Listen for system preference changes
    this.mediaQuery.addEventListener('change', () => {
      const currentTheme = localStorage.getItem(this.THEME_KEY) || 'system';
      if (currentTheme === 'system') {
        this.applyTheme('system');
      }
    });
    
    // Setup theme menu if present
    this.setupThemeMenu();
    
    // Expose methods globally
    window.setTheme = this.setTheme.bind(this);
    window.setAccent = this.setAccent.bind(this);
  }

  applyTheme(mode) {
    const effective = (mode === 'system') ? 
      (this.mediaQuery.matches ? 'dark' : 'light') : mode;
    
    this.root.setAttribute('data-theme', mode);
    this.root.dataset.themeEffective = effective;
  }

  applyAccent(name) {
    this.root.setAttribute('data-accent', name || 'default');
  }

  setTheme(mode) {
    localStorage.setItem(this.THEME_KEY, mode);
    this.applyTheme(mode);
  }

  setAccent(name) {
    localStorage.setItem(this.ACCENT_KEY, name || 'default');
    this.applyAccent(name || 'default');
  }

  setupThemeMenu() {
    const btn = document.getElementById('theme-menu-button');
    const menu = document.getElementById('theme-menu');
    
    if (!btn || !menu) return;

    let menuOpen = false;
    let lastFocus = null;

    const getMenuItems = () => menu.querySelectorAll('[role="menuitem"]');
    
    const open = () => {
      if (menuOpen) return;
      lastFocus = document.activeElement;
      menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      menuOpen = true;
      menu.focus();
      document.addEventListener('keydown', onKeydown, true);
      document.addEventListener('click', onDocClick, true);
    };

    const close = () => {
      if (!menuOpen) return;
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      menuOpen = false;
      document.removeEventListener('keydown', onKeydown, true);
      document.removeEventListener('click', onDocClick, true);
      (lastFocus || btn).focus();
    };

    const onKeydown = (e) => {
      if (!menuOpen) return;
      const items = Array.from(getMenuItems());
      const currentIndex = items.indexOf(document.activeElement);
      
      switch (e.key) {
        case 'Escape':
          e.stopPropagation();
          e.preventDefault();
          close();
          break;
        case 'ArrowDown':
          e.preventDefault();
          (items[(currentIndex + 1 + items.length) % items.length] || menu).focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          (items[(currentIndex - 1 + items.length) % items.length] || menu).focus();
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            (items[(currentIndex - 1 + items.length) % items.length] || items[0]).focus();
          } else {
            (items[(currentIndex + 1 + items.length) % items.length] || items[0]).focus();
          }
          break;
      }
    };

    const onDocClick = (e) => {
      if (!menu.contains(e.target) && e.target !== btn) close();
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.contains('hidden') ? open() : close();
    });

    getMenuItems().forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.setTheme) this.setTheme(el.dataset.setTheme);
        if (el.dataset.setAccent) this.setAccent(el.dataset.setAccent);
        close();
      });
    });
  }

  destroy() {
    this.mediaQuery.removeEventListener('change', this.handleMediaQueryChange);
    delete window.setTheme;
    delete window.setAccent;
  }
}
