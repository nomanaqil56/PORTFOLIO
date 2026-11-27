export type SectionId =
  | 'intro'
  | 'about'
  | 'capabilities'
  | 'projects'
  | 'experiments'
  | 'journey'
  | 'contact';

export type MonolithFinish = 'monolith' | 'wireframe' | 'optics';

export type QualityTier = 'high' | 'medium' | 'low';

export type ViewportProfile = 'mobile' | 'tablet' | 'desktop';

export type CursorState = 'default' | 'view' | 'explore' | 'open' | 'drag' | 'copy' | 'magnet';

export interface SectionMeta {
  id: SectionId;
  index: string;
  label: string;
  navLabel: string;
  inTopNav?: boolean;
}

export interface FrustumStagePose {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  /** Normalized screen anchor in [-1, 1] relative to camera frustum center */
  screenAnchor: [number, number];
  /** Depth offset along camera-to-target vector (positive = farther behind target plane) */
  depthOffset: number;
  scale: number;
  rotation: [number, number, number];
  accentHex: string;
}

export type CapabilityMaturity = 'applied' | 'exploring';

export interface CapabilityTech {
  name: string;
  maturity: CapabilityMaturity;
  context: string;
}

export interface CapabilityCategory {
  id: string;
  code: string;
  title: string;
  summary: string;
  items: CapabilityTech[];
}

export type HonestProjectStatus =
  | 'Experimental'
  | 'In Development'
  | 'Concept'
  | 'Research / Exploration'
  | 'Demonstrated Prototype';

export type ProjectVisualTheme =
  | 'nova-grid'
  | 'minehost-network'
  | 'blender-icosahedron'
  | 'assistant-nodes'
  | 'cuedrop-wave'
  | 'duaen-editorial';

export interface WorkflowStageNode {
  id: string;
  label: string;
  detail: string;
  implemented: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  index: string;
  title: string;
  category: string;
  shortIntro: string;
  overview: string[];
  motivation: string;
  technicalExploration: string[];
  challenges: string[];
  status: HonestProjectStatus;
  statusNote: string;
  nextDirection: string;
  technologies: string[];
  workflowNodes: WorkflowStageNode[];
  visualTheme: ProjectVisualTheme;
  accentHex: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface ExperimentItem {
  id: string;
  code: string;
  title: string;
  domain: string;
  status: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  code: string;
  title: string;
  domain: string;
  summary: string;
  highlights: string[];
  tags: string[];
}
