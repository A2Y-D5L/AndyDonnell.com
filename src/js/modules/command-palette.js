/**
 * Command Palette - Accessible search interface for site navigation
 * Supports keyboard navigation, focus trapping, and fuzzy search
 */
export class CommandPalette {
  constructor() {
    this.palette = document.getElementById('cmdk');
    this.backdrop = document.getElementById('cmdk-backdrop');
    this.input = document.getElementById('cmdk-input');
    this.list = document.getElementById('cmdk-list');
    this.isOpen = false;
    this.activeIndex = -1;
    this.previouslyFocused = null;
    this.searchIndex = [];
    
    this.init();
  }

  init() {
    if (!this.palette) return; // Command palette might not be present
    
    this.buildSearchIndex();
    this.setupEventListeners();
  }

  buildSearchIndex() {
    const items = [];
    
    // Add sections
    document.querySelectorAll('section[id]').forEach(section => {
      const id = section.id;
      const title = section.querySelector('h2')?.textContent?.trim() || id;
      items.push({
        label: `Section — ${title}`,
        url: `#${id}`,
        type: 'section'
      });
    });
    
    // Add navigation links
    document.querySelectorAll('header [data-nav]').forEach(link => {
      items.push({
        label: `Nav — ${link.textContent.trim()}`,
        url: link.getAttribute('href'),
        type: 'nav'
      });
    });
    
    // Add project cards
    document.querySelectorAll('.project-card').forEach(card => {
      const title = card.dataset.title || 'Untitled Project';
      const tags = (card.dataset.tags || '').split(/\s+/);
      
      items.push({
        label: `Project — ${title}`,
        url: '#projects',
        type: 'project',
        element: card,
        tags: tags
      });
    });
    
    // Add theme actions
    const themeActions = [
      { label: 'Theme — Toggle Light', type: 'action', action: () => window.setTheme('light') },
      { label: 'Theme — Toggle Dark', type: 'action', action: () => window.setTheme('dark') },
      { label: 'Theme — Use System', type: 'action', action: () => window.setTheme('system') },
      { label: 'Accent — Blue', type: 'action', action: () => window.setAccent('default') },
      { label: 'Accent — Green', type: 'action', action: () => window.setAccent('green') },
      { label: 'Accent — Amber', type: 'action', action: () => window.setAccent('amber') },
      { label: 'Accent — Purple', type: 'action', action: () => window.setAccent('purple') }
    ];
    
    items.push(...themeActions);
    this.searchIndex = items;
  }

  setupEventListeners() {
    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.open();
      }
      
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
      
      if (this.isOpen) {
        this.handlePaletteKeydown(e);
      }
    });
    
    // Backdrop click to close
    this.backdrop?.addEventListener('click', () => this.close());
    
    // Input changes
    this.input?.addEventListener('input', (e) => this.render(e.target.value));
  }

  handlePaletteKeydown(e) {
    const listItems = this.list.querySelectorAll('[role="option"]');
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.activeIndex = Math.min(this.activeIndex + 1, listItems.length - 1);
        this.highlight();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        this.highlight();
        break;
        
      case 'Enter':
        e.preventDefault();
        if (this.activeIndex >= 0 && listItems[this.activeIndex]) {
          listItems[this.activeIndex].click();
        }
        break;
        
      case 'Tab':
        e.preventDefault();
        this.trapFocus(e);
        break;
    }
  }

  trapFocus(e) {
    const tabbableElements = this.palette.querySelectorAll(
      'input, button, [href], select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!tabbableElements.length) return;
    
    const first = tabbableElements[0];
    const last = tabbableElements[tabbableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
    }
  }

  open() {
    if (this.isOpen) return;
    
    this.previouslyFocused = document.activeElement;
    this.isOpen = true;
    
    // Show elements
    this.backdrop.classList.remove('pointer-events-none');
    this.palette.classList.remove('pointer-events-none');
    
    requestAnimationFrame(() => {
      this.backdrop.classList.add('opacity-100');
      this.palette.classList.add('opacity-100');
    });
    
    // Focus and setup
    this.input.value = '';
    this.render('');
    this.input.focus();
    
    // Enable focus trap
    document.addEventListener('keydown', this.trapFocusHandler, true);
  }

  close() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    
    // Hide elements
    this.backdrop.classList.remove('opacity-100');
    this.palette.classList.remove('opacity-100');
    
    setTimeout(() => {
      this.backdrop.classList.add('pointer-events-none');
      this.palette.classList.add('pointer-events-none');
      
      // Restore focus
      if (this.previouslyFocused) {
        this.previouslyFocused.focus();
      }
      
      // Disable focus trap
      document.removeEventListener('keydown', this.trapFocusHandler, true);
    }, 150);
  }

  render(query) {
    const normalizedQuery = this.normalizeString(query);
    const results = this.search(normalizedQuery).slice(0, 20);
    
    // Clear list
    this.list.innerHTML = '';
    
    // Add results
    results.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'p-2 cursor-pointer flex items-center justify-between bg-transparent hover:bg-neutral-100';
      li.setAttribute('role', 'option');
      li.id = `cmdk-opt-${index}`;
      li.dataset.index = index;
      
      li.innerHTML = `
        <span class="text-neutral-900">${item.label}</span>
        <span class="text-[11px] text-neutral-500">${item.type}</span>
      `;
      
      li.addEventListener('click', () => this.activate(item));
      this.list.appendChild(li);
    });
    
    // Reset active index
    this.activeIndex = results.length > 0 ? 0 : -1;
    this.highlight();
  }

  search(query) {
    return this.searchIndex
      .map(item => ({
        item,
        score: this.calculateScore(query, item)
      }))
      .filter(result => result.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.item);
  }

  calculateScore(query, item) {
    const normalizedLabel = this.normalizeString(item.label);
    const labelIndex = normalizedLabel.indexOf(query);
    
    if (labelIndex < 0 && query.length > 0) return -1;
    if (!query.length) return 1;
    
    let score = (100 - labelIndex) + Math.min(query.length, normalizedLabel.length);
    
    // Boost score for tag matches
    if (item.tags && item.tags.some(tag => 
      this.normalizeString(tag).includes(query)
    )) {
      score += 10;
    }
    
    return score;
  }

  highlight() {
    const items = this.list.querySelectorAll('[role="option"]');
    
    items.forEach((li, index) => {
      li.classList.toggle('bg-neutral-100', index === this.activeIndex);
    });
    
    const activeItem = items[this.activeIndex];
    this.input.setAttribute(
      'aria-activedescendant', 
      activeItem ? activeItem.id : ''
    );
    
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }

  activate(item) {
    this.close();
    
    if (item.action) {
      return item.action();
    }
    
    if (item.element) {
      item.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      item.element.classList.add('ring', 'ring-accent-300');
      setTimeout(() => {
        item.element.classList.remove('ring', 'ring-accent-300');
      }, 800);
    }
    
    if (item.url) {
      location.href = item.url;
    }
  }

  normalizeString(str) {
    return (str || '').toLowerCase().trim();
  }

  destroy() {
    this.searchIndex = [];
    document.removeEventListener('keydown', this.trapFocusHandler, true);
  }
}

// Expose command palette globally for debugging
window.__cmdPalette = null;
