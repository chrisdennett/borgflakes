import React, { useEffect, useState } from "react";
import styles from "./BorgflakeGenerator.module.css";
import BorgflakeCanvas from "../BorgflakeCanvas/BorgflakeCanvas";
import BorgflakeSvg from "../BorgflakeSvg/BorgflakeSvg";
import { generateBorglines, generateGridData } from "../../utils/utils";

export default function BorgflakeGenerator({ params }) {
  const [gridPoints, setGridPoints] = useState([]);
  const [borgLines, setBorgLines] = useState([]);

  const { canvasWidth, canvasHeight, cellSize } = params;

  useEffect(() => {
    if (!canvasWidth || !canvasHeight || !cellSize) return;

    const pts = generateGridData({
      canvasWidth,
      canvasHeight,
      cellSize,
    });
    setGridPoints(pts);
    const lines = generateBorglines({ gridPoints: pts });
    setBorgLines(lines);

    // eslint-disable-next-line
  }, [params]);

  // render //
  const props = {
    ...params,
    gridPoints,
    borgLines,
  };

  return (
    <div className={styles.borgflakeGenerator}>
      {props.drawCanvas && (
        <div className={styles.flakeHolder}>
          <BorgflakeCanvas {...props} />
        </div>
      )}

      {props.drawSvg && (
        <div className={styles.flakeHolder}>
          <BorgflakeSvg {...props} />
        </div>
      )}
    </div>
  );
}
