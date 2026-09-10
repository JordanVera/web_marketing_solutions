/**
 * Optional abstract SVG fallbacks for /public/projects.
 * Live case studies now use JPG/PNG photos in that folder — only run this
 * if you need a placeholder before photography is ready.
 * `node scripts/generate-placeholders.mjs`
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "projects");

const PROJECTS = [
  { slug: "capturing-all-angles", label: "Capturing All Angles", hueA: "#e8e4dc", hueB: "#0066ff", seed: 11 },
  { slug: "legendary-barber", label: "Legendary Barber", hueA: "#C9A227", hueB: "#080808", seed: 23 },
];

const W = 1200;
const H = 900;

function seededRandom(seed) {
  let value = seed * 7919;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function svg({ slug, label, hueA, hueB, seed }) {
  const random = seededRandom(seed);

  const stars = Array.from({ length: 90 }, () => {
    const x = (random() * W).toFixed(1);
    const y = (random() * H).toFixed(1);
    const r = (0.6 + random() * 1.5).toFixed(2);
    const o = (0.15 + random() * 0.55).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${o}"/>`;
  }).join("");

  // Concentric orbital arcs anchored off-canvas for an asymmetric composition.
  const arcs = [340, 470, 610, 760]
    .map((r, i) => {
      const o = (0.22 - i * 0.04).toFixed(2);
      return `<circle cx="${W * 0.82}" cy="${H * 0.9}" r="${r}" fill="none" stroke="${hueA}" stroke-opacity="${o}" stroke-width="1.5" stroke-dasharray="${i % 2 ? "4 12" : "none"}"/>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label} case study artwork">
  <defs>
    <linearGradient id="base-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#050b16"/>
    </linearGradient>
    <radialGradient id="glowA-${slug}" cx="0.22" cy="0.18" r="0.62">
      <stop offset="0%" stop-color="${hueA}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${hueA}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB-${slug}" cx="0.85" cy="0.82" r="0.6">
      <stop offset="0%" stop-color="${hueB}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${hueB}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rim-${slug}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${hueA}" stop-opacity="0"/>
      <stop offset="50%" stop-color="#dbe8ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${hueB}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid-${slug}" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#7c9ed6" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#base-${slug})"/>
  <rect width="${W}" height="${H}" fill="url(#grid-${slug})"/>
  <g>${stars}</g>
  <rect width="${W}" height="${H}" fill="url(#glowA-${slug})"/>
  <rect width="${W}" height="${H}" fill="url(#glowB-${slug})"/>
  <g>${arcs}</g>

  <!-- Planet limb with a lit rim -->
  <circle cx="${W * 0.5}" cy="${H * 1.28}" r="${H * 0.82}" fill="#0a1628"/>
  <circle cx="${W * 0.5}" cy="${H * 1.28}" r="${H * 0.82}" fill="none" stroke="url(#rim-${slug})" stroke-width="3"/>
</svg>
`;
}

await mkdir(OUT_DIR, { recursive: true });
await Promise.all(
  PROJECTS.map((project) =>
    writeFile(path.join(OUT_DIR, `${project.slug}.svg`), svg(project), "utf8"),
  ),
);

console.log(`Generated ${PROJECTS.length} placeholders in public/projects`);
