// Simple template renderer for generating HTML from data
import { siteConfig } from '../../data/site-config.js';
import { content } from '../../data/content.js';
import { projects } from '../../data/projects.js';
import { blogPosts } from '../../data/blog-posts.js';
import { navigation } from '../../data/navigation.js';

export class TemplateRenderer {
  constructor() {
    this.data = {
      site: siteConfig,
      content,
      projects,
      blog: blogPosts,
      navigation
    };
  }

  // Render project card HTML
  renderProjectCard(project, delay = 0) {
    const badgeHTML = project.tags.map(tag => 
      `<li class="badge">${this.capitalize(tag)}</li>`
    ).join('');

    const linksHTML = Object.entries(project.links).map(([key, url]) => 
      `<a href="${url}" class="text-sm text-accent-600 hover:text-accent-700 link-underline">${this.formatLinkLabel(key)}</a>`
    ).join('');

    return `
      <article class="project-card group rounded-lg border border-neutral-200 bg-white p-0 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg opacity-0 translate-y-3 will-change-transform magnet"
               data-animate="fade-up" 
               data-animate-delay="${delay}"
               data-tags="${project.tags.join(' ')}"
               data-title="${project.title}"
               data-updated="${project.updated}"
               data-featured="${project.featured ? '1' : '0'}">
        <figure class="relative">
          ${this.renderProjectThumbnail(project)}
          ${project.featured ? '<span class="absolute left-3 top-3 rounded-full bg-neutral-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-50">Featured</span>' : ''}
        </figure>
        <div class="p-5">
          <h3 class="font-mono text-[15px] text-neutral-900">${project.id}/<span class="text-neutral-500">${this.getFileExtension(project)}</span></h3>
          <div class="mt-1 flex items-center gap-3 text-xs text-neutral-500">
            <span>Updated: ${this.formatDate(project.updated)}</span><span aria-hidden="true">•</span><span>${this.getProjectMetadata(project)}</span>
          </div>
          <p class="mt-2 text-sm text-neutral-700">${project.description}</p>
          <ul class="mt-3 flex flex-wrap gap-1.5">${badgeHTML}</ul>
          <div class="mt-4 flex items-center gap-3">${linksHTML}</div>
        </div>
      </article>
    `;
  }

  // Render blog card HTML  
  renderBlogCard(post, delay = 0) {
    return `
      <article class="rounded-lg border border-neutral-200 bg-white p-5 shadow-card hover:shadow-lg transition-all duration-200 opacity-0 translate-y-3 will-change-transform" data-animate="fade-up" data-animate-delay="${delay}">
        <a href="${post.url}" class="group block">
          <h3 class="text-lg font-medium text-neutral-900 group-hover:text-neutral-950 transition-colors">${post.title}</h3>
          <p class="mt-1 text-sm text-neutral-500">${this.formatDate(post.date)} · ${post.readTime} · ${post.categories.join(', ')}</p>
          <p class="mt-3 text-neutral-700 line-clamp-2">${post.excerpt}</p>
        </a>
      </article>
    `;
  }

  // Render filter chips
  renderFilterChips() {
    return this.data.site.filters.map(filter => 
      `<button class="chip ${filter.id === 'all' ? 'active' : ''}" data-chip="${filter.id}">${filter.label}</button>`
    ).join('');
  }

  // Render skills list
  renderSkillsList() {
    return this.data.site.skills.map(skill => 
      `<li>${skill}</li>`
    ).join('');
  }

  // Render social links
  renderSocialLinks() {
    return this.data.navigation.social.map(link => 
      `<a href="${link.href}" ${link.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} 
         class="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-900 px-3 py-1.5 text-xs transition-all duration-150 hover:bg-neutral-50 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-600/30 active:translate-y-0 magnet"
         aria-label="${link.ariaLabel}">
        ${link.name}
      </a>`
    ).join('');
  }

  // Helper methods
  renderProjectThumbnail(project) {
    const { gradient, accentColor } = project.thumbnail;
    return `
      <svg class="w-full aspect-[16/9] block rounded-t-lg" viewBox="0 0 800 450" role="img" aria-label="${project.title} thumbnail">
        <defs><linearGradient id="g-${project.id}" x1="0" x2="1"><stop offset="0%" stop-color="${gradient[0]}"/><stop offset="100%" stop-color="${gradient[1]}"/></linearGradient></defs>
        <rect width="800" height="450" fill="url(#g-${project.id})"/>
        <g fill="${accentColor}" opacity=".9">
          <rect x="64" y="64" width="230" height="28" rx="6"/>
          <rect x="64" y="114" width="420" height="16" rx="4"/>
          <rect x="64" y="140" width="360" height="16" rx="4"/>
          <rect x="64" y="210" width="672" height="8" rx="4"/>
          <rect x="64" y="234" width="540" height="8" rx="4"/>
          <rect x="64" y="258" width="610" height="8" rx="4"/>
        </g>
      </svg>
    `;
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatLinkLabel(key) {
    const labels = {
      github: 'GitHub',
      caseStudy: 'Case Study', 
      docs: 'Docs',
      writeup: 'Write-up',
      demo: 'Demo',
      slides: 'Slides',
      designDoc: 'Design Doc'
    };
    return labels[key] || this.capitalize(key);
  }

  getFileExtension(project) {
    const extensions = {
      go: 'service.go',
      kubernetes: 'operator.yaml',
      crossplane: 'blueprints.yaml',
      grpc: 'ext-proc.go'
    };
    return extensions[project.tags[0]] || 'main.js';
  }

  getProjectMetadata(project) {
    if (project.metadata.coverage) return `Coverage: ${project.metadata.coverage}`;
    if (project.metadata.maturity) return `Blueprint maturity: ${project.metadata.maturity}`;
    if (project.metadata.environment) return `Demo env: ${project.metadata.environment}`;
    if (project.metadata.throughput) return `Throughput: ${project.metadata.throughput}`;
    return 'Latest release';
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
