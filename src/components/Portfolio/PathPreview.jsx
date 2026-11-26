import { useRef, useState } from 'react';

const board = [
  '...#.........',
  '...#...###...',
  '.S.#.....#...',
  '.#####.#.#...',
  '.......#.#.G.',
  '..#....#.#...',
  '..#..###.....',
  '.............',
];

function shortestPath(rows) {
  const start = rows.join('').indexOf('S');
  const width = rows[0].length;
  const queue = [start];
  const previous = new Map([[start, null]]);

  for (let index = 0; index < queue.length; index += 1) {
    const cell = queue[index];
    const x = cell % width;
    const y = Math.floor(cell / width);
    if (rows[y][x] === 'G') {
      const route = [];
      for (let step = cell; step !== null; step = previous.get(step)) route.push(step);
      return route.reverse();
    }

    for (const [nextX, nextY] of [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]]) {
      const tile = rows[nextY]?.[nextX];
      const next = nextY * width + nextX;
      if (!tile || tile === '#' || previous.has(next)) continue;
      previous.set(next, cell);
      queue.push(next);
    }
  }

  return [];
}

const tiles = board.join('').split('');
const route = shortestPath(board);
const routeOrder = new Map(route.map((cell, index) => [cell, index]));

export default function PathPreview() {
  const [result, setResult] = useState(null);
  const [flat, setFlat] = useState(false);
  const viewport = useRef(null);

  function resetCamera() {
    viewport.current.style.removeProperty('--pitch');
    viewport.current.style.removeProperty('--yaw');
  }

  function moveCamera(event) {
    if (flat || event.pointerType !== 'mouse' || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    viewport.current.style.setProperty('--pitch', `${-y * 14}deg`);
    viewport.current.style.setProperty('--yaw', `${x * 14}deg`);
  }

  function togglePath(event) {
    setResult(result ? null : { animate: event.detail > 0 });
  }

  return (
    <section className="folio-path" aria-labelledby="path-heading">
      <header className="folio-path-header">
        <h2 id="path-heading">Pathfinding demo</h2>
        <button
          className="folio-path-view"
          type="button"
          aria-pressed={!flat}
          onClick={() => { resetCamera(); setFlat(!flat); }}
        >
          3D view
        </button>
      </header>
      <div className="folio-path-viewport" ref={viewport} data-flat={flat} onPointerMove={moveCamera} onPointerLeave={resetCamera} aria-hidden="true">
        <div className="folio-path-camera">
          <div className="folio-path-board" data-animate={result?.animate ? 'true' : undefined}>
            {tiles.map((tile, index) => (
              <span
                key={index}
                className="folio-path-cell"
                data-tile={tile}
                data-route={result && routeOrder.has(index) ? 'true' : undefined}
                style={routeOrder.has(index) ? { '--step': routeOrder.get(index) } : undefined}
              >
                {tile === '#' && <i className="folio-path-wall" />}
                {tile === 'S' && 'A'}
                {tile === 'G' && 'B'}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="folio-path-footer">
        <p role="status">{result ? `Shortest route · ${route.length - 1} steps` : 'Shortest path from A to B · BFS'}</p>
        <button className="folio-path-run" type="button" onClick={togglePath}>
          {result ? 'Reset demo' : 'Run demo'}
        </button>
      </div>
    </section>
  );
}
