import type { DisciplineItem, MonolithFinish } from '@/types/portfolio';

export const OWNER_PROFILE = {
  name: 'Noman Aqil',
  title: 'Noman Aqil Portfolio',
  eyebrow: 'B.Tech — AI & Data Science',
  aboutTitle: 'About',
  aboutParagraphs: [
    'I am a first-year B.Tech student in Artificial Intelligence & Data Science with a passion for immersive web experiences.',
    'I enjoy bridging creative design with technical implementation, building clean interfaces, and experimenting with 3D graphics using modern web technologies.',
  ],
  manifesto: 'I build immersive digital systems blending design, interaction and 3D.',
  systemsHeadline: ['I BUILD', 'DIGITAL SYSTEMS'] as const,
  systemsSubtitle: 'Creating immersive, scalable and performance-driven digital experiences.',
  email: 'nomanaqil56@gmail.com',
  githubUrl: 'https://github.com/nomanaqil56',
  githubHandle: 'nomanaqil56',
  repoUrl: 'https://github.com/nomanaqil56/PORTFOLIO',
} as const;

export const DISCIPLINES: DisciplineItem[] = [
  {
    id: 'ai-ds',
    code: '01',
    title: 'Artificial Intelligence & Data Science',
    summary:
      'Pursuing a B.Tech in AI & Data Science, building strong foundations in analytical reasoning, structured systems, and data-driven engineering.',
    keywords: ['B.Tech AI & DS', 'Foundations', 'Systems Thinking'],
  },
  {
    id: 'interfaces',
    code: '02',
    title: 'Creative Design & Clean Interfaces',
    summary:
      'Bridging visual craft with technical implementation to create minimalist, responsive interfaces guided by proportion, contrast, and motion clarity.',
    keywords: ['UI Architecture', 'Typography', 'Motion'],
  },
  {
    id: 'webgl-3d',
    code: '03',
    title: 'Interactive 3D & Web Graphics',
    summary:
      'Experimenting with real-time WebGL scenes, physically based materials, studio lighting, and scroll-synchronized camera choreography.',
    keywords: ['Three.js', 'React Three Fiber', 'GSAP'],
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
