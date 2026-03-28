# Premium Animation Gallery

A warm, museum-quality animation showcase featuring cinematic 3D parallax, choreographed transitions, and an immersive viewing experience.

## Features

- **Warm Premium Aesthetic**: Elegant cream tones with refined typography (Playfair Display headings, Inter body text)
- **Cinematic 3D Hero**: Floating geometric elements with mouse-responsive parallax using Three.js
- **Museum-Quality Modal Viewer**: Warm overlay with ambient glow, keyboard navigation (ESC, Arrow keys)
- **Choreographed Transitions**: GSAP-powered smooth animations with intentional timing
- **Responsive Design**: Optimized layouts for mobile (1 col), tablet (2 cols), and desktop (3-4 cols)
- **Instant Filtering**: Search by title, description, or tags with real-time filtering
- **No Build Step**: Deploy anywhere as a static site

## Quick Start

1. Clone the repository
2. Add your animation works to the `works/` directory
3. Open `index.html` in a browser

```bash
# Serve locally with any static server
python -m http.server 8000
# or
npx serve
# or
open index.html
```

## Adding Animation Works

Each animation work is defined in the `works/` directory as a JavaScript object:

```javascript
{
    title: "Your Animation Title",
    description: "A brief description of the animation",
    file: "path/to/your-animation.html",
    thumbnail: "path/to/thumbnail.jpg",
    tags: ["tag1", "tag2"]
}
```

Place your work object in `works/your-work.js` and it will be automatically included.

## Customization

### Colors

Edit CSS custom properties in `assets/css/style.css`:

```css
:root {
    --color-primary-bg: #FAF7F2;    /* Main cream background */
    --color-card-bg: #FFFDF9;        /* Card background */
    --color-text-primary: #2C2A29;   /* Warm charcoal text */
    --color-accent: #C8795F;         /* Terracotta accent */
}
```

### Three.js Floating Elements

Modify floating elements in `assets/js/main.js` in the `createFloatingElements()` function:
- Adjust element count, shapes, colors, and positions
- Modify parallax sensitivity in the `animate()` function

### Transition Timing

Control GSAP animation durations in `assets/js/main.js`:
- Page load animations: `runPageLoadAnimation()`
- Scroll reveals: `setupScrollAnimations()`
- Modal transitions: `assets/js/viewer.js`

## Deployment Options

### GitHub Pages
1. Push to repository
2. Enable GitHub Pages in repository settings
3. Select `main` branch as source

### Netlify
1. Drag and drop repository folder to Netlify
2. Site deploys automatically

### Vercel
1. Import repository
2. Deploy as static site

### Any Static Server
Serve the `index.html` file with any web server.

## Keyboard Shortcuts

When viewing animations in the modal:

- **ESC**: Close modal viewer
- **Arrow Left**: Navigate to previous animation
- **Arrow Right**: Navigate to next animation
- **Click backdrop**: Close modal viewer

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized responsive layouts

Requires ES6+ support (modern browsers).

## Architecture

- **Static HTML**: No build step, deploy anywhere
- **Three.js r128**: 3D parallax and floating elements
- **GSAP 3.12.2**: Choreographed transitions
- **Google Fonts**: Playfair Display, Inter
- **iFrame Isolation**: Animations load in sandboxed iframes

## Performance

- Orthographic camera for consistent rendering
- RequestAnimationFrame for smooth 60fps
- Intersection Observer for scroll-triggered animations
- CSS transforms for GPU acceleration
- Minimal layout thrashing (no width/height animation)

## License

MIT License - Use freely for your projects.
