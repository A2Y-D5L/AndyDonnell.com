// Main application entry point
import { ContentLoader } from './modules/content-loader.js';
import { ThemeController } from './modules/theme.js';
import { AnimationController } from './modules/animations.js';
import { ScrollspyController } from './modules/scrollspy.js';
import { ProjectController } from './modules/projects.js';
import { CommandPalette } from './modules/command-palette.js';
import { FocusManager } from './modules/focus.js';

class App {
  constructor() {
    this.controllers = new Map();
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initControllers());
    } else {
      this.initControllers();
    }
  }

  initControllers() {
    try {
      // Remove no-js class to indicate JavaScript is working
      document.body.classList.remove('no-js');
      
      // Phase 1: Initialize animation controller FIRST to hide elements before content loads
      console.log('🎬 Initializing animation controller...');
      this.controllers.set('animations', new AnimationController());
      console.log('✅ Animation controller initialized');
      
      // Phase 2: Load content after animations are set up
      console.log('🚀 Loading content...');
      const contentLoader = new ContentLoader();
      this.controllers.set('contentLoader', contentLoader);
      
      // Listen for content loaded event to refresh animations
      document.addEventListener('content:loaded', () => {
        const animationController = this.controllers.get('animations');
        if (animationController && typeof animationController.refresh === 'function') {
          console.log('🔄 Refreshing animations after content load...');
          animationController.refresh();
        }
      });
      
      // Phase 3: Initialize other interactive controllers with small delay
      console.log('🎨 Initializing other controllers...');
      this.initInteractiveControllers();

      console.log('✅ App initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
    }
  }

  initInteractiveControllers() {
    // Add a small delay to ensure DOM content has been populated
    setTimeout(() => {
      // Initialize theme controller (independent of content)
      console.log('🎨 Initializing theme controller...');
      this.controllers.set('theme', new ThemeController());
      console.log('✅ Theme controller initialized');

      // Initialize scrollspy controller  
      console.log('🧭 Initializing scrollspy controller...');
      this.controllers.set('scrollspy', new ScrollspyController());
      console.log('✅ Scrollspy controller initialized');

      // Initialize project controller (depends on project DOM elements)
      console.log('💼 Initializing project controller...');
      this.controllers.set('projects', new ProjectController());
      console.log('✅ Project controller initialized');

      // Initialize command palette
      console.log('⌨️ Initializing command palette...');
      this.controllers.set('commandPalette', new CommandPalette());
      console.log('✅ Command palette initialized');

      // Initialize focus manager
      console.log('🎯 Initializing focus manager...');
      this.controllers.set('focus', new FocusManager());
      console.log('✅ Focus manager initialized');

      console.log('🎉 All interactive controllers initialized');
    }, 50); // Small delay to ensure content is loaded
  }

  // Cleanup method for destroying controllers
  destroy() {
    console.log('🧹 Cleaning up app controllers...');
    this.controllers.forEach((controller, name) => {
      if (controller && typeof controller.destroy === 'function') {
        controller.destroy();
        console.log(`✅ ${name} controller cleaned up`);
      }
    });
    this.controllers.clear();
  }
}

// Initialize app when module loads
const app = new App();

// Expose app globally for debugging
window.__app = app;

export default app;
