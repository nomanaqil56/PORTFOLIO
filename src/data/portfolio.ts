import type {
  CapabilityCategory,
  ExperimentItem,
  JourneyMilestone,
  MonolithFinish,
} from '@/types/portfolio';

export const OWNER_PROFILE = {
  name: 'Noman Aqil',
  title: 'Noman Aqil — Creative Technologist & Developer',
  roleHeadline: 'Developer · AI & Technology Enthusiast · Creative Technologist',
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  introHook:
    'Building experimental web interfaces, autonomous AI workflows, Android tools, and interactive 3D digital systems.',
  philosophy:
    "Don't just use technology. Explore it, understand it, and build something with it.",
  aboutParagraphs: [
    'I am a B.Tech student specializing in Artificial Intelligence and Data Science, driven by an interest in building technology that goes beyond conventional digital experiences.',
    'My work and explorations span software engineering, artificial intelligence, interactive web experiences, 3D environments, and Android application development.',
    'I enjoy taking ideas from conceptualization to implementation, exploring the intersection of engineering, functionality, and visual design — from autonomous AI workflows and intelligent assistants to visually rich digital environments.',
    'I believe in learning by building, questioning conventional approaches, and continuously exploring what is possible with emerging technologies.',
  ],
  systemsStatement:
    'I build immersive digital systems blending design, interaction and 3D.',
  email: 'nomanaqil56@gmail.com',
  githubUrl: 'https://github.com/nomanaqil56',
  githubHandle: 'nomanaqil56',
  repoUrl: 'https://github.com/nomanaqil56/PORTFOLIO',
} as const;

export const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  {
    id: 'programming',
    code: '01',
    title: 'Programming & Software Development',
    summary:
      'Architecting modular applications with strong typing, structured state machines, and explicit error boundaries across desktop, web, and mobile.',
    items: [
      {
        name: 'TypeScript',
        maturity: 'applied',
        context: 'Used across NOVA-UI, Duaen Foundation NGO, and this portfolio',
      },
      {
        name: 'Python',
        maturity: 'applied',
        context: 'Local Blender IPC automation, tool orchestration, and test suites',
      },
      {
        name: 'Kotlin',
        maturity: 'applied',
        context: 'Android runtime hosting in MineHost and intent execution in Assistant X',
      },
      {
        name: 'JavaScript / Node.js',
        maturity: 'applied',
        context: 'Local Agent Engine security sandbox, WebSocket server, and NeuralBench',
      },
      {
        name: 'Java & C (Academic DSA)',
        maturity: 'applied',
        context: 'Core coursework in data structures, linked lists, and problem solving',
      },
    ],
  },
  {
    id: 'ai-ml',
    code: '02',
    title: 'Artificial Intelligence & Machine Learning',
    summary:
      'Studying AI & Data Science fundamentals while building practical local-first LLM orchestration, tool calling, and multimodal vision loops.',
    items: [
      {
        name: 'Local LLM Orchestration (LM Studio / Ollama)',
        maturity: 'applied',
        context: 'Qwen2.5-Coder-7B & Qwen3.5-9B integration in Blender AI Studio',
      },
      {
        name: 'Structured Tool Calling & ReAct Loops',
        maturity: 'applied',
        context: 'Schema-validated multi-step planning in Blender AI Studio & Agent-Extension',
      },
      {
        name: 'Multimodal Viewport Vision Inspection',
        maturity: 'applied',
        context: 'Frame luminance, contrast checks, and iterative scene correction',
      },
      {
        name: 'AI & Data Science Foundations',
        maturity: 'exploring',
        context: 'B.Tech specialization exploring data pipelines and ML modeling',
      },
      {
        name: 'Autonomous Multi-Agent Systems',
        maturity: 'exploring',
        context: 'Privacy-bounded hybrid routing and empirical task verification',
      },
    ],
  },
  {
    id: 'web-interactive',
    code: '03',
    title: 'Web Development & Interactive Experiences',
    summary:
      'Crafting responsive interfaces, accessible semantic systems, and multi-engine motion choreography without bloated templates.',
    items: [
      {
        name: 'React 19 & Vite',
        maturity: 'applied',
        context: 'NOVA-UI, Duaen Foundation NGO, NeuralBench, and this Portfolio',
      },
      {
        name: 'Tailwind CSS v4',
        maturity: 'applied',
        context: 'Design-token theming and responsive layouts across recent builds',
      },
      {
        name: 'GSAP, Framer Motion & Lenis',
        maturity: 'applied',
        context: 'Scroll-synchronized timelines, spring layout transitions, smooth inertia',
      },
      {
        name: 'MapLibre GL Vector Mapping',
        maturity: 'applied',
        context: 'Custom dark style layers and route rendering in NOVA-UI',
      },
      {
        name: 'WCAG Accessibility & Security Audits',
        maturity: 'applied',
        context: 'Landmark structure, focus rings, and strict content verification',
      },
    ],
  },
  {
    id: 'graphics-3d',
    code: '04',
    title: '3D Graphics & Digital Environments',
    summary:
      'Combining real-time browser WebGL rendering with offline Blender Python scripting, PBR shading, and studio lighting pipelines.',
    items: [
      {
        name: 'Three.js & React Three Fiber',
        maturity: 'applied',
        context: 'NOVA-UI custom 3D map layer and this portfolio’s interactive WebGL stage',
      },
      {
        name: 'Blender Python API (bpy)',
        maturity: 'applied',
        context: 'Main-thread timer dispatch, bevel/subsurf modifiers, GLB export',
      },
      {
        name: 'PBR Materials & Cycles OptiX Rendering',
        maturity: 'applied',
        context: 'Principled BSDF leather/alloy shaders and 3-point lighting rigs',
      },
      {
        name: 'Custom GLSL Shaders & Post-Effects',
        maturity: 'exploring',
        context: 'Atmospheric procedural noise fields and pointer-reactive lighting',
      },
    ],
  },
  {
    id: 'android',
    code: '05',
    title: 'Android Development',
    summary:
      'Exploring both systems-heavy native Android runtimes and expressive Jetpack Compose interfaces with real hardware validation.',
    items: [
      {
        name: 'Jetpack Compose & Material 3',
        maturity: 'applied',
        context: 'Assistant X fluid particle orb, chat UI, and borderless side menu',
      },
      {
        name: 'Android Foreground Services & Process Management',
        maturity: 'applied',
        context: 'MineHost persistent ARM64 local server lifecycle and wake-locks',
      },
      {
        name: 'Local Networking & Intent Execution',
        maturity: 'applied',
        context: 'MineHost LAN interface filtering and Assistant X app-launch intents',
      },
      {
        name: 'Home-Screen Widgets & Accessibility Hooks',
        maturity: 'exploring',
        context: 'CueDrop widget interaction model and Assistant X global control vision',
      },
    ],
  },
  {
    id: 'creative-tech',
    code: '06',
    title: 'Creative Technology',
    summary:
      'Connecting hardware constraints, spatial storytelling, sound design, and experimental interaction models into cohesive tools.',
    items: [
      {
        name: 'Hardware-Aware Local Inference',
        maturity: 'applied',
        context: '8GB VRAM quantization budgeting and sequential model unloading',
      },
      {
        name: 'Procedural Web Audio & Micro-Interactions',
        maturity: 'exploring',
        context: 'Opt-in synthesized tactile cues and magnetic cursor systems',
      },
      {
        name: 'Experimental Concept Prototyping',
        maturity: 'exploring',
        context: 'CueDrop music moment sharing and autonomous HUD aesthetics',
      },
    ],
  },
];

export const EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'agent-extension',
    code: 'EXP-01',
    title: 'Antigravity Agent Extension',
    domain: 'Browser Automation & Security Sandbox',
    status: '98-Test Verified Prototype',
    description:
      'A Manifest V3 browser side panel paired with an authenticated loopback-only Node.js Local Agent Engine. Explores hybrid routing between deterministic offline execution, Ollama, and cloud models with DPAPI/AES-256-GCM secret vaulting.',
    highlights: [
      'Loopback-restricted 127.0.0.1:3721 WebSocket handshake & single-use pairing codes',
      'Prompt-injection defenses, negative restrictions, and emergency PID-tree stop',
      '98 automated checks covering engine sandbox, privacy boundary, and E2E pairing',
    ],
    technologies: ['JavaScript', 'Manifest V3', 'Node.js', 'WebSockets', 'DPAPI / AES-256'],
    repoUrl: 'https://github.com/nomanaqil56/Agent-Extension',
  },
  {
    id: 'monolith-shader-lab',
    code: 'EXP-02',
    title: 'Live WebGL Material & Shader Study',
    domain: 'Real-Time 3D & GLSL Atmosphere',
    status: 'Interactive Inside Portfolio',
    description:
      'An ongoing visual study evolving the original beveled cube prototype into a responsive PBR + GLSL stage with procedural studio Lightformers, delta-damped camera orbits, and live material switching.',
    highlights: [
      'Procedural Lightformer studio rig avoiding external HDR network failure',
      'Three real-time material profiles: Brushed Titanium, Topology Lattice, Smoked Optics',
      'GLSL atmospheric noise backdrop synchronized to cursor coordinates',
    ],
    technologies: ['Three.js', 'React Three Fiber', 'GLSL', 'GSAP'],
    interactiveTrigger: 'cycle-finish',
  },
  {
    id: 'neuralbench',
    code: 'EXP-03',
    title: 'NeuralBench Interface Prototype',
    domain: 'AI Evaluation UI',
    status: 'Early Frontend Exploration',
    description:
      'Frontend prototype investigating clean observability layouts for comparing LLM outputs, hallucination checks, and semantic drift across model providers.',
    highlights: [
      'Multi-page React Router architecture (Landing, Model Selection, Analytics)',
      'Structured dark-surface telemetry hierarchy using Recharts primitives',
    ],
    technologies: ['React', 'JavaScript', 'React Router', 'Recharts'],
    repoUrl: 'https://github.com/nomanaqil56/NeuralBench',
  },
  {
    id: 'ui-studies',
    code: 'EXP-04',
    title: 'AXION FORGE & NEXA VOID UI Studies',
    domain: 'Expressive Web Typography & Layout',
    status: 'Design System Sketches',
    description:
      'Focused front-end visual studies (`UI-ONE` through `UI-FIVE`) exploring stark monochrome grids, oversized display typography, and high-contrast dark surfaces that directly informed this portfolio.',
    highlights: [
      'Iterative progression from raw HTML/CSS sketches to React + TypeScript + Tailwind v4',
      'Rapid experimentation with kinetic visual pacing and minimal chrome',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'CSS Keyframes'],
    interactiveTrigger: 'open-command',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'btech-ai-ds',
    period: '2025 — PRESENT',
    code: '01',
    title: 'B.Tech Foundations in AI & Data Science',
    domain: 'Academic & Analytical Grounding',
    summary:
      'Began undergraduate studies in Artificial Intelligence & Data Science while diving into programming fundamentals, data structures in Java & C, and applied systems thinking.',
    highlights: [
      'Built strong fundamentals in algorithmic problem solving and software structure',
      'Formed a learn-by-building habit connecting coursework with real engineering experiments',
    ],
    tags: ['AI & Data Science', 'Java / C', 'Systems Thinking'],
  },
  {
    id: 'web-experiments',
    period: 'MAY — OCT 2026',
    code: '02',
    title: 'Interactive Web & Experimental UI Systems',
    domain: 'Web Engineering & Spatial Interfaces',
    summary:
      'Built early experimental interfaces including NeuralBench, visual UI explorations, and NOVA-UI — combining React, TypeScript, MapLibre GL dark vector mapping, and custom Three.js vehicle rendering.',
    highlights: [
      'Integrated a custom Three.js GLB + procedural fallback 3D vehicle layer inside MapLibre GL',
      'Designed role-segmented interfaces across Driver, Technician, and Admin workflows',
    ],
    tags: ['React', 'TypeScript', 'MapLibre GL', 'Three.js'],
  },
  {
    id: 'android-systems',
    period: 'OCT — NOV 2026',
    code: '03',
    title: 'Android App Architecture & Runtime Engineering',
    domain: 'Mobile Systems & Jetpack Compose',
    summary:
      'Explored both creative Compose UI motion in Assistant X (local-first command parsing and a fluid 3D particle orb) and low-level ARM64 server hosting with physical-device validation in MineHost.',
    highlights: [
      'Shipped MineHost 1.0.1 Phase 1 local Bedrock server hosting with 64/64 JVM tests passing',
      'Built Assistant X command parser, app resolver, TTS feedback, and multi-session chat UI',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Android ARM64', 'Networking'],
  },
  {
    id: 'ai-blender-production',
    period: 'NOV 2026',
    code: '04',
    title: 'Autonomous AI Workflows, Blender Automation & Web Delivery',
    domain: 'Applied AI, 3D Pipelines & Production Frontend',
    summary:
      'Built Blender AI Studio to connect local Qwen models with live desktop Blender 5.3 via main-thread IPC, hardened Agent-Extension security, and delivered production-focused frontend work for Duaen Foundation NGO.',
    highlights: [
      'Executed 10 automated 3D generation, PBR texturing, and OptiX render workflows on RTX 5060',
      'Engineered WCAG 2.2 AA accessible pages and strict content audits for Duaen Foundation NGO',
    ],
    tags: ['Python', 'Blender 5.3', 'Local LLMs', 'React 19'],
  },
  {
    id: 'wie-hackarth-2026',
    period: '2026',
    code: '05',
    title: 'Participating in WIE HACKARTH 2.0 (2026)',
    domain: 'Collaborative Innovation & Prototyping',
    summary:
      'Participated in WIE HACKARTH 2.0 (2026), applying rapid ideation, collaborative problem solving, and end-to-end prototyping under hackathon time constraints.',
    highlights: [
      'Translated real-world problem framing into working prototype execution',
      'Continued sharpening how engineering, AI, and visual experience converge cleanly',
    ],
    tags: ['WIE HACKARTH 2.0', '2026', 'Rapid Prototyping'],
  },
];

export const MONOLITH_FINISHES: {
  id: MonolithFinish;
  label: string;
  caption: string;
}[] = [
  {
    id: 'monolith',
    label: 'Monolith',
    caption: 'Brushed titanium alloy honoring the original #D3D3D3 beveled form.',
  },
  {
    id: 'wireframe',
    label: 'Topology',
    caption: 'Precision subdivision lattice exposing the chamfered core structure.',
  },
  {
    id: 'optics',
    label: 'Optics',
    caption: 'Smoked refractive shell revealing the warm illuminated core.',
  },
];
