export function generateGridData({ w, h, cellSize }) {
  const gridPoints = [];
  const cols = Math.ceil(w / cellSize);
  const rows = Math.ceil(h / cellSize);

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const currIndex = gridPoints.length;
      const pt = { x: c * cellSize, y: r * cellSize };
      let leftIndex = null;
      let rightIndex = null;
      let aboveIndex = null;
      let belowIndex = null;

      if (c !== 0) leftIndex = currIndex - 1;
      if (c < cols) rightIndex = currIndex + 1;
      if (r !== 0) aboveIndex = currIndex - (cols + 1);
      if (r < rows) belowIndex = currIndex + (cols + 1);

      gridPoints.push({ ...pt, leftIndex, rightIndex, aboveIndex, belowIndex });
    }
  }

  return gridPoints;
}

export function generateBorglines({ gridPoints }) {
  let pts = [...gridPoints];

  const startPt = pts[getRandomInt({ max: gridPoints.length })];
  const line = [startPt];

  let nextPt = startPt.leftIndex ? pts[startPt.leftIndex] : null;
  if (nextPt) {
    line.push(nextPt);
  }

  nextPt = startPt.rightIndex ? pts[startPt.rightIndex] : null;
  if (nextPt) {
    line.push(nextPt);
  }

  nextPt = startPt.aboveIndex ? pts[startPt.aboveIndex] : null;
  if (nextPt) {
    line.push(nextPt);
  }

  nextPt = startPt.belowIndex ? pts[startPt.belowIndex] : null;
  if (nextPt) {
    line.push(nextPt);
  }

  return [line];
}

function getRandomInt({ min = 0, max = 10 }) {
  const range = max - min;
  return min + Math.round(Math.random() * range);
}
