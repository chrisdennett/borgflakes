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

    const outlineThickness = lineThickness * 3;

    if (outline1) {
      drawLines(ctx, borgLines, outlineThickness, outline1Colour);
    }
    drawLines(ctx, borgLines);

    if (mirrorLeftRight) {
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);

      if (outline2) {
        drawLines(ctx, borgLines, outlineThickness, outline2Colour);
      }
      drawLines(ctx, borgLines);
    }

    if (mirrorTopBottom) {
      ctx.translate(0, canvasHeight);
      ctx.scale(1, -1);
      if (outline3) {
        drawLines(ctx, borgLines, outlineThickness, outline3Colour);
      }
      drawLines(ctx, borgLines);
    }

    if (mirrorLeftRight) {
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      if (outline4) {
        drawLines(ctx, borgLines, outlineThickness, outline4Colour);
      }
      drawLines(ctx, borgLines);
    }

    if (borgLines.length > 0 && drawStartPt) {
      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(borgLines[0][0].x, borgLines[0][0].y, 6, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  return <canvas ref={canvasRef} className={styles.borgflakeCanvas} />;
}

const drawLines = (ctx, borgLines, lineThickness, lineColour) => {
  ctx.save();
  if (lineColour) ctx.strokeStyle = lineColour;
  if (lineThickness) ctx.lineWidth = lineThickness;

  for (let line of borgLines) {
    const linePts = line;
    ctx.beginPath();
    ctx.moveTo(linePts[0].x, linePts[0].y);
    for (let i = 1; i < linePts.length; i++) {
      ctx.lineTo(linePts[i].x, linePts[i].y);
    }
    ctx.stroke();
  }
  ctx.restore();
};
