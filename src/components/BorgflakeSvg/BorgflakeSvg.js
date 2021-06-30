import React from "react";
import styles from "./BorgflakeSvg.module.css";

export default function BorgflakeSvg({
  canvasWidth,
  canvasHeight,
  bgColour,
  gridPoints,
  borgLines,
  drawStartPt,
  drawGrid,
  mirrorLeftRight,
  mirrorTopBottom,
  outline1,
  outline2,
  outline3,
  outline4,
  outline1Colour,
  outline2Colour,
  outline3Colour,
  outline4Colour,
  lineThickness,
  lineColour,
}) {
  if (!gridPoints || gridPoints.length === 0 || !borgLines) return null;

  let startPt = gridPoints.find((pt) => pt.isMiddlePt);
  const { lines, flippedXLines, flippedYLines, flippedXYLines } = borgLines;

  if (!lines) return null;

  const flipXY = mirrorTopBottom && mirrorLeftRight;

  return (
    <div id="svgHolder">
      <svg
        id="svg"
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxHeight: canvasHeight, maxWidth: canvasWidth }}
        className={styles.borgflakeSvg}
      >
        <rect
          x={0}
          y={0}
          width={canvasWidth}
          height={canvasHeight}
          fill={bgColour}
        />
        {drawGrid &&
          gridPoints.map((pt, i) => (
            <circle key={i} fill="white" cx={pt.x} cy={pt.y} r={1} />
          ))}
        {lines.map((line, i) => (
          <g key={`line-${i}`}>
            <BorgLine
              pts={line}
              outline={outline1}
              outlineColour={outline1Colour}
              gridPoints={gridPoints}
              lineThickness={lineThickness}
              lineColour={lineColour}
            />
          </g>
        ))}

        {mirrorLeftRight &&
          flippedXLines.map((line, i) => (
            <g key={`mirrorLineX-${i}`}>
              <BorgLine
                pts={line}
                outline={outline2}
                outlineColour={outline2Colour}
                gridPoints={gridPoints}
                lineThickness={lineThickness}
                lineColour={lineColour}
              />
            </g>
          ))}

        {mirrorTopBottom &&
          flippedYLines.map((line, i) => (
            <g key={`mirrorLineY-${i}`}>
              <BorgLine
                pts={line}
                outline={outline3}
                outlineColour={outline3Colour}
                gridPoints={gridPoints}
                lineThickness={lineThickness}
                lineColour={lineColour}
              />
            </g>
          ))}

        {flipXY &&
          flippedXYLines.map((line, i) => (
            <g key={`mirrorLineX-${i}`}>
              <BorgLine
                pts={line}
                outline={outline4}
                outlineColour={outline4Colour}
                gridPoints={gridPoints}
                lineThickness={lineThickness}
                lineColour={lineColour}
              />
            </g>
          ))}

        {lines.length > 0 && drawStartPt && (
          <>
            <circle
              stroke="white"
              strokeWidth="6"
              fill="none"
              cx={startPt.x}
              cy={startPt.y}
              r={6}
            />
            <circle
              stroke="green"
              strokeWidth="2"
              fill="none"
              cx={startPt.x}
              cy={startPt.y}
              r={6}
            />
          </>
        )}
      </svg>
    </div>
  );
}

function BorgLine({
  pts,
  outline,
  outlineColour,
  lineThickness,
  lineColour,
  gridPoints,
}) {
  const line = makePathFromDirections(pts, gridPoints);

  return (
    <g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={lineColour}
      strokeWidth={lineThickness}
    >
      {outline && (
        <path d={line} stroke={outlineColour} strokeWidth={lineThickness * 3} />
      )}
      <path d={line} />
    </g>
  );
}

// function makePath(pts) {
//   let path = `M${pts[0].x}, ${pts[0].y}`;

//   for (let i = 1; i < pts.length; i++) {
//     path += `L${pts[i].x}, ${pts[i].y}`;
//   }

//   return path;
// }

function makePathFromDirections(directions, gridPts) {
  if (!gridPts || gridPts.length === 0) return null;

  let currPoint = gridPts.find((pt) => pt.isMiddlePt);

  let path = `M${currPoint.x}, ${currPoint.y}`;

  for (let currDirection of directions) {
    let nextPtIndex = getIndexFromDirection(currDirection, currPoint);

    if (nextPtIndex && nextPtIndex >= 0 && nextPtIndex < gridPts.length) {
      currPoint = gridPts[nextPtIndex];
      path += `L${currPoint.x}, ${currPoint.y}`;
    }
  }

  return path;
}

export function getIndexFromDirection(direction, pt) {
  let nextPtIndex = null;

  if (direction === "L") {
    nextPtIndex = pt.leftIndex;
  } else if (direction === "R") {
    nextPtIndex = pt.rightIndex;
  } else if (direction === "U") {
    nextPtIndex = pt.aboveIndex;
  } else if (direction === "D") {
    nextPtIndex = pt.belowIndex;
  } else if (direction === "UL") {
    nextPtIndex = pt.diagonalUpLeft;
  } else if (direction === "UR") {
    nextPtIndex = pt.diagonalUpRight;
  } else if (direction === "DL") {
    nextPtIndex = pt.diagonalDownLeft;
  } else if (direction === "DR") {
    nextPtIndex = pt.diagonalDownRight;
  } else {
    console.log("direction NOT FOUND: ", direction);
  }

  return nextPtIndex;
}
