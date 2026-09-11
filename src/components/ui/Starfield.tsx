"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  magnitudeAlpha,
  magnitudeRadius,
  placeConstellations,
} from "@/lib/constellations";
import { cn, seededRandom } from "@/lib/utils";

type StarfieldProps = {
  /** Stars per 10,000 px² of canvas. Higher = denser field. */
  density?: number;
  /** Vertical drift speed in px per second. */
  speed?: number;
  /** Occasional meteors streaking across the field. */
  shootingStars?: boolean;
  /** Overlay real constellations and a brighter North Star. */
  constellations?: boolean;
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
  color: string;
  northStar?: boolean;
  locked?: boolean;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

type SkyLine = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
};

const LINE_COLOR = "rgba(186, 210, 245, 0.2)";

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
  constellations = false,
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
    let lines: SkyLine[] = [];
    let meteors: Meteor[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = performance.now();
    let visible = true;
    let onScreen = true;

    const tooCloseToNamed = (x: number, y: number, named: Star[]) => {
      const minDist = Math.min(width, height) * 0.028;
      const minDistSq = minDist * minDist;
      return named.some((star) => {
        const dx = star.x - x;
        const dy = star.y - y;
        return dx * dx + dy * dy < minDistSq;
      });
    };

    const buildStars = () => {
      const named: Star[] = [];
      lines = [];

      if (constellations) {
        const placed = placeConstellations(width, height);
        const byId = new Map<string, Star>();

        for (const star of placed.stars) {
          const next: Star = {
            x: star.x,
            y: star.y,
            radius: magnitudeRadius(star.mag, star.northStar),
            alpha: magnitudeAlpha(star.mag, star.northStar),
            twinkleSpeed: star.northStar ? 0.35 : 0.22 + random() * 0.45,
            twinklePhase: random() * Math.PI * 2,
            depth: star.northStar ? 1 : Math.max(0.55, 1 - star.mag / 6),
            color: star.northStar ? "#fff6e4" : star.mag < 1.2 ? "#f4f7ff" : "#dce8ff",
            northStar: star.northStar,
            locked: true,
          };
          named.push(next);
          byId.set(star.id, next);
        }

        for (const line of placed.lines) {
          const a = byId.get(line.from);
          const b = byId.get(line.to);
          if (a && b) {
            lines.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y });
          }
        }
      }

      const count = Math.round(((width * height) / 10000) * density);
      const field: Star[] = [];
      let attempts = 0;
      while (field.length < count && attempts < count * 4) {
        attempts += 1;
        const depth = random();
        const x = random() * width;
        const y = random() * height;
        if (constellations && tooCloseToNamed(x, y, named)) continue;

        const bright = random() > 0.92;
        field.push({
          x,
          y,
          radius: bright ? 0.7 + depth * 0.7 : 0.28 + depth * 0.7,
          alpha: bright ? 0.55 + random() * 0.35 : 0.16 + random() * 0.45,
          twinkleSpeed: 0.3 + random() * 1.1,
          twinklePhase: random() * Math.PI * 2,
          depth,
          color: depth > 0.86 ? "#bcd4ff" : "#ffffff",
        });
      }

      stars = [...field, ...named];
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

    const drawNorthStar = (star: Star, elapsed: number) => {
      const pulse = prefersReducedMotion
        ? 1
        : 0.86 + 0.14 * Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase);
      const { x, y } = star;
      const halo = 20 * pulse;

      const glow = ctx.createRadialGradient(x, y, 0, x, y, halo);
      glow.addColorStop(0, `rgba(255, 246, 220, ${0.72 * pulse})`);
      glow.addColorStop(0.22, `rgba(210, 226, 255, ${0.32 * pulse})`);
      glow.addColorStop(1, "rgba(160, 190, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, halo, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = `rgba(255, 248, 230, ${0.55 * pulse})`;
      ctx.lineCap = "round";
      for (const angle of [0, Math.PI / 2]) {
        ctx.rotate(angle);
        const spike = ctx.createLinearGradient(-18 * pulse, 0, 18 * pulse, 0);
        spike.addColorStop(0, "rgba(255, 246, 220, 0)");
        spike.addColorStop(0.5, `rgba(255, 248, 230, ${0.7 * pulse})`);
        spike.addColorStop(1, "rgba(255, 246, 220, 0)");
        ctx.strokeStyle = spike;
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        ctx.moveTo(-18 * pulse, 0);
        ctx.lineTo(18 * pulse, 0);
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(x, y, star.radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (delta: number, elapsed: number) => {
      ctx.clearRect(0, 0, width, height);

      if (lines.length) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 0.75;
        ctx.lineCap = "round";
        ctx.beginPath();
        for (const line of lines) {
          ctx.moveTo(line.ax, line.ay);
          ctx.lineTo(line.bx, line.by);
        }
        ctx.stroke();
      }

      for (const star of stars) {
        if (star.northStar) {
          drawNorthStar(star, elapsed);
          continue;
        }

        const twinkle = prefersReducedMotion
          ? 1
          : 0.65 + 0.35 * Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase);

        if (!prefersReducedMotion && !star.locked && !constellations) {
          // Nearer stars drift faster, which reads as depth.
          star.y += delta * speed * (0.25 + star.depth) * 0.35;
          if (star.y > height + 2) {
            star.y = -2;
            star.x = random() * width;
          }
        }

        ctx.globalAlpha = Math.min(1, star.alpha * twinkle);
        ctx.fillStyle = star.color;
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
  }, [density, speed, shootingStars, constellations, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
