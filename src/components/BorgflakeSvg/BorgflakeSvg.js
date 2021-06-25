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
}) {
  return (
    <svg width={w} height={h} className={styles.BorgflakeSvg}>
      <rect x={0} y={0} width={w} height={w} fill={bg} />;
      {gridPoints.map((pt, i) => (
        <circle key={i} fill="white" cx={pt.x} cy={pt.y} r={2} />
      ))}
      {borgLines.map((line, i) => (
        <path
          key={`line-${i}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={lineColour}
          strokeWidth={lineThickness}
          d={makePath(line)}
        />
      ))}
      {borgLines.length > 0 && (
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
