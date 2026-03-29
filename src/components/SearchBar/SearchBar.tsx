import { useEffect, useRef } from 'react';
import { useGalleryStore } from '../../store/galleryStore';
import './SearchBar.css';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useGalleryStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'f' || e.key === 'k')) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="搜索作品... (Cmd/Ctrl + K)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim())}
      />
    </div>
  );
}

export default SearchBar;