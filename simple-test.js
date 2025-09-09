// Simple content test
console.log('🧪 Simple test starting');

// Test basic functionality
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM ready');
  
  // Test if elements exist
  const grid = document.getElementById('proj-grid');
  console.log('Grid element:', grid);
  
  if (grid) {
    grid.innerHTML = '<div style="padding: 20px; background: #f0f0f0;">Test content loaded!</div>';
    console.log('✅ Test content added');
  } else {
    console.log('❌ Grid element not found');
  }
});

// Test imports one by one
setTimeout(async () => {
  console.log('🔍 Testing imports...');
  
  try {
    const { projects } = await import('./src/data/projects.js');
    console.log('✅ Projects imported:', projects.length, 'projects');
    
    const { content } = await import('./src/data/content.js');
    console.log('✅ Content imported:', Object.keys(content));
    
    const { TemplateRenderer } = await import('./src/js/utils/template-renderer.js');
    console.log('✅ TemplateRenderer imported:', TemplateRenderer);
    
    const renderer = new TemplateRenderer();
    console.log('✅ TemplateRenderer created:', renderer);
    
  } catch (error) {
    console.error('❌ Import test failed:', error);
  }
}, 1000);
