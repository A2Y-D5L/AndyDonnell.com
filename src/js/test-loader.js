// Minimal test content loader
import { projects } from '../../data/projects.js';

export class TestContentLoader {
  constructor() {
    console.log('🧪 TestContentLoader starting...');
    this.testProjects();
  }

  testProjects() {
    console.log('📊 Projects data:', projects);
    
    const projectsContainer = document.getElementById('proj-grid');
    console.log('🎯 Projects container:', projectsContainer);
    
    if (projectsContainer && projects.length > 0) {
      const simpleHTML = projects.map(p => `
        <div style="border: 1px solid #ccc; padding: 1rem; margin: 0.5rem;">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
        </div>
      `).join('');
      
      projectsContainer.innerHTML = simpleHTML;
      console.log('✅ Simple projects loaded');
    } else {
      console.log('❌ Container or projects missing');
    }
  }
}
