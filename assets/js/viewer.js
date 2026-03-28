// ===== Modal Viewer State =====
let isModalOpen = false;
let currentWorkIndex = -1;

// ===== DOM Elements =====
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const animationFrame = document.getElementById('animationFrame');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalContent = document.getElementById('modalContent');

// ===== Open Modal =====
function openModal(workIndex) {
    const work = works[workIndex];
    if (!work) return;

    currentWorkIndex = workIndex;
    isModalOpen = true;

    // Update content
    modalTitle.textContent = work.title;
    modalDescription.textContent = work.description || '';

    // Add loading state
    modalContent.innerHTML = `
        <div class="modal-loading">
            <div class="modal-loading-spinner"></div>
        </div>
        <iframe id="animationFrame" sandbox="allow-scripts allow-same-origin"></iframe>
    `;

    // Show modal
    modalOverlay.classList.add('active');

    // Load animation after transition
    gsap.to({}, {
        duration: 0.3,
        onComplete: () => {
            const frame = document.getElementById('animationFrame');
            if (frame && work.file) {
                frame.src = work.file;
                frame.style.display = 'block';
                frame.style.opacity = '0';

                // Fade in animation
                gsap.to(frame, {
                    opacity: 1,
                    duration: 0.3,
                    delay: 0.2
                });

                // Remove loading state
                setTimeout(() => {
                    const loading = modalContent.querySelector('.modal-loading');
                    if (loading) loading.remove();
                }, 500);
            }
        }
    });

    // Trigger ambient glow
    gsap.to('.modal-glow', {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        ease: 'power2.out'
    });
}

// ===== Close Modal =====
function closeModal() {
    if (!isModalOpen) return;

    isModalOpen = false;
    currentWorkIndex = -1;

    // Stop iframe
    const frame = document.getElementById('animationFrame');
    if (frame) {
        frame.src = 'about:blank';
    }

    // Hide modal
    modalOverlay.classList.remove('active');

    // Reset glow
    gsap.to('.modal-glow', {
        opacity: 0,
        duration: 0.3
    });
}

// ===== Navigate in Modal =====
function navigateModal(direction) {
    if (!isModalOpen) return;

    let newIndex = currentWorkIndex + direction;
    if (newIndex < 0) newIndex = works.length - 1;
    if (newIndex >= works.length) newIndex = 0;

    // Clear iframe with transition
    const frame = document.getElementById('animationFrame');
    if (frame) {
        gsap.to(frame, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                frame.src = 'about:blank';
                openModal(newIndex);
            }
        });
    } else {
        openModal(newIndex);
    }
}

// ===== Event Listeners =====
modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', () => navigateModal(-1));
modalNext.addEventListener('click', () => navigateModal(1));

// Close on backdrop click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!isModalOpen) return;

    switch(e.key) {
        case 'Escape':
            e.preventDefault();
            closeModal();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            navigateModal(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateModal(1);
            break;
    }
});

// ===== Export for main.js =====
window.viewerAPI = {
    openModal,
    closeModal,
    navigateModal
};
