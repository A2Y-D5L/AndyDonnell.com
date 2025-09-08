// Site configuration and metadata
export const siteConfig = {
  name: "Andy Donnell",
  title: "Andy Donnell — Platform Architect & Go Engineer", 
  description: "Platform Architect & Go Engineer building resilient cloud platforms, Kubernetes operators, and developer tooling.",
  url: "https://www.andydonnell.com",
  
  author: {
    name: "Andy Donnell",
    email: "andy@andydonnell.com",
    github: "https://github.com/A2Y-D5L",
    linkedin: "https://www.linkedin.com/in/andydonnell",
    resume: "/Andy_Donnell_Resume.pdf"
  },
  
  skills: [
    "go • kubernetes • operators",
    "crossplane • argocd • workflows", 
    "aws • gcp • terraform",
    "nats • grpc • envoy",
    "ci/cd • mage • cobra",
    "observability • tempo • traces"
  ],
  
  // Project filter configuration
  filters: [
    { id: "all", label: "All" },
    { id: "go", label: "Go" },
    { id: "kubernetes", label: "Kubernetes" },
    { id: "crossplane", label: "Crossplane" },
    { id: "nats", label: "NATS" },
    { id: "grpc", label: "gRPC" },
    { id: "observability", label: "Observability" }
  ],

  // Theme configuration
  theme: {
    defaultMode: "system", // system | light | dark
    defaultAccent: "default", // default | green | amber | purple
    storage: {
      themeKey: "theme-preference",
      accentKey: "accent-preference"
    }
  },

  // Animation and accessibility
  animations: {
    reduceMotionQuery: "(prefers-reduced-motion: reduce)",
    scrollReveal: {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1
    },
    scrollspy: {
      rootMargin: "-40% 0px -50% 0px",
      threshold: [0.01, 0.25, 0.5, 0.75, 1]
    }
  },

  // Layout configuration
  layout: {
    maxWidth: "max-w-6xl",
    padding: "px-4 sm:px-6 lg:px-8",
    sections: ["about", "projects", "blog", "contact"]
  },

  // Feature flags
  features: {
    commandPalette: true,
    darkMode: true,
    animations: true,
    scrollspy: true,
    magneticHover: true
  }
};
