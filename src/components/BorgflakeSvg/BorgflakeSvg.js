import React from "react";
import styles from "./BorgflakeSvg.module.css";

export default function BorgflakeSvg({
  w,
  h,
  bg,
  gridPoints,
  borgLines,
  lineColour,
  lineThickness,
  drawCenterPt,
  drawGrid,
  mirrorLeftRight,
  mirrorTopBottom,
}) {
  return (
    <svg width={w} height={h} className={styles.borgflakeSvg}>
      <rect x={0} y={0} width={w} height={w} fill={bg} />;
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
            <g transform={`translate(${w}, 0)  scale(-1, 1)`}>
              <path d={makePath(line)} />
            </g>
          )}

          {mirrorTopBottom && (
            <g transform={`translate(0, ${h})  scale(1, -1)`}>
              <path d={makePath(line)} />
            </g>
          )}

          {mirrorLeftRight && mirrorTopBottom && (
            <g transform={`translate(${w},${h})  scale(-1, -1)`}>
              <path d={makePath(line)} />
            </g>
          )}
        </g>
      ))}
      {borgLines.length > 0 && drawCenterPt && (
        <circle
          fill="green"
          cx={borgLines[0][0].x}
          cy={borgLines[0][0].y}
          r={5}
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
