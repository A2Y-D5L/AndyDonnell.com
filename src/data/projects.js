// Project portfolio data
export const projects = [
  {
    id: "go-futures",
    title: "go-futures: typed request/reply with shared worker pool",
    description: "Generic futures-based request/reply library in Go with a shared worker pool, cancellation, and graceful shutdown.",
    tags: ["go", "concurrency"],
    updated: "2025-08-24",
    featured: true,
    links: {
      github: "https://github.com/A2Y-D5L/go-futures",
      caseStudy: "#",
      docs: "#"
    },
    metadata: {
      coverage: "86%",
      language: "Go"
    },
    thumbnail: {
      type: "code",
      gradient: ["#eff6ff", "#bfdbfe"],
      accentColor: "#1e3a8a"
    }
  },
  
  {
    id: "crossplane-blueprints", 
    title: "crossplane platform blueprints with secure networking defaults",
    description: "Opinionated control-plane building blocks using Crossplane v2 with secure-by-default networking and GitOps automation.",
    tags: ["kubernetes", "crossplane", "gitops"],
    updated: "2025-09-01",
    featured: true,
    links: {
      github: "https://github.com/A2Y-D5L",
      caseStudy: "#",
      designDoc: "#"
    },
    metadata: {
      maturity: "Beta",
      language: "Crossplane"
    },
    thumbnail: {
      type: "blueprint", 
      gradient: ["#ecfeff", "#cffafe"],
      accentColor: "#0f766e"
    }
  },
  
  {
    id: "tempo-operator-tracing",
    title: "tempo operator tracing visualize orchestration flows", 
    description: "Distributed tracing for K8s operators; visualize orchestration flows across server-side CRD composition.",
    tags: ["observability", "kubernetes", "tracing"],
    updated: "2025-07-14",
    featured: false,
    links: {
      writeup: "#",
      demo: "#", 
      slides: "#"
    },
    metadata: {
      environment: "Kind + Tempo",
      language: "Observability"
    },
    thumbnail: {
      type: "tracing",
      gradient: ["#f5f3ff", "#e9d5ff"], 
      accentColor: "#6d28d9"
    }
  },
  
  {
    id: "envoy-ext-proc",
    title: "grpc external processor with rego policy and nats events",
    description: "Go-based gRPC Envoy external processor validating JWTs and evaluating Rego; emits NATS events for auditing.",
    tags: ["go", "grpc", "nats"],
    updated: "2025-05-17", 
    featured: false,
    links: {
      github: "#",
      caseStudy: "#"
    },
    metadata: {
      throughput: "18k rps (demo)",
      language: "Go"
    },
    thumbnail: {
      type: "processor",
      gradient: ["#fff7ed", "#fed7aa"],
      accentColor: "#9a3412"
    }
  }
];
