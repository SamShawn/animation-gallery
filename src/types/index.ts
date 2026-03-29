export interface Work {
  id: string;
  title: string;
  description: string;
  file: string;
  tag: string;
  icon: string;
  createdAt?: string;
}

export interface GalleryState {
  works: Work[];
  filteredWorks: Work[];
  currentFilter: string;
  searchQuery: string;
  currentWorkIndex: number;
  isModalOpen: boolean;
  setFilter: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  openModal: (index: number) => void;
  closeModal: () => void;
  navigateWork: (direction: number) => void;
  setWorks: (works: Work[]) => void;
}