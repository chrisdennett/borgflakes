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
  ...rest
}) {
  let startPt = gridPoints.find((pt) => pt.isMiddlePt);

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

        {borgLines.map((line, i) => (
          <g key={`line-${i}`}>
            <BorgLine
              pts={line}
              {...{ ...rest, canvasHeight, canvasWidth, gridPoints }}
            />
          </g>
        ))}

        {borgLines.length > 0 && drawStartPt && (
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
  mirrorLeftRight,
  mirrorTopBottom,
  canvasWidth,
  canvasHeight,
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
      {outline1 && (
        <path
          d={line}
          stroke={outline1Colour}
          strokeWidth={lineThickness * 3}
        />
      )}
      <path d={line} />

      {mirrorLeftRight && (
        <g transform={`translate(${canvasWidth}, 0)  scale(-1, 1)`}>
          {outline2 && (
            <path
              d={line}
              stroke={outline2Colour}
              strokeWidth={lineThickness * 3}
            />
          )}
          <path d={line} />
        </g>
      )}

      {mirrorTopBottom && (
        <g transform={`translate(0, ${canvasHeight})  scale(1, -1)`}>
          {outline3 && (
            <path
              d={line}
              stroke={outline3Colour}
              strokeWidth={lineThickness * 3}
            />
          )}
          <path d={line} />
        </g>
      )}

      {mirrorLeftRight && mirrorTopBottom && (
        <g
          transform={`translate(${canvasWidth},${canvasHeight})  scale(-1, -1)`}
        >
          {outline4 && (
            <path
              d={line}
              stroke={outline4Colour}
              strokeWidth={lineThickness * 3}
            />
          )}
          <path d={line} />
        </g>
      )}
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
    nextPtIndex = pt.diagonalUpRight;
  } else {
    console.log("direction NOT FOUND: ", direction);
  }

  return nextPtIndex;
}
