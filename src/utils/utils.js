export function generateGridData({
  canvasWidth,
  canvasHeight,
  cellSize,
  outerPadding,
  maxRandomOffsetSize,
  allowDiagonals,
}) {
  const gridPoints = [];
  const drawWidth = canvasWidth - outerPadding * 2;
  const drawHeight = canvasHeight - outerPadding * 2;
  const cols = Math.ceil(drawWidth / cellSize);
  const rows = Math.ceil(drawHeight / cellSize);

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const currIndex = gridPoints.length;
      const randX = getRandomInt({
        min: 0,
        max: maxRandomOffsetSize * cellSize,
      });
      const randY = getRandomInt({
        min: 0,
        max: maxRandomOffsetSize * cellSize,
      });

      const pt = {
        x: randX + outerPadding + c * cellSize,
        y: randY + outerPadding + r * cellSize,
      };
      let leftIndex = null;
      let rightIndex = null;
      let aboveIndex = null;
      let belowIndex = null;
      let diagonalUpLeft = null;
      let diagonalUpRight = null;
      let diagonalDownLeft = null;
      let diagonalDownRight = null;

      const isMiddlePt =
        r === Math.round(rows / 2) && c === Math.round(cols / 2);

      if (c !== 0) leftIndex = currIndex - 1;
      if (c < cols) rightIndex = currIndex + 1;
      if (r !== 0) aboveIndex = currIndex - (cols + 1);
      if (r < rows) belowIndex = currIndex + (cols + 1);

      if (allowDiagonals) {
        if (c !== 0 && r !== 0) diagonalUpLeft = aboveIndex - 1;
        if (c < cols && r !== 0) diagonalUpRight = aboveIndex + 1;
        if (c !== 0 && r < rows) diagonalDownLeft = belowIndex - 1;
        if (c < cols && r < rows) diagonalDownRight = belowIndex + 1;
      }

      gridPoints.push({
        ...pt,
        leftIndex,
        rightIndex,
        aboveIndex,
        belowIndex,
        isMiddlePt,
        diagonalUpLeft,
        diagonalUpRight,
        diagonalDownLeft,
        diagonalDownRight,
      });
    }
  }

  return gridPoints;
}

function getCopyOf(arr) {
  return arr.map((obj) => {
    return { ...obj };
  });
}

// Draws as many lines from starting point as poss.
export function generateBorglines({ gridPoints, allowDiagonals }) {
  let pts = getCopyOf(gridPoints);

  const lines = [];
  const middlePt = pts.find((pt) => pt.isMiddlePt);

  const startPt = middlePt; //pts[getRandomInt({ max: gridPoints.length })];
  let line = generateLine(startPt, pts, allowDiagonals);
  lines.push(line);

  while (getAvailableNextPts(startPt, pts).availablePts.length > 0) {
    line = generateLine(startPt, pts, allowDiagonals);
    lines.push(line);
  }

  return lines;
}

// create a line going in random directions until blocked on all
function generateLine(startPt, pts, allowDiagonals) {
  const line = [];
  startPt.isUsed = true;

  let nextPt = getNextPt(startPt, pts, allowDiagonals);
  while (nextPt) {
    line.push(nextPt.direction);
    nextPt.isUsed = true;

    nextPt = getNextPt(nextPt, pts, allowDiagonals);
  }

  return line;
}

function getNextPt(pt, pts) {
  let nextPt = null;

  const { availablePts, availableDirections } = getAvailableNextPts(pt, pts);
  const possPts = availablePts;

  if (possPts.length > 0) {
    const randInt = getRandomInt({ max: possPts.length - 1 });
    nextPt = possPts[randInt];
    nextPt.direction = availableDirections[randInt];
  }

  return nextPt;
}

function getAvailableNextPts(pt, allPts) {
  const {
    rightIndex,
    leftIndex,
    aboveIndex,
    belowIndex,
    diagonalUpLeft,
    diagonalUpRight,
    diagonalDownLeft,
    diagonalDownRight,
  } = pt;

  const availablePts = [];
  const availableDirections = [];
  if (rightIndex && !allPts[rightIndex].isUsed) {
    availablePts.push(allPts[rightIndex]);
    availableDirections.push("R");
  }

  if (leftIndex && !allPts[leftIndex].isUsed) {
    availablePts.push(allPts[leftIndex]);
    availableDirections.push("L");
  }

  if (aboveIndex && !allPts[aboveIndex].isUsed) {
    availablePts.push(allPts[aboveIndex]);
    availableDirections.push("U");
  }

  if (belowIndex && !allPts[belowIndex].isUsed) {
    availablePts.push(allPts[belowIndex]);
    availableDirections.push("D");
  }

  // if (allowDiagonals) {
  if (diagonalUpLeft && !allPts[diagonalUpLeft].isUsed) {
    availablePts.push(allPts[diagonalUpLeft]);
    availableDirections.push("UL");
  }

  if (diagonalUpRight && !allPts[diagonalUpRight].isUsed) {
    availablePts.push(allPts[diagonalUpRight]);
    availableDirections.push("UR");
  }

  if (diagonalDownLeft && !allPts[diagonalDownLeft].isUsed) {
    availablePts.push(allPts[diagonalDownLeft]);
    availableDirections.push("DL");
  }

  if (diagonalDownRight && !allPts[diagonalDownRight].isUsed) {
    availablePts.push(allPts[diagonalDownRight]);
    availableDirections.push("DR");
  }
  // }

  return { availablePts, availableDirections };
}

function getRandomInt({ min = 0, max = 10 }) {
  if (max <= min) {
    return 0;
  }

  const range = max - min;
  return min + Math.round(Math.random() * range);
}
