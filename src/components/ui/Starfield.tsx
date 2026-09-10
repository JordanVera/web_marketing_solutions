"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { seededRandom } from "@/lib/utils";

type StarfieldProps = {
  /** Stars per 10,000 px² of canvas. Higher = denser field. */
  density?: number;
  /** Vertical drift speed in px per second. */
  speed?: number;
  /** Occasional meteors streaking across the field. */
  shootingStars?: boolean;
  className?: string;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * A single <canvas> renders the whole star field, which keeps the DOM flat and
 * the animation on one rAF loop. The loop pauses when the tab is hidden or the
 * canvas scrolls out of view, and renders one static frame when the user has
 * asked for reduced motion.
 */
export function Starfield({
  density = 0.14,
  speed = 5,
  shootingStars = false,
  className,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const random = seededRandom(20240117);
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = performance.now();
    let visible = true;
    let onScreen = true;

    const buildStars = () => {
      const count = Math.round(((width * height) / 10000) * density);
      stars = Array.from({ length: count }, () => {
        const depth = random();
        return {
          x: random() * width,
          y: random() * height,
          radius: 0.35 + depth * 1.15,
          alpha: 0.25 + random() * 0.65,
          twinkleSpeed: 0.3 + random() * 1.1,
          twinklePhase: random() * Math.PI * 2,
          depth,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const spawnMeteor = () => {
      const fromLeft = random() > 0.5;
      const speedPx = 420 + random() * 260;
      meteors.push({
        x: fromLeft ? -60 : width * (0.4 + random() * 0.6),
        y: random() * height * 0.5,
        vx: speedPx,
        vy: speedPx * 0.35,
        life: 0,
        maxLife: 0.9 + random() * 0.5,
      });
    };

    const draw = (delta: number, elapsed: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? 1
          : 0.65 + 0.35 * Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase);

        if (!prefersReducedMotion) {
          // Nearer stars drift faster, which reads as depth.
          star.y += delta * speed * (0.25 + star.depth) * 0.35;
          if (star.y > height + 2) {
            star.y = -2;
            star.x = random() * width;
          }
        }

        ctx.globalAlpha = Math.min(1, star.alpha * twinkle);
        ctx.fillStyle = star.depth > 0.86 ? "#bcd4ff" : "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (shootingStars && !prefersReducedMotion) {
        meteors = meteors.filter((m) => m.life < m.maxLife && m.x < width + 200);
        for (const meteor of meteors) {
          meteor.life += delta;
          meteor.x += meteor.vx * delta;
          meteor.y += meteor.vy * delta;

          const fade = 1 - meteor.life / meteor.maxLife;
          const tailX = meteor.x - meteor.vx * 0.12;
          const tailY = meteor.y - meteor.vy * 0.12;
          const gradient = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          gradient.addColorStop(0, "rgba(124, 178, 255, 0)");
          gradient.addColorStop(1, `rgba(220, 236, 255, ${0.85 * fade})`);

          ctx.globalAlpha = 1;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (visible && onScreen) {
        draw(delta, now / 1000);
        if (shootingStars && !prefersReducedMotion && random() < delta * 0.28) {
          spawnMeteor();
        }
      }
      frame = requestAnimationFrame(loop);
    };

    resize();

    if (prefersReducedMotion) {
      // One static frame is enough; skip the rAF loop entirely.
      draw(0, 0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw(0, 0);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [density, speed, shootingStars, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
