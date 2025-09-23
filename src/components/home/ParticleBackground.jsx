// src/components/ParticleBackground.jsx
"use client";

import { useRef, useEffect } from 'react';

export default function ParticleBackground({ 
  color = "rgba(255, 255, 255, 0.8)",
  density = 60,
  speed = 0.5,
  connectionRadius = 150,
  particleSize = 1.5,
  connectionOpacity = 0.15,
  particleOpacity = 0.7,
  responsive = true,
  mouseInteraction = true,
  className = ""
}) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let animationFrameId;
    let particles = [];
    let mousePosition = { x: undefined, y: undefined };
    let dpr = window.devicePixelRatio || 1;
    
    // Set canvas size with higher resolution for retina displays
    const setCanvasSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      // Set display size (css pixels)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      
      // Normalize coordinate system to use CSS pixels
      ctx.scale(dpr, dpr);
    };
    
    // Create particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * particleSize + particleSize / 2;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 5;
        this.opacity = Math.random() * particleOpacity + 0.2;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = color.replace(')', `, ${this.opacity})`).replace('rgba', 'rgba');
        ctx.fill();
      }
      
      update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width / dpr) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width / dpr;
        }
        
        if (this.y > canvas.height / dpr) {
          this.y = 0;
        } else if (this.y < 0) {
          this.y = canvas.height / dpr;
        }
        
        // Mouse interaction
        if (mouseInteraction && mousePosition.x !== undefined && mousePosition.y !== undefined) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = 120;
            const force = (maxDistance - distance) / maxDistance;
            
            const directionX = forceDirectionX * force * this.density * 0.6;
            const directionY = forceDirectionY * force * this.density * 0.6;
            
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }
    
    // Initialize particles
    const init = () => {
      particles = [];
      const particleCount = Math.min(
        Math.ceil((canvas.width * canvas.height) / (responsive ? 15000 : 10000) * density),
        300 // Maximum particles cap for performance
      );
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * (canvas.width / dpr);
        const y = Math.random() * (canvas.height / dpr);
        particles.push(new Particle(x, y));
      }
    };
    
    // Connect particles with lines based on proximity
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionRadius) {
            // Calculate line opacity based on distance
            const opacity = 1 - (distance / connectionRadius);
            
            ctx.beginPath();
            ctx.strokeStyle = color.replace(')', `, ${opacity * connectionOpacity})`).replace('rgba', 'rgba');
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connect();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.x = (e.clientX - rect.left);
      mousePosition.y = (e.clientY - rect.top);
    };
    
    const handleMouseLeave = () => {
      mousePosition.x = undefined;
      mousePosition.y = undefined;
    };
    
    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      init();
    };
    
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = (touch.clientX - rect.left);
        mousePosition.y = (touch.clientY - rect.top);
      }, { passive: false });
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = (touch.clientX - rect.left);
        mousePosition.y = (touch.clientY - rect.top);
      }, { passive: false });
      canvas.addEventListener('touchend', () => {
        mousePosition.x = undefined;
        mousePosition.y = undefined;
      });
    }
    
    // Initialize canvas and animation
    setCanvasSize();
    init();
    animate();
    
    // Clean up event listeners and animation on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchstart', handleMouseMove);
        canvas.removeEventListener('touchmove', handleMouseMove);
        canvas.removeEventListener('touchend', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, density, speed, connectionRadius, particleSize, connectionOpacity, particleOpacity, responsive, mouseInteraction]);
  
  return (
    <canvas 
      ref={canvasRef}
      className={`fixed inset-0 -z-10 w-full h-full ${className}`}
      style={{ pointerEvents: mouseInteraction ? 'auto' : 'none' }}
    />
  );
}