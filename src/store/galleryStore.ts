import { create } from 'zustand';
import type { GalleryState, Work } from '../types';

export const useGalleryStore = create<GalleryState>((set, get) => ({
  works: [],
  filteredWorks: [],
  currentFilter: '全部',
  searchQuery: '',
  currentWorkIndex: -1,
  isModalOpen: false,

  setFilter: (tag: string) => {
    set({ currentFilter: tag });
    get().setSearchQuery(get().searchQuery);
  },

  setSearchQuery: (query: string) => {
    const { works, currentFilter } = get();
    const filtered = works.filter((work) => {
      const matchesFilter = currentFilter === '全部' || work.tag === currentFilter;
      const matchesSearch =
        !query ||
        work.title.toLowerCase().includes(query.toLowerCase()) ||
        work.description.toLowerCase().includes(query.toLowerCase()) ||
        (work.tag && work.tag.toLowerCase().includes(query.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
    set({ searchQuery: query, filteredWorks: filtered });
  },

  openModal: (index: number) => {
    set({ isModalOpen: true, currentWorkIndex: index });
  },

  closeModal: () => {
    set({ isModalOpen: false, currentWorkIndex: -1 });
  },

  navigateWork: (direction: number) => {
    const { currentWorkIndex, filteredWorks } = get();
    let newIndex = currentWorkIndex + direction;
    if (newIndex < 0) newIndex = filteredWorks.length - 1;
    if (newIndex >= filteredWorks.length) newIndex = 0;
    set({ currentWorkIndex: newIndex });
  },

  setWorks: (works: Work[]) => set({ works, filteredWorks: works }),
}));