import { useState } from 'react';

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

  function togglePath(event) {
    setResult(result ? null : { animate: event.detail > 0 });
  }

  return (
    <section className="folio-path" aria-labelledby="path-heading">
      <header className="folio-path-header">
        <h2 id="path-heading">Pathfinding demo</h2>
        <span>Breadth-first search</span>
      </header>
      <div className="folio-path-board" data-animate={result?.animate ? 'true' : undefined} aria-hidden="true">
        {tiles.map((tile, index) => (
          <span
            key={index}
            className="folio-path-cell"
            data-tile={tile}
            data-route={result && routeOrder.has(index) ? 'true' : undefined}
            style={routeOrder.has(index) ? { '--step': routeOrder.get(index) } : undefined}
          >
            {tile === 'S' && 'A'}
            {tile === 'G' && 'B'}
          </span>
        ))}
      </div>
      <div className="folio-path-footer">
        <p role="status">{result ? `Shortest route · ${route.length - 1} steps` : 'Find the shortest route from A to B.'}</p>
        <button className="folio-path-run" type="button" onClick={togglePath}>
          {result ? 'Reset demo' : 'Run demo'}
        </button>
      </div>
    </section>
  );
}
