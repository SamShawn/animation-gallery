// ===== 作品列表配置 =====
// 在这里添加你的动画作品
const works = [
    {
        title: "Clawd 晒太阳",
        description: "小螃蟹 Clawd 在阳光下享受温暖时光的像素风动画。",
        file: "works/clawd-sunbathing.html",
        tag: "像素动画",
        icon: "🦀"
    },
    // 在这里继续添加更多作品...
];

// ===== 全局状态 =====
let currentFilter = '全部';
let searchQuery = '';

// ===== 提取所有唯一标签 =====
function getAllTags() {
    const tags = new Set(['全部']);
    works.forEach(work => {
        if (work.tag) tags.add(work.tag);
    });
    return Array.from(tags);
}

// ===== HTML 转义（防止 XSS） =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== 获取预览图标 =====
function getPreviewIcon(work, index) {
    if (work.icon) return work.icon;
    const icons = ['🦀', '🎨', '🚀', '⭐', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺'];
    return icons[index % icons.length];
}

// ===== 筛选作品 =====
function filterWorks(works) {
    return works.filter(work => {
        const matchesFilter = currentFilter === '全部' || work.tag === currentFilter;
        const matchesSearch = !searchQuery ||
            work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            work.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (work.tag && work.tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });
}

// ===== 渲染作品网格 =====
function renderWorks() {
    const grid = document.getElementById('worksGrid');
    const filteredWorks = filterWorks(works);

    if (filteredWorks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎬</div>
                <h2>${works.length === 0 ? '暂无作品' : '未找到匹配的作品'}</h2>
                <p>${works.length === 0 ? '在 main.js 的 works 数组中添加你的动画作品' : '尝试其他搜索条件或标签'}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredWorks.map((work, filteredIndex) => {
        const originalIndex = works.findIndex(w => w.title === work.title);
        return `
            <article class="work-card" onclick="openWork('${work.file}')" style="animation-delay: ${filteredIndex * 0.05}s">
                <div class="work-preview">
                    <span class="work-preview-icon">${getPreviewIcon(work, originalIndex)}</span>
                </div>
                <div class="work-info">
                    <h2 class="work-title">${escapeHtml(work.title)}</h2>
                    <p class="work-description">${escapeHtml(work.description || '')}</p>
                    ${work.tag ? `<span class="work-tag">${escapeHtml(work.tag)}</span>` : ''}
                </div>
            </article>
        `;
    }).join('');
}

// ===== 渲染标签过滤器 =====
function renderTagFilters() {
    const header = document.querySelector('.header .container');
    const existingFilters = document.getElementById('tagFilters');
    if (existingFilters) existingFilters.remove();

    const tags = getAllTags();
    if (tags.length <= 1) return;

    const filterContainer = document.createElement('div');
    filterContainer.id = 'tagFilters';
    filterContainer.className = 'tag-filters';

    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = `tag-filter ${tag === currentFilter ? 'active' : ''}`;
        button.textContent = tag;
        button.onclick = () => {
            currentFilter = tag;
            renderTagFilters();
            renderWorks();
        };
        filterContainer.appendChild(button);
    });

    header.appendChild(filterContainer);
}

// ===== 渲染搜索框 =====
function renderSearch() {
    const main = document.querySelector('.main .container');
    const existingSearch = document.getElementById('searchContainer');
    if (existingSearch) existingSearch.remove();

    const searchContainer = document.createElement('div');
    searchContainer.id = 'searchContainer';
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = '搜索作品...';
    searchInput.value = searchQuery;
    searchInput.id = 'searchInput';

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderWorks();
    });

    searchContainer.appendChild(searchInput);
    main.insertBefore(searchContainer, document.getElementById('worksGrid'));
}

// ===== Open Work with Modal Viewer =====
function openWork(file) {
    const index = works.findIndex(w => w.file === file);
    if (index !== -1 && window.viewerAPI) {
        window.viewerAPI.openModal(index);
    } else {
        // Fallback for external files
        window.open(file, '_blank');
    }
}

// ===== 键盘快捷键 =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + F / K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'k')) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Escape 清空搜索
        if (e.key === 'Escape') {
            searchQuery = '';
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
            currentFilter = '全部';
            renderTagFilters();
            renderWorks();
        }
    });
}

// ===== Three.js Cinematic Hero =====
let scene, camera, renderer;
let floatingElements = [];
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

function initThreeHero() {
    const container = document.getElementById('heroCanvas');
    if (!container) return;

    // Scene
    scene = new THREE.Scene();

    // Camera - Orthographic for cinematic feel
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.OrthographicCamera(
        -aspect * 10, aspect * 10,
        10, -10,
        1, 100
    );
    camera.position.z = 10;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting - Warm tones
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create floating geometric elements
    createFloatingElements();

    // Mouse tracking
    document.addEventListener('mousemove', onMouseMove);

    // Start animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onResize);
}

function createFloatingElements() {
    const geometries = [
        new THREE.SphereGeometry(0.8, 8, 8),
        new THREE.IcosahedronGeometry(0.6),
        new THREE.OctahedronGeometry(0.7),
        new THREE.TorusGeometry(0.5, 0.2, 8, 8),
    ];

    const warmColors = [0xc8795f, 0xdca076, 0xffe8d0, 0xffb363];

    for (let i = 0; i < 12; i++) {
        const geometry = geometries[i % geometries.length];
        const material = new THREE.MeshLambertMaterial({
            color: warmColors[i % warmColors.length],
            wireframe: false,
            transparent: true,
            opacity: 0.7
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Position at varying depths
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 5;

        // Random rotation speed
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            parallaxFactor: 0.5 + Math.random() * 0.5
        };

        scene.add(mesh);
        floatingElements.push(mesh);
    }
}

function onMouseMove(e) {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
}

function onResize() {
    const container = document.getElementById('heroCanvas');
    if (!container || !camera || !renderer) return;

    const aspect = container.clientWidth / container.clientHeight;
    camera.left = -aspect * 10;
    camera.right = aspect * 10;
    camera.top = 10;
    camera.bottom = -10;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Rotate and parallax floating elements
    floatingElements.forEach((mesh, i) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;

        // Parallax based on mouse
        const parallax = mesh.userData.parallaxFactor;
        mesh.position.x += (mouseX * parallax * 0.1 - mesh.position.x * 0.001);
        mesh.position.y += (-mouseY * parallax * 0.1 - mesh.position.y) * 0.001;
    });

    renderer.render(scene, camera);
}

// ===== GSAP Page Load Animation =====
function runPageLoadAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Hero title fades in and slides up
    tl.to('.hero-title', {
        opacity: 1,
        yPercent: -50,
        duration: 0.8,
        delay: 0.2
    });

    // Subtitle fades in and slides up
    tl.to('.hero-subtitle', {
        opacity: 1,
        yPercent: -50,
        duration: 0.6,
        delay: 0.1
    }, '-=0.4');

    // 3D canvas fades in
    tl.to('.hero-canvas', {
        opacity: 1,
        duration: 0.8,
        delay: 0.2
    }, '-=0.2');

    // Start cards revealing
    gsap.to('.work-card', {
        opacity: 1,
        y: -40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.works-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ===== Scroll-Triggered Card Animations =====
function setupScrollAnimations() {
    // Register ScrollTrigger plugin
    if (gsap.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Wait for cards to be rendered
    setTimeout(() => {
        const cards = document.querySelectorAll('.work-card');

        cards.forEach(card => {
            gsap.fromTo(card,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, 100);
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Render UI
    renderWorks();
    renderTagFilters();
    renderSearch();

    // Setup interactions
    setupKeyboardShortcuts();

    // Initialize Three.js hero
    initThreeHero();

    // Run GSAP animations
    runPageLoadAnimation();
    setupScrollAnimations();
});
