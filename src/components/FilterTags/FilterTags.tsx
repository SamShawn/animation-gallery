import { useEffect, useState } from 'react';
import { useGalleryStore } from '../../store/galleryStore';
import { getAllTags } from '../../data/works';
import './FilterTags.css';

function FilterTags() {
  const { works, currentFilter, setFilter } = useGalleryStore();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(getAllTags(works));
  }, [works]);

  if (tags.length <= 1) return null;

  return (
    <div className="tag-filters">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`tag-filter ${tag === currentFilter ? 'active' : ''}`}
          onClick={() => setFilter(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default FilterTags;