/**
 * Content Loader - Populates HTML with data from configuration
 * Handles dynamic content injection for the modular architecture
 */
import { siteConfig } from '../../data/site-config.js';
import { content } from '../../data/content.js';
import { projects } from '../../data/projects.js';
import { blogPosts } from '../../data/blog-posts.js';
import { navigation } from '../../data/navigation.js';
import { TemplateRenderer } from '../utils/template-renderer.js';

export class ContentLoader {
  constructor() {
    console.log('🎯 ContentLoader initializing...');
    try {
      console.log('📦 Creating TemplateRenderer...');
      this.renderer = new TemplateRenderer();
      console.log('✅ TemplateRenderer created');
      
      console.log('🚀 Starting init...');
      this.init();
    } catch (error) {
      console.error('❌ ContentLoader constructor failed:', error);
      throw error;
    }
  }

  init() {
    try {
      console.log('📝 Loading navigation...');
      this.loadNavigation();
      
      console.log('🎭 Loading hero content...');
      this.loadHeroContent();
      
      console.log('🏠 Loading about content...');
      this.loadAboutContent();
      
      console.log('⚡ Loading skills...');
      this.loadSkills();
      
      console.log('🔗 Loading social links...');
      this.loadSocialLinks();
      
      console.log('💼 Loading projects...');
      this.loadProjects();
      
      console.log('📚 Loading blog posts...');
      this.loadBlog();
      
      console.log('📞 Loading contact content...');
      this.loadContactContent();
      
      console.log('📋 Setting up metadata...');
      this.setupMetadata();
      
      console.log('✅ All content loaded successfully');
      
      // Add visual confirmation that content loaded
      document.body.setAttribute('data-content-loaded', 'true');
      
      // Dispatch event to signal content is ready for animations
      document.dispatchEvent(new CustomEvent('content:loaded'));
      
    } catch (error) {
      console.error('❌ Failed to load content:', error);
      
      // Add visual indicator of failure
      document.body.setAttribute('data-content-loaded', 'false');
      document.body.setAttribute('data-content-error', error.message);
      
      throw error;
    }
  }

  loadNavigation() {
    const navContainer = document.getElementById('primary-nav');
    if (!navContainer) return;

    const navHTML = navigation.primary.map(item => 
      `<li><a data-nav="${item.id}" href="${item.href}" class="text-neutral-700 hover:text-neutral-900 link-underline">${item.label}</a></li>`
    ).join('');

    navContainer.innerHTML = navHTML;
  }

  loadHeroContent() {
    try {
      const nameEl = document.getElementById('hero-name');
      const taglineEl = document.getElementById('hero-tagline');
      const brandNameEl = document.getElementById('brand-name');

      if (nameEl) nameEl.textContent = content.hero.name;
      if (taglineEl) taglineEl.textContent = content.hero.headline;
      if (brandNameEl) brandNameEl.textContent = content.brand.name;
      
      console.log('✅ Hero content loaded');
    } catch (error) {
      console.error('❌ Failed to load hero content:', error);
    }
  }

  loadAboutContent() {
    const aboutContainer = document.getElementById('about-content');
    if (!aboutContainer) return;

    const aboutHTML = content.about.paragraphs.map(paragraph => 
      `<p class="mt-4 text-neutral-700 leading-7">${paragraph}</p>`
    ).join('');

    aboutContainer.innerHTML = aboutHTML;
  }

  loadSkills() {
    const skillsContainer = document.getElementById('skills-list');
    if (!skillsContainer) return;

    const skillsHTML = this.renderer.renderSkillsList();
    skillsContainer.innerHTML = skillsHTML;
  }

  loadSocialLinks() {
    const socialContainer = document.getElementById('social-links');
    if (!socialContainer) {
      console.log('ℹ️ Social links container not found - skipping (might be hardcoded)');
      return;
    }

    try {
      const socialHTML = this.renderer.renderSocialLinks();
      socialContainer.innerHTML = socialHTML;
      console.log('✅ Social links loaded');
    } catch (error) {
      console.error('❌ Failed to load social links:', error);
    }
  }

  loadProjects() {
    const projectsContainer = document.getElementById('proj-grid');
    const filtersContainer = document.getElementById('filter-chips');
    const projectsTitle = document.getElementById('projects-title');
    
    if (!projectsContainer) {
      console.warn('⚠️ Projects container not found');
      return;
    }

    try {
      // Update section title
      if (projectsTitle) {
        projectsTitle.textContent = content.projects.title;
      }

      // Load project cards
      const projectsHTML = projects.map((project, index) =>
        this.renderer.renderProjectCard(project, index * 80)
      ).join('');

      projectsContainer.innerHTML = projectsHTML;
      console.log('✅ Project cards loaded');

      // Load filter chips
      if (filtersContainer) {
        const filtersHTML = this.renderer.renderFilterChips();
        filtersContainer.innerHTML = filtersHTML;
        console.log('✅ Filter chips loaded');
      } else {
        console.warn('⚠️ Filter chips container not found');
      }
    } catch (error) {
      console.error('❌ Failed to load projects:', error);
    }
  }

  loadBlog() {
    const blogContainer = document.getElementById('blog-posts');
    const blogTitle = document.getElementById('blog-title');
    
    if (!blogContainer) {
      console.warn('⚠️ Blog container not found');
      return;
    }

    try {
      // Update section title
      if (blogTitle) {
        blogTitle.textContent = content.blog.title;
      }

      const blogHTML = blogPosts.map((post, index) => 
        this.renderer.renderBlogCard(post, index * 80)
      ).join('');

      blogContainer.innerHTML = blogHTML;
      console.log('✅ Blog posts loaded');
    } catch (error) {
      console.error('❌ Failed to load blog posts:', error);
    }
  }

  loadContactContent() {
    const descriptionEl = document.getElementById('contact-description');
    const linksContainer = document.getElementById('contact-links');

    if (descriptionEl) {
      descriptionEl.textContent = content.contact.description;
    }

    if (linksContainer) {
      const contactHTML = `
        <a href="${content.contact.cta.emailHref}"
           class="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-900 px-4 py-2 text-sm transition-all duration-150 hover:bg-neutral-50 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-600/30 active:translate-y-0 magnet">
          ${content.contact.cta.email}
        </a>
        <a href="${content.contact.cta.linkedinHref}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-900 px-4 py-2 text-sm transition-all duration-150 hover:bg-neutral-50 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-600/30 active:translate-y-0 magnet">
          ${content.contact.cta.linkedin}
        </a>
        <a href="${content.contact.cta.githubHref}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-900 px-4 py-2 text-sm transition-all duration-150 hover:bg-neutral-50 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-600/30 active:translate-y-0 magnet">
          ${content.contact.cta.github}
        </a>
      `;
      linksContainer.innerHTML = contactHTML;
    }
  }

  setupMetadata() {
    // Update document title and meta description
    document.title = content.meta.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = content.meta.description;
  }
}
