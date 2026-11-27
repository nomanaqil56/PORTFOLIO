export type SectionId = 'home' | 'systems' | 'disciplines' | 'contact';

export type MonolithFinish = 'monolith' | 'wireframe' | 'optics';

export type QualityTier = 'high' | 'medium' | 'low';

export type ViewportProfile = 'mobile' | 'tablet' | 'desktop';

export interface SectionMeta {
  id: SectionId;
  index: string;
  label: string;
  navLabel: string;
  eyebrow: string;
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
}

export interface MonolithPose {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface StagePose {
  camera: CameraPose;
  monolith: MonolithPose;
}

export interface DisciplineItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  keywords: string[];
}

/**
 * Future-ready schema for interactive 3D project showcases and case studies.
 * Add verified project entries to `src/data/projects.ts` when ready to publish.
 */
export interface ProjectEntry {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  caseStudySections?: {
    heading: string;
    body: string;
  }[];
  scenePreset?: {
    accentHex: string;
    finish: MonolithFinish;
  };
}
