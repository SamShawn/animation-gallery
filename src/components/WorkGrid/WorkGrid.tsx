import { useGalleryStore } from '../../store/galleryStore';
import WorkCard from '../WorkCard/WorkCard';
import './WorkGrid.css';

function WorkGrid() {
  const { filteredWorks, works } = useGalleryStore();

  if (filteredWorks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🎬</div>
        <h2>{works.length === 0 ? '暂无作品' : '未找到匹配的作品'}</h2>
        <p>{works.length === 0 ? '在 src/data/works.ts 中添加你的动画作品' : '尝试其他搜索条件或标签'}</p>
      </div>
    );
  }

  return (
    <div className="works-grid">
      {filteredWorks.map((work, index) => (
        <WorkCard key={work.id} work={work} index={index} />
      ))}
    </div>
  );
}

export default WorkGrid;