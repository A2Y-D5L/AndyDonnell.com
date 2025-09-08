// All text content and copy for the site
export const content = {
  meta: {
    title: "Andy Donnell — Platform Architect & Go Engineer",
    description: "Platform Architect & Go Engineer building resilient cloud platforms, Kubernetes operators, and developer tooling."
  },

  brand: {
    name: "andy donnell_",
    tagline: "Platform Architect & Go Engineer — building resilient cloud platforms, Kubernetes operators, and developer tooling."
  },

  hero: {
    name: "Andy Donnell",
    headline: "Platform Architect & Go Engineer — building resilient cloud platforms, Kubernetes operators, and developer tooling.",
    cta: {
      resume: "View Resume",
      resumeHref: "/Andy_Donnell_Resume.pdf"
    }
  },

  about: {
    title: "about",
    paragraphs: [
      "I'm a principal platform engineer focused on cloud control planes, Kubernetes operators, and Go-based developer tooling. I design and build scalable systems with a strong emphasis on DX, reliability, and observability. I lead teams, coach engineers, and advocate for pragmatic, well-architected solutions.",
      "Areas of depth: Kubernetes (operators/controllers), Crossplane, Argo, CI/CD pipelines, distributed systems in Go, networking and zero-trust patterns, and platform product thinking."
    ]
  },

  projects: {
    title: "projects", 
    subtitle: "Filter by stack, search titles/descriptions, and open deep-dive case studies.",
    searchPlaceholder: "Search projects…",
    sortOptions: [
      { value: "featured", label: "Sort: Featured" },
      { value: "recent", label: "Sort: Most Recent" },
      { value: "alpha", label: "Sort: A → Z" }
    ],
    filterTip: "Tip: Combine filters (e.g., Go + Kubernetes) and type in the search to narrow further."
  },

  blog: {
    title: "blog"
  },

  contact: {
    title: "contact",
    description: "Interested in collaborating or hiring? Reach out — I'm always open to discussing platform architecture, Go, and developer experience.",
    cta: {
      email: "Email Me",
      emailHref: "mailto:andy@andydonnell.com",
      linkedin: "LinkedIn", 
      linkedinHref: "https://www.linkedin.com/in/andydonnell",
      github: "GitHub",
      githubHref: "https://github.com/A2Y-D5L"
    }
  },

  footer: {
    terminal: "andy@andydonnell.com:~$",
    copyright: "© 2025 Andy Donnell. All rights reserved."
  },

  commandPalette: {
    title: "Command Palette",
    placeholder: "Search… (projects, sections, links)",
    helpText: {
      enter: "Press ↩ to open",
      escape: "Esc close",
      navigate: "↑/↓ navigate"
    }
  },

  theme: {
    label: "Theme",
    modes: {
      system: "System",
      light: "Light", 
      dark: "Dark"
    },
    accents: {
      default: "Blue",
      green: "Green",
      amber: "Amber", 
      purple: "Purple"
    }
  },

  accessibility: {
    skipLink: "Skip to content",
    srOnly: {
      commandPalette: "Command Palette",
      skills: "Skills",
      filterProjects: "Filter projects by technology"
    }
  }
};
