import React from "react";
import styles from "./BorgflakeSvg.module.css";

export default function BorgflakeSvg({
  canvasWidth,
  canvasHeight,
  bgColour,
  gridPoints,
  borgLines,
  lineColour,
  lineThickness,
  drawStartPt,
  drawGrid,
  mirrorLeftRight,
  mirrorTopBottom,
  cellSize,
}) {
  return (
    <svg
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
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
      ;
      {drawGrid &&
        gridPoints.map((pt, i) => (
          <circle key={i} fill="white" cx={pt.x} cy={pt.y} r={1} />
        ))}
      {borgLines.map((line, i) => (
        <g
          key={`line-${i}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={lineColour}
          strokeWidth={lineThickness}
        >
          <BorgLine
            pts={line}
            cellSize={cellSize}
            mirrorLeftRight={mirrorLeftRight}
            mirrorTopBottom={mirrorTopBottom}
          />
        </g>
      ))}
      {borgLines.length > 0 && drawStartPt && (
        <circle
          stroke="red"
          strokeWidth="2"
          fill="none"
          cx={borgLines[0][0].x}
          cy={borgLines[0][0].y}
          r={6}
        />
      )}
    </svg>
  );
}

function BorgLine({ pts, cellSize, mirrorLeftRight, mirrorTopBottom }) {
  const line = makePathFromDirection(pts, cellSize);

  return (
    <>
      <path d={line} stroke="red" strokeWidth="8" />
      <path d={line} />

      {/* {mirrorLeftRight && (
        <g transform={`translate(${canvasWidth}, 0)  scale(-1, 1)`}>
          <path d={line} />
        </g>
      )}

      {mirrorTopBottom && (
        <g transform={`translate(0, ${canvasHeight})  scale(1, -1)`}>
          <path d={line} />
        </g>
      )}

      {mirrorLeftRight && mirrorTopBottom && (
        <g
          transform={`translate(${canvasWidth},${canvasHeight})  scale(-1, -1)`}
        >
          <path d={line} />
        </g>
      )} */}
    </>
  );
}

function makePathFromDirection(pts, cellSize) {
  let path = `M${pts[0].x}, ${pts[0].y}`;
  let pos = { x: pts[0].x, y: pts[0].y };

  for (let i = 1; i < pts.length; i++) {
    const { direction } = pts[i];
    let moveX = 0;
    let moveY = 0;
    if (direction === "L") moveX = -cellSize;
    if (direction === "R") moveX = cellSize;
    if (direction === "U") moveY = -cellSize;
    if (direction === "D") moveY = cellSize;

    pos.x += moveX;
    pos.y += moveY;

    path += `L${pos.x}, ${pos.y}`;
  }

  return path;
}

function makePath(pts) {
  let path = `M${pts[0].x}, ${pts[0].y}`;

  for (let i = 1; i < pts.length; i++) {
    path += `L${pts[i].x}, ${pts[i].y}`;
  }

  console.log("pts: ", pts);

  return path;
}
