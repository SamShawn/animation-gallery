# 动画作品展示网站

一个简洁、现代的纯前端网站，专门用于展示 HTML 动画作品。

## 📋 项目简介

这是一个轻量级的动画展示平台，采用深色主题设计，专注于呈现精美的动画作品。无需后端、无需数据库、无需安装依赖，开箱即用。

## ✨ 功能特性

- 🎨 现代深色主题设计，突出动画效果
- 📱 完全响应式布局，支持手机/平板/电脑
- ⚡ 纯静态网站，加载速度快
- 🔗 一键部署到 GitHub Pages
- 📂 模块化代码结构，易于扩展
- 🎭 卡片悬停动画效果
- 🛠️ 简单配置即可添加新作品

## 📁 项目结构

```
animation-gallery/
├── index.html              # 网站首页
├── README.md               # 项目文档
├── assets/
│   ├── css/
│   │   └── style.css      # 全局样式文件
│   └── js/
│       └── main.js        # 核心逻辑 + 作品配置
└── works/                  # 动画作品存放目录
    ├── example1.html      # 示例动画 1
    ├── example2.html      # 示例动画 2
    └── example3.html      # 示例动画 3
```

## 🚀 快速开始

### 本地运行

使用 Python 启动本地服务器：

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后访问 `http://localhost:8000`

### 使用其他服务器

```bash
# Node.js (需要安装 http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

## 📦 部署到 GitHub Pages

### 步骤一：创建仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 `+` → `New repository`
3. 填写仓库名称（例如：`animation-gallery`）
4. 选择 `Public`
5. 点击 `Create repository`

### 步骤二：上传代码

```bash
# 进入项目目录
cd /path/to/animation-gallery

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "初始提交"

# 关联远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/animation-gallery.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤三：开启 Pages

1. 进入仓库 `Settings` → `Pages`
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `main` 分支，目录 `/ (root)`
4. 点击 `Save`
5. 等待 1-2 分钟后访问生成的链接

网站地址格式：`https://YOUR_USERNAME.github.io/animation-gallery/`

## ➕ 添加新动画作品

### 方法一：直接添加

1. **放置动画文件**

   将你的 HTML 动画文件放入 `works/` 目录：

   ```
   works/
   └── my-animation.html
   ```

2. **更新配置**

   打开 `assets/js/main.js`，在 `works` 数组中添加：

   ```javascript
   const works = [
       // 现有作品...
       {
           title: "我的动画作品",          // 作品标题
           description: "作品描述文字",    // 作品描述
           file: "works/my-animation.html", // 文件路径
           tag: "CSS 动画"                // 作品标签
       }
   ];
   ```

3. **提交更新**

   ```bash
   git add .
   git commit -m "添加新作品：我的动画作品"
   git push
   ```

### 方法二：基于示例修改

复制 `works/example1.html` 作为模板，修改内容后按上述步骤添加。

## 🎨 自定义样式

### 修改主题颜色

打开 `assets/css/style.css`，修改 CSS 变量：

```css
:root {
    --bg-primary: #0a0a0a;      /* 主背景色 */
    --bg-secondary: #1a1a1a;    /* 次背景色 */
    --bg-card: #161616;         /* 卡片背景色 */
    --text-primary: #ffffff;    /* 主文字色 */
    --text-secondary: #a0a0a0;  /* 次文字色 */
    --accent: #6366f1;          /* 强调色 */
    --accent-hover: #818cf8;    /* 强调色悬停 */
    --border: #2a2a2a;          /* 边框色 */
}
```

### 修改网站标题

在 `index.html` 中修改：

```html
<h1 class="site-title">你的网站标题</h1>
<p class="site-subtitle">网站副标题</p>
```

## 📱 响应式断点

- **手机**: < 480px - 单列布局
- **平板**: 480px - 768px - 两列布局
- **桌面**: > 768px - 多列网格布局

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - Flexbox、Grid、CSS 变量、动画
- **JavaScript (ES6+)** - 原生 JS，无框架依赖

## 📄 作品文件规范

为了获得最佳展示效果，建议动画作品遵循以下规范：

### 基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>作品标题</title>
    <style>
        /* 你的样式 */
    </style>
</head>
<body>
    <!-- 返回按钮（可选） -->
    <a href="../index.html" class="back-btn">← 返回首页</a>

    <!-- 你的动画内容 -->
</body>
</html>
```

### 建议添加的功能

- 返回首页的链接按钮
- 响应式适配
- 深色主题适配（与网站风格统一）
- 适当的加载提示

## 🐛 常见问题

### Q: 作品点击后无法打开？

A: 检查 `main.js` 中的 `file` 路径是否正确，文件必须位于 `works/` 目录内。

### Q: GitHub Pages 部署后样式丢失？

A: 确保文件路径正确，`assets/css/style.css` 和 `assets/js/main.js` 的相对路径要保持一致。

### Q: 如何修改网站描述？

A: 在 `index.html` 的 `<meta>` 标签中修改 description。

### Q: 可以添加视频动画吗？

A: 可以！只需将视频文件放入 `works/` 目录，创建一个包含 video 标签的 HTML 文件即可。

## 📝 更新日志

### v1.0.0 (2026-03-27)

- ✅ 初始版本发布
- ✅ 响应式网格布局
- ✅ 深色主题设计
- ✅ GitHub Pages 部署支持
- ✅ 示例动画作品

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 自由使用、修改和分发。

## 📮 联系方式

如有问题或建议，欢迎通过 GitHub Issues 联系。

---

**享受动画创作的乐趣！** 🎉
