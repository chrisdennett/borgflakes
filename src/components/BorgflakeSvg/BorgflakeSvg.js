import React from "react";
import styles from "./BorgflakeSvg.module.css";

export default function BorgflakeSvg({ w, h, bg, gridPoints }) {
  return (
    <svg width={w} height={h} className={styles.BorgflakeSvg}>
      <rect x={0} y={0} width={w} height={w} fill={bg} />;
      {gridPoints.map((pt) => (
        <circle fill="white" cx={pt.x} cy={pt.y} r={2} />
      ))}
    </svg>
  );
}
