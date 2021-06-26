import { useEffect, useRef } from "react";
import styles from "./BorgflakeCanvas.module.css";

export default function BorgflakeCanvas({
  canvasWidth,
  canvasHeight,
  bgColour,
  gridPoints,
  borgLines,
  lineColour,
  lineThickness,
  drawCenterPt,
  drawGrid,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    // create background
    ctx.fillStyle = bgColour;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (drawGrid) {
      for (let pt of gridPoints) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(pt.x, pt.y, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // BORG LINES
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColour;
    ctx.lineWidth = lineThickness;

    drawLines(ctx, borgLines);
    ctx.translate(canvasWidth, 0);
    ctx.scale(-1, 1);
    drawLines(ctx, borgLines);
    ctx.translate(0, canvasHeight);
    ctx.scale(1, -1);
    drawLines(ctx, borgLines);
    ctx.translate(canvasWidth, 0);
    ctx.scale(-1, 1);
    drawLines(ctx, borgLines);

    if (borgLines.length > 0 && drawCenterPt) {
      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(borgLines[0][0].x, borgLines[0][0].y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  return <canvas ref={canvasRef} className={styles.borgflakeCanvas} />;
}

const drawLines = (ctx, borgLines) => {
  for (let line of borgLines) {
    const linePts = line;

    ctx.beginPath();
    ctx.moveTo(linePts[0].x, linePts[0].y);
    for (let i = 1; i < linePts.length; i++) {
      ctx.lineTo(linePts[i].x, linePts[i].y);
    }
    ctx.stroke();
  }
};
