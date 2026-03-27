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

// ===== 打开作品 =====
function openWork(file) {
    window.open(file, '_blank');
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

// ===== 页面加载时初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    renderWorks();
    renderTagFilters();
    renderSearch();
    setupKeyboardShortcuts();
});
