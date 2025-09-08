/**
 * Project Controller - Manages project filtering, search, and sorting
 * Handles tag-based filtering with robust date handling
 */
export class ProjectController {
  constructor() {
    this.grid = document.getElementById('proj-grid');
    this.searchInput = document.getElementById('proj-search');
    this.sortSelect = document.getElementById('proj-sort');
    this.chips = Array.from(document.querySelectorAll('.chip[data-chip]'));
    this.cards = [];
    this.activeFilters = new Set(['all']);
    
    this.init();
  }

  init() {
    if (!this.grid) return; // Projects section might not be present
    
    this.cards = Array.from(this.grid.querySelectorAll('.project-card'));
    this.preprocessCards();
    this.setupEventListeners();
    this.render();
  }

  preprocessCards() {
    // Precompute timestamps to avoid cross-browser Date parsing issues
    this.cards.forEach(card => {
      const isoDate = (card.dataset.updated || '').trim();
      const timestamp = Date.parse(isoDate);
      
      if (!Number.isNaN(timestamp)) {
        card.dataset.updatedTs = String(timestamp);
      }
    });
  }

  setupEventListeners() {
    // Filter chips
    this.chips.forEach(chip => {
      chip.addEventListener('click', () => this.handleFilterClick(chip));
    });

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.render());
    }

    // Sort select
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => this.render());
    }
  }

  handleFilterClick(chip) {
    const tag = chip.dataset.chip;
    
    if (tag === 'all') {
      this.activeFilters.clear();
      this.activeFilters.add('all');
    } else {
      // Remove 'all' if it exists
      if (this.activeFilters.has('all')) {
        this.activeFilters.delete('all');
      }
      
      // Toggle the clicked filter
      if (this.activeFilters.has(tag)) {
        this.activeFilters.delete(tag);
      } else {
        this.activeFilters.add(tag);
      }
      
      // If no filters remain, reset to 'all'
      if (this.activeFilters.size === 0) {
        this.activeFilters.add('all');
      }
    }
    
    this.updateChipStates();
    this.render();
  }

  updateChipStates() {
    this.chips.forEach(chip => {
      const isActive = this.activeFilters.has('all') ? 
        chip.dataset.chip === 'all' : 
        this.activeFilters.has(chip.dataset.chip);
      
      chip.classList.toggle('active', isActive);
    });
  }

  matchesTags(card) {
    if (this.activeFilters.has('all')) return true;
    
    const cardTags = (card.dataset.tags || '').split(/\s+/);
    
    // Check if ALL active filters are present in card tags
    for (const filter of this.activeFilters) {
      if (!cardTags.includes(filter)) {
        return false;
      }
    }
    
    return true;
  }

  matchesSearch(card) {
    const query = this.normalizeString(this.searchInput?.value || '');
    if (!query) return true;
    
    const title = this.normalizeString(card.dataset.title || '');
    return title.includes(query);
  }

  normalizeString(str) {
    return (str || '').toLowerCase().trim();
  }

  sortCards(cards) {
    const sortMode = this.sortSelect?.value || 'featured';
    
    const sortFunctions = {
      alpha: (a, b) => (a.dataset.title || '').localeCompare(b.dataset.title || ''),
      recent: (a, b) => this.getTimestamp(b) - this.getTimestamp(a),
      featured: (a, b) => {
        const featuredDiff = (+b.dataset.featured || 0) - (+a.dataset.featured || 0);
        return featuredDiff !== 0 ? featuredDiff : this.getTimestamp(b) - this.getTimestamp(a);
      }
    };
    
    return cards.sort(sortFunctions[sortMode] || sortFunctions.featured);
  }

  getTimestamp(card) {
    return Number(card.dataset.updatedTs || 0);
  }

  render() {
    const visibleCards = this.cards.filter(card => 
      this.matchesTags(card) && this.matchesSearch(card)
    );
    
    const hiddenCards = this.cards.filter(card => !visibleCards.includes(card));
    
    // Sort visible cards
    this.sortCards(visibleCards);
    
    // Re-append cards to maintain order
    const fragment = document.createDocumentFragment();
    visibleCards.forEach(card => fragment.appendChild(card));
    hiddenCards.forEach(card => fragment.appendChild(card));
    this.grid.appendChild(fragment);
    
    // Update visibility classes
    visibleCards.forEach(card => {
      card.classList.remove('hidden', 'opacity-30', 'pointer-events-none');
    });
    
    hiddenCards.forEach(card => {
      card.classList.add('hidden', 'opacity-30', 'pointer-events-none');
    });
    
    // Announce changes to screen readers
    this.announceResults(visibleCards.length);
  }

  announceResults(count) {
    // Create or update screen reader announcement
    let announcement = document.getElementById('projects-announcement');
    if (!announcement) {
      announcement = document.createElement('div');
      announcement.id = 'projects-announcement';
      announcement.className = 'sr-only';
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      this.grid.parentElement.appendChild(announcement);
    }
    
    announcement.textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
  }

  destroy() {
    // Remove event listeners would be handled by removing elements
    // In a real app, you'd want to explicitly remove them
    this.activeFilters.clear();
    this.cards = [];
  }
}
