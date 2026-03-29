import type { Work } from '../types';

export const works: Work[] = [
  {
    id: '1',
    title: 'Clawd 晒太阳',
    description: '小螃蟹 Clawd 在阳光下享受温暖时光的像素风动画。',
    file: '/works/clawd-sunbathing.html',
    tag: '像素动画',
    icon: '🦀',
  },
];

export const getAllTags = (works: Work[]): string[] => {
  const tags = new Set(['全部']);
  works.forEach((work) => {
    if (work.tag) tags.add(work.tag);
  });
  return Array.from(tags);
};