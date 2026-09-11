/**
 * Bright stars and stick-figure lines for constellations you can actually
 * pick out. Coordinates are J2000 RA/Dec in degrees.
 *
 * Circumpolar figures (Ursa Major, Ursa Minor, Cassiopeia) share one
 * north-celestial-pole projection so the Dipper's pointers still aim at
 * Polaris and Cassiopeia sits opposite — the same geometry as the real sky.
 * Orion and Cygnus are local tangent patches, placed as separate groups.
 */

export type CatalogStar = {
  id: string;
  name: string;
  ra: number;
  dec: number;
  mag: number;
  northStar?: boolean;
};

export type ConstellationDef = {
  id: string;
  name: string;
  frame: "polar" | "local";
  /** Center of the local tangent patch (ignored for polar). */
  origin?: { ra: number; dec: number };
  stars: CatalogStar[];
  lines: [string, string][];
};

export type PlacedStar = {
  id: string;
  name: string;
  x: number;
  y: number;
  mag: number;
  northStar: boolean;
};

export type PlacedLine = {
  from: string;
  to: string;
};

const POLAR: ConstellationDef[] = [
  {
    id: "umi",
    name: "Ursa Minor",
    frame: "polar",
    stars: [
      { id: "polaris", name: "Polaris", ra: 37.95, dec: 89.26, mag: 1.97, northStar: true },
      { id: "yildun", name: "Yildun", ra: 263.05, dec: 86.59, mag: 4.35 },
      { id: "eps-umi", name: "ε UMi", ra: 251.49, dec: 82.04, mag: 4.21 },
      { id: "zet-umi", name: "ζ UMi", ra: 236.02, dec: 77.79, mag: 4.32 },
      { id: "eta-umi", name: "η UMi", ra: 244.38, dec: 75.76, mag: 4.95 },
      { id: "pherkad", name: "Pherkad", ra: 230.18, dec: 71.83, mag: 3.0 },
      { id: "kochab", name: "Kochab", ra: 222.68, dec: 74.16, mag: 2.07 },
    ],
    lines: [
      ["polaris", "yildun"],
      ["yildun", "eps-umi"],
      ["eps-umi", "zet-umi"],
      ["zet-umi", "eta-umi"],
      ["eta-umi", "pherkad"],
      ["pherkad", "kochab"],
      ["kochab", "zet-umi"],
    ],
  },
  {
    id: "uma",
    name: "Ursa Major",
    frame: "polar",
    stars: [
      { id: "dubhe", name: "Dubhe", ra: 165.93, dec: 61.75, mag: 1.79 },
      { id: "merak", name: "Merak", ra: 165.46, dec: 56.38, mag: 2.34 },
      { id: "phecda", name: "Phecda", ra: 178.46, dec: 53.69, mag: 2.41 },
      { id: "megrez", name: "Megrez", ra: 183.86, dec: 57.03, mag: 3.32 },
      { id: "alioth", name: "Alioth", ra: 193.51, dec: 55.96, mag: 1.76 },
      { id: "mizar", name: "Mizar", ra: 200.98, dec: 54.93, mag: 2.23 },
      { id: "alkaid", name: "Alkaid", ra: 206.89, dec: 49.31, mag: 1.85 },
    ],
    lines: [
      ["dubhe", "merak"],
      ["merak", "phecda"],
      ["phecda", "megrez"],
      ["megrez", "dubhe"],
      ["megrez", "alioth"],
      ["alioth", "mizar"],
      ["mizar", "alkaid"],
    ],
  },
  {
    id: "cas",
    name: "Cassiopeia",
    frame: "polar",
    stars: [
      { id: "caph", name: "Caph", ra: 2.29, dec: 59.15, mag: 2.28 },
      { id: "schedar", name: "Schedar", ra: 10.13, dec: 56.54, mag: 2.24 },
      { id: "gamma-cas", name: "γ Cas", ra: 14.18, dec: 60.72, mag: 2.15 },
      { id: "ruchbah", name: "Ruchbah", ra: 21.45, dec: 60.24, mag: 2.66 },
      { id: "segin", name: "Segin", ra: 28.6, dec: 63.67, mag: 3.35 },
    ],
    lines: [
      ["caph", "schedar"],
      ["schedar", "gamma-cas"],
      ["gamma-cas", "ruchbah"],
      ["ruchbah", "segin"],
    ],
  },
];

const LOCAL: ConstellationDef[] = [
  {
    id: "ori",
    name: "Orion",
    frame: "local",
    origin: { ra: 84.05, dec: -1.2 },
    stars: [
      { id: "meissa", name: "Meissa", ra: 83.78, dec: 9.93, mag: 3.39 },
      { id: "betelgeuse", name: "Betelgeuse", ra: 88.79, dec: 7.41, mag: 0.5 },
      { id: "bellatrix", name: "Bellatrix", ra: 81.28, dec: 6.35, mag: 1.64 },
      { id: "mintaka", name: "Mintaka", ra: 83.0, dec: -0.3, mag: 2.25 },
      { id: "alnilam", name: "Alnilam", ra: 84.05, dec: -1.2, mag: 1.69 },
      { id: "alnitak", name: "Alnitak", ra: 85.19, dec: -1.94, mag: 1.74 },
      { id: "rigel", name: "Rigel", ra: 78.63, dec: -8.2, mag: 0.18 },
      { id: "saiph", name: "Saiph", ra: 86.94, dec: -9.67, mag: 2.07 },
    ],
    lines: [
      ["meissa", "bellatrix"],
      ["meissa", "betelgeuse"],
      ["bellatrix", "mintaka"],
      ["betelgeuse", "alnitak"],
      ["mintaka", "alnilam"],
      ["alnilam", "alnitak"],
      ["mintaka", "rigel"],
      ["alnitak", "saiph"],
      ["rigel", "saiph"],
    ],
  },
  {
    id: "cyg",
    name: "Cygnus",
    frame: "local",
    origin: { ra: 305.56, dec: 40.26 },
    stars: [
      { id: "deneb", name: "Deneb", ra: 310.36, dec: 45.28, mag: 1.25 },
      { id: "sadr", name: "Sadr", ra: 305.56, dec: 40.26, mag: 2.23 },
      { id: "gienah", name: "Gienah", ra: 311.55, dec: 33.97, mag: 2.48 },
      { id: "delta-cyg", name: "δ Cyg", ra: 296.24, dec: 45.13, mag: 2.87 },
      { id: "albireo", name: "Albireo", ra: 292.68, dec: 27.96, mag: 3.05 },
    ],
    lines: [
      ["deneb", "sadr"],
      ["sadr", "albireo"],
      ["delta-cyg", "sadr"],
      ["sadr", "gienah"],
    ],
  },
];

const DEG = Math.PI / 180;

/** Azimuthal equidistant projection around the north celestial pole. */
function projectPolar(ra: number, dec: number) {
  const r = 90 - dec;
  const theta = ra * DEG;
  return {
    x: r * Math.sin(theta),
    y: -r * Math.cos(theta),
  };
}

/** Tangent patch: RA increases to the left, the way the sky looks. */
function projectLocal(
  ra: number,
  dec: number,
  origin: { ra: number; dec: number },
) {
  const cosDec = Math.cos(origin.dec * DEG);
  return {
    x: -(ra - origin.ra) * cosDec,
    y: -(dec - origin.dec),
  };
}

function rotate(x: number, y: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c };
}

function placeGroup(
  defs: ConstellationDef[],
  project: (star: CatalogStar, def: ConstellationDef) => { x: number; y: number },
  originX: number,
  originY: number,
  scale: number,
  angle = 0,
) {
  const stars: PlacedStar[] = [];
  const lines: PlacedLine[] = [];

  for (const def of defs) {
    for (const star of def.stars) {
      const raw = project(star, def);
      const spun = angle ? rotate(raw.x, raw.y, angle) : raw;
      stars.push({
        id: star.id,
        name: star.name,
        x: originX + spun.x * scale,
        y: originY + spun.y * scale,
        mag: star.mag,
        northStar: Boolean(star.northStar),
      });
    }
    for (const [from, to] of def.lines) {
      lines.push({ from, to });
    }
  }

  return { stars, lines };
}

/**
 * Lay the catalog onto a canvas. Polar figures sit in the upper sky with
 * Polaris as the pivot; Orion and Cygnus take the remaining open corners.
 */
export function placeConstellations(width: number, height: number) {
  const pad = Math.min(width, height) * 0.06;
  const skyBottom = height * 0.7;

  const poleX = width * 0.55;
  const poleY = height * 0.24;
  // +90° puts the Dipper left of Polaris and Cassiopeia to the right.
  const polarAngle = Math.PI / 2;
  let polarScale = Math.min(width, height) * 0.01;

  const fitPolar = (scale: number) =>
    placeGroup(
      POLAR,
      (star) => projectPolar(star.ra, star.dec),
      poleX,
      poleY,
      scale,
      polarAngle,
    );

  let polar = fitPolar(polarScale);
  const polarOff = polar.stars.some(
    (s) =>
      s.x < pad || s.x > width - pad || s.y < pad || s.y > skyBottom,
  );
  if (polarOff) {
    polarScale *= 0.78;
    polar = fitPolar(polarScale);
  }

  const orionScale = Math.min(width, height) * 0.016;
  const orion = placeGroup(
    [LOCAL[0]],
    (star, def) => projectLocal(star.ra, star.dec, def.origin!),
    width * 0.2,
    height * 0.52,
    orionScale,
  );

  const cygScale = Math.min(width, height) * 0.018;
  const cygnus = placeGroup(
    [LOCAL[1]],
    (star, def) => projectLocal(star.ra, star.dec, def.origin!),
    width * 0.84,
    height * 0.22,
    cygScale,
  );

  return {
    stars: [...polar.stars, ...orion.stars, ...cygnus.stars],
    lines: [...polar.lines, ...orion.lines, ...cygnus.lines],
  };
}

export function magnitudeRadius(mag: number, northStar = false) {
  if (northStar) return 2.9;
  return Math.max(0.6, 2.2 - mag * 0.36);
}

export function magnitudeAlpha(mag: number, northStar = false) {
  if (northStar) return 1;
  return Math.min(0.98, 0.48 + (4.2 - mag) * 0.13);
}
