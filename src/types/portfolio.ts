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

export type CursorState = 'default' | 'view' | 'explore' | 'open' | 'copy' | 'magnet';

export interface SectionMeta {
  id: SectionId;
  index: string;
  label: string;
  navLabel: string;
  inTopNav?: boolean;
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
}

export interface MonolithPose {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  accentHex: string;
}

export interface StagePose {
  camera: CameraPose;
  monolith: MonolithPose;
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

export interface ProjectMedia {
  src: string;
  alt: string;
  caption: string;
}

export type ProjectStatusTone = 'implemented' | 'partial' | 'in-progress' | 'concept';

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  domain: string;
  timeframe: string;
  statusLabel: string;
  statusTone: ProjectStatusTone;
  accentHex: string;
  summary: string;
  motivation: string;
  approach: string;
  implementedDetails: string[];
  limitationsOrScope: string[];
  architecturePipeline: string[];
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  media?: ProjectMedia[];
  interactivePreview?: 'nova-hud' | 'assistant-orb' | 'cuedrop-widget';
}

export interface ExperimentItem {
  id: string;
  code: string;
  title: string;
  domain: string;
  status: string;
  description: string;
  highlights: string[];
  technologies: string[];
  repoUrl?: string;
  interactiveTrigger?: 'cycle-finish' | 'open-command';
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
