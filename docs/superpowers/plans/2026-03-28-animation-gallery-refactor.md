# Animation Gallery 重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将纯 HTML/CSS/JS 项目重构为 React + Vite + TypeScript 现代前端项目，保留并优化现有功能，添加更有趣的视觉风格

**Architecture:** 使用 React 组件化开发，Zustand 状态管理，GSAP/Three.js 动画增强，保留作品数据迁移

**Tech Stack:** React 18, Vite, TypeScript, Zustand, GSAP, Three.js, React Router

---

## 文件结构映射

重构后的项目结构：

```
animation-gallery/           # 项目根目录
├── public/
│   └── works/              # 动画作品文件 (从原项目迁移)
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.css
│   │   ├── WorkGrid/
│   │   │   ├── WorkGrid.tsx
│   │   │   └── WorkGrid.css
│   │   ├── WorkCard/
│   │   │   ├── WorkCard.tsx
│   │   │   └── WorkCard.css
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.css
│   │   └── FilterTags/
│   │       ├── FilterTags.tsx
│   │       └── FilterTags.css
│   ├── hooks/
│   │   └── useKeyboardNav.ts
│   ├── store/
│   │   └── galleryStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── works.ts
│   ├── styles/
│   │   └── global.css
│   ├── pages/
│   │   └── Home.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── .eslintrc.cjs
```

---

## Task 1: 创建 Vite + React + TypeScript 项目

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `.eslintrc.cjs`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "animation-gallery",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "three": "^0.160.0",
    "gsap": "^3.12.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@types/three": "^0.160.0",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.2.2",
    "vite": "^5.1.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

- [ ] **Step 5: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Animation Gallery - Premium Creative Pixel Animations Showcase" />
    <title>Animation Gallery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: 创建 .eslintrc.cjs**

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}
```

- [ ] **Step 7: 安装依赖**

Run: `npm install`
Expected: 安装所有依赖包

---

## Task 2: 创建类型定义和状态管理

**Files:**
- Create: `src/types/index.ts`
- Create: `src/store/galleryStore.ts`
- Create: `src/data/works.ts`

- [ ] **Step 1: 创建 TypeScript 类型定义 src/types/index.ts**

```typescript
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
}
```

- [ ] **Step 2: 创建 Zustand 状态管理 src/store/galleryStore.ts**

```typescript
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
}));
```

- [ ] **Step 3: 创建作品数据 src/data/works.ts**

```typescript
import type { Work } from '../types';

export const works: Work[] = [
  {
    id: '1',
    title: 'Clawd 晒太阳',
    description: '小螃蟹 Clawd 在阳光下享受温暖时光的像素风动画。',
    file: '/works/clawd-sunbathing.html',
    tag: '像素动画',
    icon: '🦀',
  },
];

export const getAllTags = (works: Work[]): string[] => {
  const tags = new Set(['全部']);
  works.forEach((work) => {
    if (work.tag) tags.add(work.tag);
  });
  return Array.from(tags);
};
```

---

## Task 3: 创建全局样式

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: 创建全局样式 src/styles/global.css**

```css
:root {
  /* 深色主题 - 霓虹风格 */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-overlay: #1a1a25;
  --bg-card: #1e1e2a;

  /* 文字颜色 */
  --text-primary: #f0f0f5;
  --text-secondary: #9090a0;

  /* 霓虹点缀色 */
  --accent-primary: #00d4ff;
  --accent-secondary: #ff00aa;
  --accent-tertiary: #00ff88;

  /* 边框和阴影 */
  --border: #2a2a3a;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-neon: 0 0 20px rgba(0, 212, 255, 0.3);

  /* 间距 */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;

  /* 过渡 */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.7;
  min-height: 100vh;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

h3 {
  font-size: 1.25rem;
}

a {
  color: var(--accent-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-secondary);
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

input {
  font-family: inherit;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}

/* 动画 keyframes */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% { box-shadow: var(--shadow-neon); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.5); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 响应式断点 */
@media (max-width: 768px) {
  :root {
    --spacing-lg: 24px;
    --spacing-xl: 32px;
  }
}

@media (max-width: 480px) {
  :root {
    --spacing-md: 16px;
    --spacing-lg: 20px;
    --spacing-xl: 24px;
  }
}
```

---

## Task 4: 创建入口文件和 App 组件

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`

- [ ] **Step 1: 创建入口文件 src/main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 2: 创建 App.tsx**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 预留更多路由扩展 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Task 5: 创建 Home 页面组件

**Files:**
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: 创建 Home 页面 src/pages/Home.tsx**

```typescript
import { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import WorkGrid from '../components/WorkGrid/WorkGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterTags from '../components/FilterTags/FilterTags';
import Modal from '../components/Modal/Modal';
import { useGalleryStore } from '../store/galleryStore';
import { works as initialWorks, getAllTags } from '../data/works';
import './Home.css';

function Home() {
  const { setFilter, setSearchQuery } = useGalleryStore();

  useEffect(() => {
    // 初始化作品数据
    const allWorks = initialWorks;
    const tags = getAllTags(allWorks);
    useGalleryStore.setState({
      works: allWorks,
      filteredWorks: allWorks,
    });
  }, []);

  return (
    <div className="home">
      <Hero />
      <main className="main">
        <div className="container">
          <SearchBar />
          <FilterTags />
          <WorkGrid />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Animation Gallery. All rights reserved.
          </p>
        </div>
      </footer>
      <Modal />
    </div>
  );
}

export default Home;
```

- [ ] **Step 2: 创建 Home.css**

```css
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: var(--spacing-xl) 0;
}

.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: var(--spacing-xl) 0;
  text-align: center;
  margin-top: auto;
}

.copyright {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .main {
    padding: var(--spacing-md) 0;
  }
}
```

---

## Task 6: 创建 Hero 组件（带 Three.js 动画）

**Files:**
- Create: `src/components/Hero/Hero.tsx`
- Create: `src/components/Hero/Hero.css`

- [ ] **Step 1: 创建 Hero.tsx**

```typescript
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import './Hero.css';

function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Mesh[];
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = { scene } as typeof sceneRef.current;

    // Camera - Orthographic for 2.5D feel
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      -aspect * 10, aspect * 10,
      10, -10,
      1, 100
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00d4ff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff00aa, 0.8, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating particles
    const geometries = [
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.IcosahedronGeometry(0.4),
      new THREE.OctahedronGeometry(0.45),
      new THREE.TorusGeometry(0.3, 0.12, 8, 8),
    ];

    const colors = [0x00d4ff, 0xff00aa, 0x00ff88, 0xffd700];
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshLambertMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.7,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 25;
      mesh.position.y = (Math.random() - 0.5) * 15;
      mesh.position.z = (Math.random() - 0.5) * 5;

      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };

      scene.add(mesh);
      particles.push(mesh);
    }

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      particles.forEach((particle) => {
        particle.rotation.x += particle.userData.rotationSpeed.x;
        particle.rotation.y += particle.userData.rotationSpeed.y;
        particle.rotation.z += particle.userData.rotationSpeed.z;

        // Floating motion
        particle.position.y += Math.sin(time * particle.userData.floatSpeed + particle.userData.floatOffset) * 0.005;

        // Parallax effect
        particle.position.x += (mouseX * 0.5 - particle.position.x) * 0.002;
        particle.position.y += (-mouseY * 0.5 - particle.position.y) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // GSAP title animation
    gsap.fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    );

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newAspect = newWidth / newHeight;

      camera.left = -newAspect * 10;
      camera.right = newAspect * 10;
      camera.top = 10;
      camera.bottom = -10;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Animation Gallery</h1>
        <p className="hero-subtitle">A curated collection of creative pixel animations</p>
      </div>
      <div className="hero-canvas" ref={canvasRef} />
    </header>
  );
}

export default Hero;
```

- [ ] **Step 2: 创建 Hero.css**

```css
.hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--spacing-xl);
  max-width: 800px;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(0, 212, 255, 0.3);
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero-canvas canvas {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .hero {
    min-height: 50vh;
  }

  .hero-content {
    padding: var(--spacing-md);
  }
}
```

---

## Task 7: 创建 SearchBar 和 FilterTags 组件

**Files:**
- Create: `src/components/SearchBar/SearchBar.tsx`
- Create: `src/components/SearchBar/SearchBar.css`
- Create: `src/components/FilterTags/FilterTags.tsx`
- Create: `src/components/FilterTags/FilterTags.css`

- [ ] **Step 1: 创建 SearchBar.tsx**

```typescript
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
```

- [ ] **Step 2: 创建 SearchBar.css**

```css
.search-container {
  margin-bottom: var(--spacing-lg);
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
  outline: none;
  font-family: 'Inter', sans-serif;
}

.search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.15), var(--shadow-neon);
}

.search-input::placeholder {
  color: var(--text-secondary);
}
```

- [ ] **Step 3: 创建 FilterTags.tsx**

```typescript
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
```

- [ ] **Step 4: 创建 FilterTags.css**

```css
.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.tag-filter {
  padding: 8px var(--spacing-sm);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.tag-filter:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background-color: var(--bg-secondary);
}

.tag-filter.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-color: transparent;
  color: white;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
}
```

---

## Task 8: 创建 WorkGrid 和 WorkCard 组件

**Files:**
- Create: `src/components/WorkGrid/WorkGrid.tsx`
- Create: `src/components/WorkGrid/WorkGrid.css`
- Create: `src/components/WorkCard/WorkCard.tsx`
- Create: `src/components/WorkCard/WorkCard.css`

- [ ] **Step 1: 创建 WorkGrid.tsx**

```typescript
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
```

- [ ] **Step 2: 创建 WorkGrid.css**

```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-md) 0;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .works-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .works-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}

.empty-state {
  text-align: center;
  padding: 80px var(--spacing-md);
  color: var(--text-secondary);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.empty-state h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}
```

- [ ] **Step 3: 创建 WorkCard.tsx**

```typescript
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
```

- [ ] **Step 4: 创建 WorkCard.css**

```css
.work-card {
  background-color: var(--bg-card);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  border: 1px solid transparent;
}

.work-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-md), 0 0 30px rgba(0, 212, 255, 0.15);
  border-color: var(--accent-primary);
}

.work-card:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.work-preview {
  width: 100%;
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.work-preview::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 170, 0.1));
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.work-card:hover .work-preview::before {
  opacity: 1;
}

.work-preview-icon {
  font-size: 3.5rem;
  opacity: 0.9;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
  transition: transform var(--transition-normal);
}

.work-card:hover .work-preview-icon {
  transform: scale(1.1) rotate(5deg);
}

.work-info {
  padding: var(--spacing-md);
}

.work-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.work-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.work-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(255, 0, 170, 0.15));
  color: var(--accent-primary);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: var(--spacing-sm);
  border: 1px solid rgba(0, 212, 255, 0.3);
}
```

---

## Task 9: 创建 Modal 组件

**Files:**
- Create: `src/components/Modal/Modal.tsx`
- Create: `src/components/Modal/Modal.css`

- [ ] **Step 1: 创建 Modal.tsx**

```typescript
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
```

- [ ] **Step 2: 创建 Modal.css**

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(10, 10, 15, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  opacity: 0;
  pointer-events: none;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.modal-container {
  position: relative;
  max-width: 1200px;
  width: 100%;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transform: scale(0.95);
  align-items: center;
}

.modal-close {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 44px;
  height: 44px;
  border: none;
  background: var(--bg-card);
  border-radius: 50%;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  z-index: 10;
  transition: transform var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  transform: scale(1.1);
  color: var(--accent-primary);
  background: var(--bg-secondary);
}

.modal-controls {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;
  padding: 0 var(--spacing-sm);
  pointer-events: none;
}

.modal-nav {
  width: 56px;
  height: 56px;
  border: 2px solid var(--border);
  background: var(--bg-card);
  border-radius: 50%;
  font-size: 1.25rem;
  color: var(--text-primary);
  cursor: pointer;
  pointer-events: auto;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-nav:hover {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  border-color: transparent;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.modal-content-wrapper {
  flex: 1;
  position: relative;
  min-height: 60vh;
  height: 100%;
  width: 100%;
  display: flex;
}

.modal-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle at center, rgba(0, 212, 255, 0.15) 0%, rgba(255, 0, 170, 0.1) 50%, transparent 70%);
  pointer-events: none;
  filter: blur(40px);
  opacity: 0;
  z-index: -1;
}

.modal-content {
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 400px;
  background: var(--bg-card);
  border-radius: 12px;
  border: 2px solid var(--border);
  overflow: visible;
  box-shadow: var(--shadow-lg), 0 0 40px rgba(0, 212, 255, 0.1);
  position: relative;
}

#animationFrame {
  width: 100%;
  height: 100%;
  min-height: 100%;
  border: none;
  display: block;
  border-radius: 12px;
}

.modal-info {
  text-align: center;
  padding: var(--spacing-sm);
  flex-shrink: 0;
}

.modal-title {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.modal-description {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.modal-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  z-index: 5;
  border-radius: 12px;
}

.modal-loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-xs);
  }

  .modal-controls {
    display: none;
  }

  .modal-content-wrapper,
  .modal-content {
    min-height: 70vh;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .modal-description {
    font-size: 0.9rem;
  }
}
```

---

## Task 10: 迁移现有作品文件

**Files:**
- Modify: 复制 `works/` 目录到 `public/works/`

- [ ] **Step 1: 复制作品文件**

Run: `cp -r works/* public/works/`
Expected: 将现有动画文件复制到 public 目录

- [ ] **Step 2: 验证文件**

Run: `ls -la public/works/`
Expected: 看到 clawd-sunbathing.html 等文件

---

## Task 11: 构建和测试

**Files:**
- Run: 构建项目

- [ ] **Step 1: 运行类型检查**

Run: `npx tsc --noEmit`
Expected: 无错误输出

- [ ] **Step 2: 构建项目**

Run: `npm run build`
Expected: 构建成功，生成 dist 目录

- [ ] **Step 3: 启动开发服务器**

Run: `npm run dev`
Expected: 开发服务器启动在 http://localhost:3000

---

## 验收标准检查

1. ✅ 项目使用 React + Vite + TypeScript 构建
2. ✅ 保留现有作品展示功能
3. ✅ 实现搜索和标签筛选功能
4. ✅ 实现 Modal 预览功能，支持键盘导航
5. ✅ 预留 React Router 路由扩展
6. ✅ 预留 Zustand 状态管理
7. ✅ 深色主题 + 趣味动画风格
8. ✅ 响应式设计，支持移动端
9. ✅ Three.js 动态背景
10. ✅ GSAP 动画效果

---

## 执行选择

**Plan complete and saved to `docs/superpowers/plans/2026-03-28-animation-gallery-refactor.md`. 两个执行选项：**

**1. Subagent-Driven (recommended)** - 每个任务分配一个子代理，任务间审查，快速迭代

**2. Inline Execution** - 在当前会话中使用 executing-plans 执行，带检查点

**您选择哪种方式？**