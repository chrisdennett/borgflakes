export function generateGridData({ canvasWidth, canvasHeight, cellSize }) {
  const gridPoints = [];
  const cols = Math.ceil(canvasWidth / cellSize);
  const rows = Math.ceil(canvasHeight / cellSize);

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const currIndex = gridPoints.length;
      const pt = { x: c * cellSize, y: r * cellSize };
      let leftIndex = null;
      let rightIndex = null;
      let aboveIndex = null;
      let belowIndex = null;

      const isMiddlePt =
        r === Math.round(rows / 2) && c === Math.round(cols / 2);

      if (c !== 0) leftIndex = currIndex - 1;
      if (c < cols) rightIndex = currIndex + 1;
      if (r !== 0) aboveIndex = currIndex - (cols + 1);
      if (r < rows) belowIndex = currIndex + (cols + 1);

      gridPoints.push({
        ...pt,
        leftIndex,
        rightIndex,
        aboveIndex,
        belowIndex,
        isMiddlePt,
      });
    }
  }

  return gridPoints;
}

export function generateBorglines({ gridPoints }) {
  let pts = [...gridPoints];

  const lines = [];
  const middlePt = gridPoints.find((pt) => pt.isMiddlePt);

  const startPt = middlePt; //pts[getRandomInt({ max: gridPoints.length })];
  let line = generateLine(startPt, gridPoints);
  lines.push(line);

  while (getAvailableNextPts(startPt, pts).length > 0) {
    line = generateLine(startPt, gridPoints);
    lines.push(line);
  }

  return lines;
}

function generateLine(startPt, pts) {
  const line = [startPt];
  startPt.isUsed = true;

  let nextPt = getNextPt(startPt, pts);
  while (nextPt) {
    line.push(nextPt);
    nextPt.isUsed = true;

    nextPt = getNextPt(nextPt, pts);
  }

  return line;
}

function getNextPt(pt, pts) {
  let nextPt = null;

  const possPts = getAvailableNextPts(pt, pts);

  if (possPts.length > 0) {
    const randInt = getRandomInt({ max: possPts.length - 1 });
    nextPt = possPts[randInt];
  }

  return nextPt;
}

function getAvailableNextPts(pt, allPts) {
  const { rightIndex, leftIndex, aboveIndex, belowIndex } = pt;

  const availablePts = [];
  if (rightIndex && !allPts[rightIndex].isUsed) {
    availablePts.push(allPts[rightIndex]);
  }

  if (leftIndex && !allPts[leftIndex].isUsed) {
    availablePts.push(allPts[leftIndex]);
  }

  if (aboveIndex && !allPts[aboveIndex].isUsed) {
    availablePts.push(allPts[aboveIndex]);
  }

  if (belowIndex && !allPts[belowIndex].isUsed) {
    availablePts.push(allPts[belowIndex]);
  }

  return availablePts;
}

function getRandomInt({ min = 0, max = 10 }) {
  if (max <= min) {
    return 0;
  }

  const range = max - min;
  return min + Math.round(Math.random() * range);
}
