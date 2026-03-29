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