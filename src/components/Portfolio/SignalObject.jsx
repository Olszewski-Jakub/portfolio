import { useEffect, useRef, useState } from 'react';

const forms = [
  { name: 'Loop', radius: 1.08, tube: .45, ripple: .06, twist: 0, hue: 76 },
  { name: 'Fold', radius: .83, tube: .61, ripple: .29, twist: 1.1, hue: 263 },
  { name: 'Orbit', radius: 1.25, tube: .24, ripple: .16, twist: .56, hue: 183 },
];
const rings = 48;
const sides = 18;
const tau = Math.PI * 2;

function mesh(view, pose, size) {
  const points = [];
  const sinX = Math.sin(pose.x);
  const cosX = Math.cos(pose.x);
  const sinY = Math.sin(pose.y);
  const cosY = Math.cos(pose.y);
  const scale = size / 4.05;

  for (let ring = 0; ring < rings; ring += 1) {
    const angle = ring / rings * tau;
    const ridge = Math.cos(angle * 3) * view.ripple;
    for (let side = 0; side < sides; side += 1) {
      const section = side / sides * tau;
      const tube = view.tube + ridge;
      const radial = view.radius + tube * Math.cos(section);
      const x = radial * Math.cos(angle);
      const y = radial * Math.sin(angle);
      const z = tube * Math.sin(section) + Math.sin(angle * 2) * view.twist * .5;
      const tiltedY = y * cosX - z * sinX;
      const tiltedZ = y * sinX + z * cosX;
      const rotatedX = x * cosY + tiltedZ * sinY;
      const depth = -x * sinY + tiltedZ * cosY;
      const perspective = 5 / (5 - depth);
      points.push({ x: rotatedX * scale * perspective, y: tiltedY * scale * perspective, z: depth });
    }
  }
  return points;
}

const faces = Array.from({ length: rings * sides }, (_, index) => {
  const ring = Math.floor(index / sides);
  const side = index % sides;
  const nextRing = (ring + 1) % rings * sides;
  const nextSide = (side + 1) % sides;
  return [index, nextRing + side, nextRing + nextSide, ring * sides + nextSide];
});

function paint(context, width, height, view, pose) {
  const points = mesh(view, pose, Math.min(width, height));
  const surfaces = faces.map((indices) => {
    const corners = indices.map((index) => points[index]);
    return { corners, depth: corners.reduce((sum, point) => sum + point.z, 0) };
  }).sort((a, b) => a.depth - b.depth);

  context.clearRect(0, 0, width, height);
  context.save();
  context.translate(width / 2, height / 2);
  context.lineWidth = .7;
  for (const { corners: [a, b, c, d], depth } of surfaces) {
    const light = Math.max(0, Math.min(1, (a.y - c.y + b.x - d.x) / 88 + depth / 15 + .48));
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.lineTo(c.x, c.y);
    context.lineTo(d.x, d.y);
    context.closePath();
    context.fillStyle = `hsl(${view.hue + light * 18} 74% ${17 + light * 46}%)`;
    context.strokeStyle = `hsl(${view.hue + light * 18} 64% ${23 + light * 47}%)`;
    context.fill();
    context.stroke();
  }
  context.restore();
}

export default function SignalObject() {
  const [selected, setSelected] = useState(0);
  const canvas = useRef(null);
  const controls = useRef(null);

  useEffect(() => {
    const surface = canvas.current;
    const context = surface.getContext('2d');
    if (!context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rest = { x: -.57, y: -.34 };
    let current = { ...forms[0] };
    let pose = { ...rest };
    let target = forms[0];
    let camera = rest;
    let width = 1;
    let height = 1;
    let frame = 0;
    let previousTime = 0;

    function tick(time) {
      frame = 0;
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16;
      const amount = reduced.matches ? 1 : 1 - Math.exp(-elapsed / 88);
      let moving = false;

      for (const key of ['radius', 'tube', 'ripple', 'twist', 'hue']) {
        const delta = target[key] - current[key];
        current[key] += delta * amount;
        moving ||= Math.abs(delta) > .025;
      }
      for (const key of ['x', 'y']) {
        const delta = camera[key] - pose[key];
        pose[key] += delta * amount;
        moving ||= Math.abs(delta) > .002;
      }

      paint(context, width, height, current, pose);
      previousTime = moving && !reduced.matches ? time : 0;
      if (previousTime) schedule();
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function resize() {
      const bounds = surface.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      surface.width = Math.max(1, Math.round(width * density));
      surface.height = Math.max(1, Math.round(height * density));
      context.setTransform(density, 0, 0, density, 0, 0);
      schedule();
    }

    function onPreference() {
      camera = rest;
      schedule();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    reduced.addEventListener('change', onPreference);
    controls.current = {
      select(index, animate) {
        target = forms[index];
        if (!animate) current = { ...target };
        schedule();
      },
      point(event) {
        if (reduced.matches || event.pointerType !== 'mouse') return;
        const bounds = surface.getBoundingClientRect();
        camera = {
          x: rest.x + ((event.clientY - bounds.top) / bounds.height - .5) * .75,
          y: rest.y + ((event.clientX - bounds.left) / bounds.width - .5) * .9,
        };
        schedule();
      },
      reset() { camera = rest; schedule(); },
    };
    resize();

    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', onPreference);
      cancelAnimationFrame(frame);
      controls.current = null;
    };
  }, []);

  return (
    <figure className="folio-signal">
      <canvas
        ref={canvas}
        aria-hidden="true"
        onPointerMove={(event) => controls.current?.point(event)}
        onPointerLeave={() => controls.current?.reset()}
      />
      <figcaption>
        <span>3D form</span>
        <div role="group" aria-label="Choose a 3D form">
          {forms.map((form, index) => (
            <button key={form.name} type="button" aria-pressed={selected === index} onClick={(event) => {
              setSelected(index);
              controls.current?.select(index, event.detail > 0);
            }}>{form.name}</button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
