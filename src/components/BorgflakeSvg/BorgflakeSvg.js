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
          <path d={makePath(line)} />

          {mirrorLeftRight && (
            <g transform={`translate(${canvasWidth}, 0)  scale(-1, 1)`}>
              <path d={makePath(line)} />
            </g>
          )}

          {mirrorTopBottom && (
            <g transform={`translate(0, ${canvasHeight})  scale(1, -1)`}>
              <path d={makePath(line)} />
            </g>
          )}

          {mirrorLeftRight && mirrorTopBottom && (
            <g
              transform={`translate(${canvasWidth},${canvasHeight})  scale(-1, -1)`}
            >
              <path d={makePath(line)} />
            </g>
          )}
        </g>
      ))}
      {borgLines.length > 0 && drawStartPt && (
        <circle
          fill="green"
          cx={borgLines[0][0].x - 3}
          cy={borgLines[0][0].y - 3}
          r={6}
        />
      )}
    </svg>
  );
}

function makePath(pts) {
  let path = `M${pts[0].x}, ${pts[0].y}`;

  for (let i = 1; i < pts.length; i++) {
    path += `L${pts[i].x}, ${pts[i].y}`;
  }

  return path;
}
