import type {
  CapabilityCategory,
  ExperimentItem,
  JourneyMilestone,
  MonolithFinish,
} from '@/types/portfolio';

export const OWNER_PROFILE = {
  name: 'Noman Aqil',
  title: 'Noman Aqil — Developer · AI & Technology Enthusiast · Creative Technologist',
  roleHeadline: 'Developer · AI & Technology Enthusiast · Creative Technologist',
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  introHook:
    'Driven by an interest in building technology that goes beyond conventional digital experiences — spanning AI workflows, interactive web, 3D environments, and Android applications.',
  philosophy:
    "Don't just use technology. Explore it, understand it, and build something with it.",
  aboutParagraphs: [
    'I am a B.Tech student specializing in Artificial Intelligence and Data Science, driven by an interest in building technology that goes beyond conventional digital experiences.',
    'My work and explorations span software engineering, artificial intelligence, interactive web experiences, 3D environments, and Android application development.',
    'I enjoy taking ideas from conceptualization to implementation, exploring the intersection of engineering, functionality, and visual design. Whether experimenting with autonomous AI workflows, developing interactive interfaces, or exploring new possibilities in mobile technology, I approach each project as an opportunity to learn, experiment, and build something meaningful.',
    'My interests extend beyond writing code. I am particularly fascinated by how technology can become more intuitive, immersive, and accessible — from AI-powered assistants and intelligent applications to visually rich digital environments.',
    'I believe in learning by building, questioning conventional approaches, and continuously exploring what is possible with emerging technologies.',
  ],
  aboutPillars: [
    {
      label: 'Conceptualization -> Implementation',
      detail: 'Turning experimental ideas into structured working interfaces, tools, and pipelines.',
    },
    {
      label: 'Engineering + Visual Design',
      detail: 'Connecting clean software architecture with expressive typography, motion, and 3D craft.',
    },
    {
      label: 'Intuitive & Immersive Tech',
      detail: 'Exploring local-first AI workflows, spatial web environments, and responsive mobile experiences.',
    },
  ],
  email: 'nomanaqil56@gmail.com',
  githubUrl: 'https://github.com/nomanaqil56',
  githubHandle: 'nomanaqil56',
  repoUrl: 'https://github.com/nomanaqil56/PORTFOLIO',
} as const;

export const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  {
    id: 'software-dev',
    code: '01',
    title: 'Software Development',
    summary:
      'Programming fundamentals, modular application architecture, state isolation, and structured problem solving across desktop, web, and mobile.',
    items: [
      {
        name: 'TypeScript & Modern JavaScript',
        maturity: 'applied',
        context: 'Used across NOVA-UI, Duaen Foundation NGO, Agent-Extension, and this portfolio',
      },
      {
        name: 'Python Automation & Tooling',
        maturity: 'applied',
        context: 'Blender AI Studio IPC bridge, scene tooling, and automated test suites',
      },
      {
        name: 'Kotlin Application Architecture',
        maturity: 'applied',
        context: 'MineHost server management and Assistant X intent parsing pipeline',
      },
      {
        name: 'Java & C Foundations',
        maturity: 'applied',
        context: 'Academic coursework in data structures, algorithms, and core programming',
      },
    ],
  },
  {
    id: 'artificial-intelligence',
    code: '02',
    title: 'Artificial Intelligence',
    summary:
      'Studying AI & Data Science while building practical AI-assisted workflows, local-model connectors, and agentic experimentation.',
    items: [
      {
        name: 'AI-Assisted Workflows & Tool Calling',
        maturity: 'applied',
        context: 'Schema-validated Blender tool dispatch and browser agent ReAct execution',
      },
      {
        name: 'Local Language Models (LM Studio / Ollama)',
        maturity: 'applied',
        context: 'Experimenting with local Qwen models under desktop 8GB VRAM budgets',
      },
      {
        name: 'Multimodal Scene Inspection',
        maturity: 'applied',
        context: 'Viewport capture analytics and iterative self-correction loops in Blender AI Studio',
      },
      {
        name: 'AI & Data Science Specialization',
        maturity: 'exploring',
        context: 'Undergraduate B.Tech study exploring machine learning and data-centric systems',
      },
    ],
  },
  {
    id: 'web-dev',
    code: '03',
    title: 'Web Development',
    summary:
      'Building interactive frontend interfaces, accessible layouts, map visualisations, and hardware-accelerated 3D web experiences.',
    items: [
      {
        name: 'React, Vite & React Router',
        maturity: 'applied',
        context: 'Core frontend architecture across NOVA-UI, Duaen Foundation, and NeuralBench',
      },
      {
        name: 'Tailwind CSS & Design Tokens',
        maturity: 'applied',
        context: 'Custom dark/light themes, editorial grids, and responsive layout engineering',
      },
      {
        name: 'GSAP, Framer Motion & Lenis',
        maturity: 'applied',
        context: 'Scroll-synchronized timelines, layout transitions, and custom motion choreography',
      },
      {
        name: 'MapLibre GL Vector Visualisation',
        maturity: 'applied',
        context: 'Custom dark style layers and OpenFreeMap Liberty experimentation in NOVA-UI',
      },
    ],
  },
  {
    id: '3d-creative-tech',
    code: '04',
    title: '3D & Creative Technology',
    summary:
      'Bridging real-time browser Three.js scenes with Blender Python scripting, procedural modelling, material setup, and GPU rendering.',
    items: [
      {
        name: 'Three.js & React Three Fiber',
        maturity: 'applied',
        context: 'NOVA-UI GLB alignment layer and this portfolio’s synchronized 3D stage',
      },
      {
        name: 'Blender Python API (bpy) & Procedural Modelling',
        maturity: 'applied',
        context: 'Truncated icosahedron football mesh, recessed bevel seams, and modifier stacks',
      },
      {
        name: 'PBR Materials, Studio Lighting & Cycles OptiX',
        maturity: 'applied',
        context: 'Principled BSDF shader setup and RTX 5060 GPU rendering workflows',
      },
      {
        name: 'Custom GLSL Shaders & Generative Canvas',
        maturity: 'exploring',
        context: 'Procedural noise fields, waveform patterns, and interactive particle rigs',
      },
    ],
  },
  {
    id: 'android-dev',
    code: '05',
    title: 'Android Development',
    summary:
      'Building mobile applications spanning low-level process management, local networking, and Compose-based local-first assistants.',
    items: [
      {
        name: 'Jetpack Compose & Material 3',
        maturity: 'applied',
        context: 'Assistant X minimal borderless chat UI, side menu, and Compose canvas visuals',
      },
      {
        name: 'Foreground Services & Process Lifecycle',
        maturity: 'applied',
        context: 'MineHost server hosting lifecycle, wake-locks, and world storage management',
      },
      {
        name: 'Local Networking & Intent Execution',
        maturity: 'applied',
        context: 'LAN address discovery in MineHost and app launch intents in Assistant X',
      },
      {
        name: 'Widgets & Accessibility Automation',
        maturity: 'exploring',
        context: 'CueDrop home-screen widget concept and Assistant X system-wide interaction vision',
      },
    ],
  },
  {
    id: 'emerging-tech',
    code: '06',
    title: 'Emerging Technologies',
    summary:
      'Questioning conventional patterns and experimenting with autonomous desktop/browser agents, local-first tools, and spatial computing.',
    items: [
      {
        name: 'Autonomous Desktop & Browser Agents',
        maturity: 'applied',
        context: 'Blender-Workflow IPC bridge and Antigravity Agent-Extension sandbox',
      },
      {
        name: 'Cross-Network Tunnelling & Mobile Hosting',
        maturity: 'exploring',
        context: 'Investigating NAT traversal and relay models for MineHost beyond local Wi-Fi',
      },
      {
        name: 'Offline-First Personal Computing',
        maturity: 'exploring',
        context: 'Privacy-preserving on-device workflows and voice-driven interfaces',
      },
    ],
  },
];

export const EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'monolith-sandbox',
    code: 'EXP-01',
    title: '3D Stage & Lighting Sandbox',
    domain: 'Real-Time WebGL / R3F',
    status: 'Live Interactive Rig',
    description:
      'Manipulate the portfolio’s live 3D monolith directly: switch material finishes, adjust rotation tempo, shift studio rim accents, or drag the 3D viewport stage.',
    technologies: ['React Three Fiber', 'Three.js', 'GLSL', 'GSAP'],
  },
  {
    id: 'particle-field',
    code: 'EXP-02',
    title: 'Connected Node & Particle Field',
    domain: 'Creative Coding / Canvas 2D',
    status: 'Interactive Canvas',
    description:
      'A lightweight pointer-repulsive spatial particle mesh demonstrating node proximity links and smooth harmonic drift without heavy GPU cost.',
    technologies: ['HTML5 Canvas', 'Vector Physics', 'RAF Loop'],
  },
  {
    id: 'kinetic-type',
    code: 'EXP-03',
    title: 'Expressive Typography Distortion',
    domain: 'Kinetic Type Study',
    status: 'Interactive Prototype',
    description:
      'Interactive typographic study echoing the portfolio’s WEB / DEV DNA—experiment with tracking spread, slant tension, and pointer-driven kinetic shift.',
    technologies: ['Oswald Display', 'CSS Transforms', 'Pointer Math'],
  },
  {
    id: 'agent-extension',
    code: 'EXP-04',
    title: 'Antigravity Agent Extension',
    domain: 'Browser Sandbox & Local Engine',
    status: 'Repository Experiment',
    description:
      'A Manifest V3 browser side panel paired with a loopback-only Node.js engine exploring privacy-bounded tool execution, encrypted secret vaulting, and automated verification.',
    technologies: ['Manifest V3', 'Node.js', 'WebSockets', 'AES-256-GCM'],
    repoUrl: 'https://github.com/nomanaqil56/Agent-Extension',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'academic-ai-ds',
    period: 'ACADEMIC FOUNDATION',
    code: '01',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    domain: 'Core Studies & Analytical Thinking',
    summary:
      'Began pursuing a B.Tech specializing in Artificial Intelligence and Data Science, establishing foundational grounding in programming, data structures, and computational problem solving.',
    highlights: [
      'Studied core programming in Java and C alongside foundational data structures',
      'Built an experimental mindset rooted in understanding systems from first principles',
    ],
    tags: ['AI & Data Science', 'B.Tech', 'Foundations'],
  },
  {
    id: 'independent-web',
    period: 'INDEPENDENT SOFTWARE PROJECTS',
    code: '02',
    title: 'Interactive Web & Spatial Interface Explorations',
    domain: 'Frontend Engineering & 3D Web',
    summary:
      'Transitioned from coursework into independent software builds—exploring NeuralBench, NOVA-UI (MapLibre GL + 3D GLB integration), and website contributions for Duaen Foundation.',
    highlights: [
      'Combined MapLibre dark styling with Three.js 3D vehicle alignment in NOVA-UI',
      'Built responsive, accessible frontend pages and attachment validation for Duaen Foundation',
    ],
    tags: ['React', 'TypeScript', 'MapLibre', 'Three.js'],
  },
  {
    id: 'android-exploration',
    period: 'MOBILE SYSTEMS',
    code: '03',
    title: 'Exploring Android Development & Local-First Tools',
    domain: 'Android Architecture & Compose UI',
    summary:
      'Expanded into native Android engineering across two distinct directions: MineHost (local Minecraft server hosting and networking studies) and Assistant X (local-first AI assistant vision).',
    highlights: [
      'Investigated foreground process management, LAN networking, and tunnelling constraints in MineHost',
      'Explored Jetpack Compose interfaces and local command execution in Assistant X',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Networking'],
  },
  {
    id: 'ai-blender-workflows',
    period: 'AI & 3D AUTOMATION',
    code: '04',
    title: 'Local Models, IPC & Blender Automation',
    domain: 'Autonomous 3D & Local AI',
    summary:
      'Explored connecting local language models and autonomous agent workflows directly with live desktop Blender via localhost IPC (`127.0.0.1:9855`) and `bpy.app.timers`.',
    highlights: [
      'Constructed procedural truncated-icosahedron football geometry, bevel seams, and PBR shaders via Python',
      'Tested Cycles OptiX GPU rendering and local model workflows on Windows 11 + RTX 5060',
    ],
    tags: ['Python', 'Blender API', 'Local Models', 'IPC'],
  },
  {
    id: 'wie-hackarth-2026',
    period: '2026',
    code: '05',
    title: 'Participating in WIE HACKARTH 2.0 (2026)',
    domain: 'Hackathon Collaboration & Rapid Prototyping',
    summary:
      'Participated in WIE HACKARTH 2.0 (2026), applying rapid ideation, collaborative engineering, and design-focused problem solving in a focused sprint environment.',
    highlights: [
      'Collaborated on framing ideas quickly from concept to working demonstration',
      'Reinforced the balance between technical implementation and user-facing clarity',
    ],
    tags: ['WIE HACKARTH 2.0', '2026', 'Collaboration'],
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
