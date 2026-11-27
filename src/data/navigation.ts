import type { SectionId, SectionMeta } from '@/types/portfolio';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'intro',
    index: '01',
    label: 'Introduction',
    navLabel: 'INTRO',
    inTopNav: true,
  },
  {
    id: 'about',
    index: '02',
    label: 'About & Philosophy',
    navLabel: 'ABOUT',
    inTopNav: true,
  },
  {
    id: 'capabilities',
    index: '03',
    label: 'Capabilities',
    navLabel: 'CAPABILITIES',
    inTopNav: false,
  },
  {
    id: 'projects',
    index: '04',
    label: 'Selected Projects',
    navLabel: 'PROJECTS',
    inTopNav: true,
  },
  {
    id: 'experiments',
    index: '05',
    label: 'Experiments',
    navLabel: 'EXPERIMENTS',
    inTopNav: true,
  },
  {
    id: 'journey',
    index: '06',
    label: 'Journey',
    navLabel: 'JOURNEY',
    inTopNav: false,
  },
  {
    id: 'contact',
    index: '07',
    label: 'Contact',
    navLabel: 'CONTACT',
    inTopNav: true,
  },
];

export const SECTION_ORDER: SectionId[] = SECTIONS.map((section) => section.id);
