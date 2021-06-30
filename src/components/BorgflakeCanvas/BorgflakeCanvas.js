import { useEffect, useRef } from "react";
import { getIndexFromDirection } from "../BorgflakeSvg/BorgflakeSvg";
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
      drawLines(ctx, gridPoints, borgLines, outlineThickness, outline1Colour);
    }
    drawLines(ctx, gridPoints, borgLines);

    if (mirrorLeftRight) {
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);

      if (outline2) {
        drawLines(ctx, gridPoints, borgLines, outlineThickness, outline2Colour);
      }
      drawLines(ctx, gridPoints, borgLines);
    }

    if (mirrorTopBottom) {
      ctx.translate(0, canvasHeight);
      ctx.scale(1, -1);
      if (outline3) {
        drawLines(ctx, borgLines, outlineThickness, outline3Colour);
      }
      drawLines(ctx, gridPoints, borgLines);
    }

    if (mirrorLeftRight) {
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      if (outline4) {
        drawLines(ctx, gridPoints, borgLines, outlineThickness, outline4Colour);
      }
      drawLines(ctx, gridPoints, borgLines);
    }

    if (borgLines.length > 0 && drawStartPt) {
      let startPt = gridPoints.find((pt) => pt.isMiddlePt);
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 6;
      ctx.arc(startPt.x, startPt.y, 6, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.arc(startPt.x, startPt.y, 6, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });

  return (
    <canvas
      id="borgFlakeCanvas"
      ref={canvasRef}
      className={styles.borgflakeCanvas}
    />
  );
}

const drawLines = (ctx, gridPoints, borgLines, lineThickness, lineColour) => {
  ctx.save();
  if (lineColour) ctx.strokeStyle = lineColour;
  if (lineThickness) ctx.lineWidth = lineThickness;

  if (!borgLines || borgLines.length === 0) {
    return;
  }

  for (let linePts of borgLines) {
    ctx.beginPath();
    let currPoint = gridPoints.find((pt) => pt.isMiddlePt);
    ctx.moveTo(currPoint.x, currPoint.y);

    for (let currDirection of linePts) {
      if (currPoint) {
        let nextPtIndex = getIndexFromDirection(currDirection, currPoint);
        currPoint = gridPoints[nextPtIndex];
        if (currPoint && currPoint.x) {
          ctx.lineTo(currPoint.x, currPoint.y);
        }
      }
    }
    ctx.stroke();
  }
  ctx.restore();
};
