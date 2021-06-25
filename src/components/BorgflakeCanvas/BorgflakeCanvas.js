import { useEffect, useRef } from "react";
import styles from "./BorgflakeCanvas.module.css";

export default function BorgflakeCanvas({
  w,
  h,
  bg,
  gridPoints,
  borgLines,
  lineColour,
  lineThickness,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    // create background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    for (let pt of gridPoints) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    // BORG LINES
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColour;
    ctx.lineWidth = lineThickness;
    for (let line of borgLines) {
      const linePts = line;

      ctx.beginPath();
      ctx.moveTo(linePts[0].x, linePts[0].y);
      for (let i = 1; i < linePts.length; i++) {
        ctx.lineTo(linePts[i].x, linePts[i].y);
      }
      ctx.stroke();
    }

    if (borgLines.length > 0) {
      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(borgLines[0][0].x, borgLines[0][0].y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  return <canvas ref={canvasRef} className={styles.borgflakeCanvas} />;
}
