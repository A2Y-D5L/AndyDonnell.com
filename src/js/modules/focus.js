/**
 * Focus Manager - Handles keyboard navigation and focus states
 * Provides polished focus management for mouse vs keyboard users
 */
export class FocusManager {
  constructor() {
    this.mouseDown = false;
    
    this.init();
  }

  init() {
    this.setupMouseTraking();
    this.setupFocusPolish();
  }

  setupMouseTraking() {
    document.addEventListener('mousedown', () => {
      this.mouseDown = true;
    });

    document.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });
  }

  setupFocusPolish() {
    // Remove outline for mouse-initiated focus
    document.addEventListener('focusin', (e) => {
      if (this.mouseDown) {
        e.target.classList.add('outline-none');
      }
    });

    // Always remove outline-none class on focus out
    // This ensures keyboard navigation always shows focus
    document.addEventListener('focusout', (e) => {
      e.target.classList.remove('outline-none');
    });

    // Handle escape key to blur active element
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.activeElement && 
          document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    });
  }

  // Utility method to ensure keyboard focus is visible
  ensureKeyboardFocusVisible(element) {
    if (!this.mouseDown) {
      element.classList.remove('outline-none');
    }
  }

  // Utility method to focus an element after a delay
  focusAfterDelay(element, delay = 100) {
    setTimeout(() => {
      element.focus();
      this.ensureKeyboardFocusVisible(element);
    }, delay);
  }

  destroy() {
    // Event listeners would be cleaned up when the document is unloaded
    // In a SPA, you'd want to explicitly remove these listeners
  }
}
