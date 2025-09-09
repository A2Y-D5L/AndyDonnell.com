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
      console.log('🚀 App init starting...');
      
      // Phase 1: Initialize animation controller FIRST to hide elements before content loads
      console.log('🎬 Initializing animation controller...');
      this.controllers.set('animations', new AnimationController());
      console.log('✅ Animation controller initialized');
      
      // Phase 2: Load content after animations are set up
      console.log('🚀 Loading content...');
      try {
        const contentLoader = new ContentLoader();
        this.controllers.set('contentLoader', contentLoader);
        console.log('✅ ContentLoader created and initialized');
      } catch (contentError) {
        console.error('❌ ContentLoader failed:', contentError);
        console.error('Stack trace:', contentError.stack);
        throw contentError;
      }
      
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
    // Initialize content-independent controllers immediately
    console.log('🎨 Initializing theme controller...');
    this.controllers.set('theme', new ThemeController());
    console.log('✅ Theme controller initialized');

    console.log('🧭 Initializing scrollspy controller...');
    this.controllers.set('scrollspy', new ScrollspyController());
    console.log('✅ Scrollspy controller initialized');

    console.log('⌨️ Initializing command palette...');
    this.controllers.set('commandPalette', new CommandPalette());
    console.log('✅ Command palette initialized');

    console.log('🎯 Initializing focus manager...');
    this.controllers.set('focus', new FocusManager());
    console.log('✅ Focus manager initialized');

    // Initialize content-dependent controllers after content loads
    document.addEventListener('content:loaded', () => {
      console.log('💼 Initializing project controller after content load...');
      this.controllers.set('projects', new ProjectController());
      console.log('✅ Project controller initialized');
      
      console.log('🎉 All controllers initialized');
    });
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
