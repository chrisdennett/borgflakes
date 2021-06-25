import { useEffect, useRef } from "react";
import styles from "./BorgflakeCanvas.module.css";

export default function BorgflakeCanvas({ w, h, bg, gridPoints }) {
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
  });

  return <canvas ref={canvasRef} className={styles.borgflakeCanvas} />;
}
