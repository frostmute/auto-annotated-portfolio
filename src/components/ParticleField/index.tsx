import * as React from 'react';

/**
 * ParticleField — fixed-position canvas of drifting dots that draw hair-thin
 * connection lines when within range. Sits behind every page via _app.js.
 *
 * Color tokens pulled from content/data/style.json:
 *   primary    #8B5CF6 (violet)
 *   secondary  #7DD3FC (cyan)
 *   dark       #15151F (base)
 *
 * Respects prefers-reduced-motion (renders one static frame, no animation).
 */

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
    twinkle: number;
    twinkleSpeed: number;
};

const PARTICLE_COUNT = 80;
const LINK_DISTANCE = 120;       // px
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const MOUSE_RADIUS = 160;        // mouse-repel influence
const COLORS = ['#8B5CF6', '#7DD3FC', '#7DD3FC']; // weighted toward cyan

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.15, 0.15),
        vy: rand(-0.15, 0.15),
        r: rand(0.6, 1.6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        twinkle: Math.random(),
        twinkleSpeed: rand(0.005, 0.015)
    };
}

const ParticleField: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const particlesRef = React.useRef<Particle[]>([]);
    const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
        x: -9999,
        y: -9999,
        active: false
    });
    const rafRef = React.useRef<number | null>(null);
    const dprRef = React.useRef<number>(1);

    const reducedMotion = React.useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        dprRef.current = dpr;

        const resize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
            // Re-seed particles to new viewport
            particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
                createParticle(w, h)
            );
        };

        resize();
        window.addEventListener('resize', resize);

        const onMouse = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;
        };
        const onLeave = () => {
            mouseRef.current.active = false;
        };
        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('mouseout', onLeave);

        const draw = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update + draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse repel
                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / MOUSE_RADIUS) * 0.6;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                // Gentle velocity cap so things settle
                const vMax = 0.6;
                if (p.vx > vMax) p.vx = vMax;
                if (p.vx < -vMax) p.vx = -vMax;
                if (p.vy > vMax) p.vy = vMax;
                if (p.vy < -vMax) p.vy = -vMax;

                // Friction toward drift
                p.vx *= 0.985;
                p.vy *= 0.985;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap
                if (p.x < -4) p.x = w + 4;
                else if (p.x > w + 4) p.x = -4;
                if (p.y < -4) p.y = h + 4;
                else if (p.y > h + 4) p.y = -4;

                // Twinkle alpha
                p.twinkle += p.twinkleSpeed;
                const alpha = 0.4 + Math.sin(p.twinkle) * 0.35;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0.1, alpha);
                ctx.fill();
            }

            // Reset alpha before drawing lines
            ctx.globalAlpha = 1;

            // Links
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < LINK_DISTANCE_SQ) {
                        const alpha = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
                        ctx.strokeStyle = '#7DD3FC';
                        ctx.globalAlpha = alpha * 0.18;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
        };

        if (reducedMotion) {
            // One frame, then stop.
            draw();
        } else {
            const tick = () => {
                draw();
                rafRef.current = requestAnimationFrame(tick);
            };
            rafRef.current = requestAnimationFrame(tick);
        }

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('mouseout', onLeave);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [reducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                // Subtle gradient veil so particles stay behind the dark base
                // and don't punch through light sections (.colors-b etc.).
                maskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.6) 100%)',
                WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.6) 100%)'
            }}
        />
    );
};

export default ParticleField;