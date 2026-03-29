import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGalleryStore } from '../../store/galleryStore';
import type { Work } from '../../types';
import './WorkCard.css';

gsap.registerPlugin(ScrollTrigger);

interface WorkCardProps {
  work: Work;
  index: number;
}

function WorkCard({ work, index }: WorkCardProps) {
  const { openModal, filteredWorks } = useGalleryStore();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const actualIndex = filteredWorks.findIndex((w) => w.id === work.id);
    if (actualIndex !== -1) {
      openModal(actualIndex);
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="work-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="work-preview">
        <span className="work-preview-icon">{work.icon}</span>
      </div>
      <div className="work-info">
        <h3 className="work-title">{work.title}</h3>
        <p className="work-description">{work.description}</p>
        {work.tag && <span className="work-tag">{work.tag}</span>}
      </div>
    </article>
  );
}

export default WorkCard;