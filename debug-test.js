// Quick debug test
console.log('🧪 Debug test script loaded');

// Test imports
try {
  import('./src/js/modules/content-loader.js').then(module => {
    console.log('✅ ContentLoader module loaded:', module);
  }).catch(err => {
    console.error('❌ ContentLoader failed:', err);
  });
} catch (err) {
  console.error('❌ Import failed:', err);
}

// Test if HTML elements exist
setTimeout(() => {
  const elements = {
    'proj-grid': document.getElementById('proj-grid'),
    'filter-chips': document.getElementById('filter-chips'),
    'primary-nav': document.getElementById('primary-nav'),
    'brand-name': document.getElementById('brand-name'),
    'hero-name': document.getElementById('hero-name'),
    'social-links': document.getElementById('social-links')
  };
  
  console.log('📋 Element check:', elements);
}, 100);
