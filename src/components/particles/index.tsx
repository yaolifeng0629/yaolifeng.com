'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme/theme-provider';

interface ParticleEffectProps {
    particleCount?: number;
    minParticleSize?: number;
    maxParticleSize?: number;
    minSpeed?: number;
    maxSpeed?: number;
    fadeInDuration?: number;
}

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    opacity: number;
    fadeInStart: number;
    fadeInDuration: number;

    constructor(
        canvas: HTMLCanvasElement,
        color: string,
        minSize: number,
        maxSize: number,
        minSpeed: number,
        maxSpeed: number,
        fadeInDuration: number,
        delayIndex: number,
    ) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.speedY = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.color = color;
        this.opacity = 0;
        this.fadeInStart = performance.now() + delayIndex * 20;
        this.fadeInDuration = fadeInDuration;
    }

    update(canvas: HTMLCanvasElement, currentTime: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        if (currentTime >= this.fadeInStart) {
            const timePassed = currentTime - this.fadeInStart;
            this.opacity = Math.min(timePassed / this.fadeInDuration, 1);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function ParticleEffect({
    particleCount = 100,
    minParticleSize = 1,
    maxParticleSize = 3,
    minSpeed = 0.1,
    maxSpeed = 1,
    fadeInDuration = 2000,
}: ParticleEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let isCurrentlyDesktop = window.matchMedia('(min-width: 768px)').matches;
        const particleColor = theme === 'dark' ? '#ffffff' : '#000000';

        const initializeParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(
                    new Particle(
                        canvas,
                        particleColor,
                        minParticleSize,
                        maxParticleSize,
                        minSpeed,
                        maxSpeed,
                        fadeInDuration,
                        i,
                    ),
                );
            }
        };

        const resizeCanvas = () => {
            const wasDesktop = isCurrentlyDesktop;
            isCurrentlyDesktop = window.matchMedia('(min-width: 768px)').matches;

            if (isCurrentlyDesktop) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                if (!wasDesktop) {
                    initializeParticles();
                    if (!animationFrameRef.current) {
                        animationFrameRef.current = requestAnimationFrame(animate);
                    }
                }
            } else {
                canvas.width = 0;
                canvas.height = 0;
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = undefined;
                }
            }
        };

        const animate = (currentTime: number) => {
            if (!isCurrentlyDesktop) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update(canvas, currentTime);
                particle.draw(ctx);
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleOrientationChange = () => {
            setTimeout(resizeCanvas, 100);
        };
        window.addEventListener('orientationchange', handleOrientationChange);

        if (isCurrentlyDesktop) {
            initializeParticles();
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('orientationchange', handleOrientationChange);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [particleCount, minParticleSize, maxParticleSize, minSpeed, maxSpeed, fadeInDuration, theme]);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[0] hidden md:block" />;
}
