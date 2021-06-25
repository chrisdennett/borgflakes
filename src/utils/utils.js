export function generateGridData({ w, h, cellSize }) {
  const gridPoints = [];
  const cols = Math.ceil(w / cellSize);
  const rows = Math.ceil(h / cellSize);

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const pt = { x: c * cellSize, y: r * cellSize };
      gridPoints.push(pt);
    }
  }

  return gridPoints;
}
