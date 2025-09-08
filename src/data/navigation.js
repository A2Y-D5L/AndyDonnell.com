// Navigation configuration
export const navigation = {
  primary: [
    { id: "about", label: "About", href: "#about" },
    { id: "projects", label: "Projects", href: "#projects" }, 
    { id: "blog", label: "Blog", href: "#blog" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],
  
  social: [
    {
      name: "GitHub",
      href: "https://github.com/A2Y-D5L",
      ariaLabel: "GitHub",
      icon: "github"
    },
    {
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/andydonnell",
      ariaLabel: "LinkedIn",
      icon: "linkedin"
    },
    {
      name: "Blog",
      href: "#blog", 
      ariaLabel: "Blog",
      icon: "blog"
    }
  ]
};

// Command palette search index items
export const commandPaletteItems = [
  // Sections
  { type: 'section', label: 'Section — About', url: '#about' },
  { type: 'section', label: 'Section — Projects', url: '#projects' },
  { type: 'section', label: 'Section — Blog', url: '#blog' },
  { type: 'section', label: 'Section — Contact', url: '#contact' },
  
  // Navigation
  { type: 'nav', label: 'Nav — About', url: '#about' },
  { type: 'nav', label: 'Nav — Projects', url: '#projects' },
  { type: 'nav', label: 'Nav — Blog', url: '#blog' },
  { type: 'nav', label: 'Nav — Contact', url: '#contact' },
  
  // External links
  { type: 'link', label: 'External — GitHub', url: 'https://github.com/A2Y-D5L' },
  { type: 'link', label: 'External — LinkedIn', url: 'https://www.linkedin.com/in/andydonnell' },
  { type: 'link', label: 'External — Resume', url: '/Andy_Donnell_Resume.pdf' },
  
  // Theme actions
  { type: 'action', label: 'Theme — Toggle Light', action: () => window.setTheme('light') },
  { type: 'action', label: 'Theme — Toggle Dark', action: () => window.setTheme('dark') },
  { type: 'action', label: 'Theme — Use System', action: () => window.setTheme('system') },
  { type: 'action', label: 'Accent — Blue', action: () => window.setAccent('default') },
  { type: 'action', label: 'Accent — Green', action: () => window.setAccent('green') },
  { type: 'action', label: 'Accent — Amber', action: () => window.setAccent('amber') },
  { type: 'action', label: 'Accent — Purple', action: () => window.setAccent('purple') }
];
