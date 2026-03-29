import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGalleryStore } from '../../store/galleryStore';
import './Modal.css';

function Modal() {
  const { isModalOpen, currentWorkIndex, filteredWorks, closeModal, navigateWork } = useGalleryStore();
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const currentWork = filteredWorks[currentWorkIndex];

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';

      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to('.modal-container', {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.5)',
      });

      gsap.to('.modal-glow', {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
      });
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });

    gsap.to('.modal-container', {
      scale: 0.95,
      duration: 0.3,
    });

    setTimeout(closeModal, 300);
  };

  const handleNavigate = (direction: number) => {
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          navigateWork(direction);
          setIsLoading(true);
        },
      });
    } else {
      navigateWork(direction);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          handleNavigate(-1);
          break;
        case 'ArrowRight':
          handleNavigate(1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  if (!isModalOpen || !currentWork) return null;

  return (
    <div
      ref={modalRef}
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container">
        <button className="modal-close" onClick={handleClose} aria-label="关闭">
          &times;
        </button>

        <div className="modal-controls">
          <button
            className="modal-nav modal-prev"
            onClick={() => handleNavigate(-1)}
            aria-label="上一个"
          >
            &larr;
          </button>
          <button
            className="modal-nav modal-next"
            onClick={() => handleNavigate(1)}
            aria-label="下一个"
          >
            &rarr;
          </button>
        </div>

        <div className="modal-content-wrapper">
          <div className="modal-glow" />
          <div className="modal-content">
            {isLoading && (
              <div className="modal-loading">
                <div className="modal-loading-spinner" />
              </div>
            )}
            <iframe
              ref={frameRef}
              id="animationFrame"
              src={currentWork.file}
              sandbox="allow-scripts allow-same-origin"
              onLoad={handleIframeLoad}
              style={{ opacity: isLoading ? 0 : 1 }}
              title={currentWork.title}
            />
          </div>
        </div>

        <div className="modal-info">
          <h2 className="modal-title">{currentWork.title}</h2>
          <p className="modal-description">{currentWork.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;