import { useEffect, useRef } from 'react';

const scenes = {
  about: {
    shape: [1.03, 1.03, .43, 1, .8, .08, .24, .08],
    camera: [-.62, -.36, -.26], point: [.755, .48, .91], compact: [.5, .74, .93],
    paper: [21, 22, 16], accent: [222, 246, 88], hue: 76, wire: .28,
  },
  projects: {
    shape: [1.01, .91, .26, .34, .29, .04, .13, 0],
    camera: [-.27, -1, .63], point: [.827, .3, .69], compact: [.8, .22, .62],
    paper: [20, 27, 25], accent: [165, 255, 198], hue: 154, wire: .5,
  },
  lab: {
    shape: [1.34, .88, .17, 1, .42, .18, 1.24, 1],
    camera: [.58, -.3, 1.08], point: [.813, .35, .86], compact: [.79, .21, .67],
    paper: [29, 23, 44], accent: [207, 171, 255], hue: 264, wire: .47,
  },
  experience: {
    shape: [.68, 1.27, .29, .7, .43, .08, .79, 2],
    camera: [-.64, .29, 1.68], point: [.833, .34, .76], compact: [.82, .22, .63],
    paper: [35, 26, 22], accent: [255, 194, 143], hue: 28, wire: .32,
  },
  credentials: {
    shape: [1.11, .94, .19, .52, .56, .06, .47, 1],
    camera: [.64, .28, 2.19], point: [.808, .28, .66], compact: [.79, .22, .6],
    paper: [21, 33, 41], accent: [168, 232, 255], hue: 193, wire: .6,
  },
  contact: {
    shape: [.79, .83, .42, .65, .53, .06, .39, 0],
    camera: [.4, .76, 2.76], point: [.822, .34, .73], compact: [.77, .22, .67],
    paper: [22, 24, 15], accent: [231, 250, 124], hue: 76, wire: .35,
  },
};

const segments = 40;
const sides = 14;
const turn = Math.PI * 2;

const parameters = Array.from({ length: segments * sides }, (_, index) => ({
  u: Math.floor(index / sides) / segments * turn,
  v: (index % sides) / sides * turn,
}));

const faces = parameters.map((_, index) => {
  const ring = Math.floor(index / sides);
  const side = index % sides;
  const nextRing = (ring + 1) % segments * sides;
  const nextSide = (side + 1) % sides;
  return [index, nextRing + side, nextRing + nextSide, ring * sides + nextSide];
});

const clamp = (value) => Math.max(0, Math.min(1, value));
const mix = (start, end, weight) => start + (end - start) * weight;
const mixList = (first, second, weight) => first.map((value, index) => mix(value, second[index], weight));
const curved = (value, power) => Math.sign(value) * Math.abs(value) ** power;
const color = (channels) => `rgb(${channels.map(Math.round).join(', ')})`;

function mesh([radiusX, radiusY, thickness, corners, profile, ridge, bend, twists]) {
  return parameters.map(({ u, v }) => {
    const c = Math.cos(u);
    const s = Math.sin(u);
    const spin = v + u * twists;
    const radius = thickness + Math.cos(3 * u) * ridge;
    const across = curved(Math.cos(spin), profile) * radius;
    const rise = curved(Math.sin(spin), profile) * radius;
    return [
      radiusX * curved(c, corners) + c * across,
      radiusY * curved(s, corners) + s * across,
      rise + Math.sin(u * 2) * bend * .5,
    ];
  });
}

function rotate([x, y, z], angles) {
  const { cosX, sinX, cosY, sinY, cosZ, sinZ } = angles;
  const yy = y * cosX - z * sinX;
  const zz = y * sinX + z * cosX;
  const xx = x * cosY + zz * sinY;
  return [xx * cosZ - yy * sinZ, xx * sinZ + yy * cosZ, -x * sinY + zz * cosY];
}

function paint(context, width, height, from, to, weight, compact) {
  const [pitch, yaw, roll] = mixList(from.camera, to.camera, weight);
  const [x, y, magnification] = mixList(compact ? from.compact : from.point, compact ? to.compact : to.point, weight);
  const angles = {
    cosX: Math.cos(pitch), sinX: Math.sin(pitch),
    cosY: Math.cos(yaw), sinY: Math.sin(yaw),
    cosZ: Math.cos(roll), sinZ: Math.sin(roll),
  };
  const targetScale = Math.min(width, height) / 4.15 * magnification;
  const chapterLimit = compact ? .174 : .126;
  const heroLimit = compact ? .43 : .224;
  const limit = mix(from === scenes.about ? heroLimit : chapterLimit, to === scenes.about ? heroLimit : chapterLimit, weight);
  const rotated = from.vertices.map((point, index) => rotate(mixList(point, to.vertices[index], weight), angles));
  const halfWidth = rotated.reduce((extent, [rx, , rz]) => Math.max(extent, Math.abs(rx * 6 / (6 - rz))), 0);
  const scale = Math.min(targetScale, width * limit / halfWidth);
  const hue = mix(from.hue, to.hue, weight);
  const wire = mix(from.wire, to.wire, weight);
  const points = rotated.map(([rx, ry, rz]) => {
    const perspective = 6 / (6 - rz) * scale;
    return { x: rx, y: ry, z: rz, sx: rx * perspective, sy: ry * perspective };
  });
  const surfaces = faces.map(([a, b, c, d]) => {
    const corners = [points[a], points[b], points[c], points[d]];
    return { corners, depth: corners.reduce((sum, point) => sum + point.z, 0) };
  }).sort((a, b) => a.depth - b.depth);

  context.clearRect(0, 0, width, height);
  context.save();
  context.translate(width * x, height * y);
  context.lineWidth = compact ? .52 : .71;
  for (const { corners: [a, b, c, d], depth } of surfaces) {
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const abz = b.z - a.z;
    const adx = d.x - a.x;
    const ady = d.y - a.y;
    const adz = d.z - a.z;
    const normalX = aby * adz - abz * ady;
    const normalY = abz * adx - abx * adz;
    const normalZ = abx * ady - aby * adx;
    const normalLength = Math.hypot(normalX, normalY, normalZ) || 1;
    const light = clamp((-.32 * normalX - .63 * normalY + .7 * normalZ) / normalLength);
    const highlight = light ** 6;
    const faceHue = hue + (1 - light) * 19;
    const value = 13 + light * 43 + highlight * 21 + depth * 1.25;

    context.beginPath();
    context.moveTo(a.sx, a.sy);
    context.lineTo(b.sx, b.sy);
    context.lineTo(c.sx, c.sy);
    context.lineTo(d.sx, d.sy);
    context.closePath();
    context.fillStyle = `hsl(${faceHue} ${72 - highlight * 24}% ${value}%)`;
    context.strokeStyle = `hsla(${faceHue - 8} 81% ${value + 17}% / ${wire})`;
    context.fill();
    context.stroke();
  }
  context.restore();
}

Object.values(scenes).forEach((scene) => {
  scene.vertices = mesh(scene.shape);
});

export default function SignalObject() {
  const canvas = useRef(null);

  useEffect(() => {
    const surface = canvas.current;
    const home = surface.closest('.folio-home');
    if (!home) return;

    const nodes = [...home.querySelectorAll('[data-chapter]')].filter((node) => scenes[node.id]);
    if (nodes.length === 0) return;

    const context = surface.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrowViewport = window.matchMedia('(max-width: 760px)');
    let geometry = [];
    let width = 0;
    let height = 0;
    let firstScroll = 0;
    let lastScroll = 0;
    let dirty = true;
    let frame = null;
    let painted = '';

    function measure() {
      const { width: nextWidth, height: nextHeight } = surface.getBoundingClientRect();
      if (context && nextWidth > 0 && nextHeight > 0) {
        const density = Math.min(window.devicePixelRatio || 1, 1.75);
        surface.width = Math.max(1, Math.round(nextWidth * density));
        surface.height = Math.max(1, Math.round(nextHeight * density));
        context.setTransform(density, 0, 0, density, 0, 0);
      }
      width = nextWidth;
      height = nextHeight;
      const viewport = window.innerHeight;
      const scroll = window.scrollY;
      const homeBounds = home.getBoundingClientRect();
      firstScroll = Math.max(0, homeBounds.top + scroll - viewport * .2);
      lastScroll = Math.max(firstScroll + 1, homeBounds.bottom + scroll - viewport);
      const finalMark = Math.max(firstScroll + 1, lastScroll - viewport * .09);
      geometry = nodes.map((node) => {
        const bounds = node.getBoundingClientRect();
        const top = bounds.top + scroll;
        const bottom = bounds.bottom + scroll;
        const mark = Math.max(firstScroll, Math.min(finalMark, top - viewport * .26));
        return { node, scene: scenes[node.id], top, bottom, mark };
      });
      dirty = false;
      painted = '';
    }

    function draw() {
      frame = null;
      if (document.hidden) return;
      if (dirty) measure();

      const reduced = reducedMotion.matches;
      const scroll = reduced ? firstScroll : Math.max(firstScroll, Math.min(window.scrollY, lastScroll));
      const viewport = window.innerHeight;
      let index = 0;
      while (!reduced && index < geometry.length - 1 && scroll >= geometry[index + 1].mark) index += 1;
      const current = geometry[index];
      const next = geometry[Math.min(index + 1, geometry.length - 1)];
      const fraction = clamp((scroll - current.mark) / Math.max(next.mark - current.mark, 1));
      const transition = fraction * fraction * (3 - 2 * fraction);

      if (reduced) {
        home.style.removeProperty('--story-progress');
        home.style.removeProperty('--story-accent');
        home.style.removeProperty('--story-paper');
        home.removeAttribute('data-active-chapter');
        geometry.forEach(({ node }) => clearChapter(node));
      } else {
        home.style.setProperty('--story-progress', clamp((scroll - firstScroll) / (lastScroll - firstScroll)).toFixed(4));
        home.style.setProperty('--story-accent', color(mixList(current.scene.accent, next.scene.accent, transition)));
        home.style.setProperty('--story-paper', color(mixList(current.scene.paper, next.scene.paper, transition)));
        home.dataset.activeChapter = (fraction < .5 ? current : next).node.id;

        geometry.forEach(({ node, top, bottom }) => {
          const progress = clamp((scroll + viewport * .36 - top) / Math.max(bottom - top, 1));
          const entry = clamp((scroll + viewport * .95 - top) / (viewport * .62));
          const shift = (1 - entry) * 56 - progress * 27;
          node.style.setProperty('--chapter-progress', progress.toFixed(4));
          node.style.setProperty('--chapter-entry', entry.toFixed(4));
          node.style.setProperty('--chapter-shift', `${shift.toFixed(2)}px`);
        });
      }

      const signature = `${index}/${transition.toFixed(4)}/${narrowViewport.matches}`;
      if (context && width > 0 && height > 0 && painted !== signature) {
        paint(context, width, height, current.scene, next.scene, transition, narrowViewport.matches);
        painted = signature;
      }
    }

    function clearChapter(node) {
      node.style.removeProperty('--chapter-entry');
      node.style.removeProperty('--chapter-progress');
      node.style.removeProperty('--chapter-shift');
    }

    function schedule() {
      if (frame === null) frame = window.requestAnimationFrame(draw);
    }

    function onScroll() {
      if (!reducedMotion.matches) schedule();
    }

    function invalidate() {
      dirty = true;
      schedule();
    }

    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(invalidate) : null;
    observer?.observe(surface);
    observer?.observe(home);
    nodes.forEach((node) => observer?.observe(node));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', invalidate);
    document.addEventListener('visibilitychange', invalidate);
    reducedMotion.addEventListener?.('change', invalidate);
    schedule();

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', invalidate);
      document.removeEventListener('visibilitychange', invalidate);
      reducedMotion.removeEventListener?.('change', invalidate);
      if (frame !== null) window.cancelAnimationFrame(frame);
      nodes.forEach(clearChapter);
      home.style.removeProperty('--story-progress');
      home.style.removeProperty('--story-accent');
      home.style.removeProperty('--story-paper');
      home.removeAttribute('data-active-chapter');
    };
  }, []);

  return (
    <div className="folio-scroll-stage" aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
