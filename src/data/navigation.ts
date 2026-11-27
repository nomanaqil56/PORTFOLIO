import type { SectionMeta, SectionId } from '@/types/portfolio';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'home',
    index: '01',
    label: 'Home',
    navLabel: 'HOME',
    eyebrow: '01 / IDENTITY',
  },
  {
    id: 'systems',
    index: '02',
    label: 'Digital Systems',
    navLabel: 'SYSTEMS',
    eyebrow: '02 / SYSTEMS',
  },
  {
    id: 'disciplines',
    index: '03',
    label: 'Craft & Works',
    navLabel: 'WORKS',
    eyebrow: '03 / DISCIPLINES & ARCHIVE',
  },
  {
    id: 'contact',
    index: '04',
    label: 'Contact',
    navLabel: 'CONTACT',
    eyebrow: '04 / CONNECT',
  },
];

export const SECTION_ORDER: SectionId[] = SECTIONS.map((section) => section.id);
