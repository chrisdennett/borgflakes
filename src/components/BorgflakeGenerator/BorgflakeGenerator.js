import React, { useEffect, useState } from "react";
import styles from "./BorgflakeGenerator.module.css";
import BorgflakeCanvas from "../BorgflakeCanvas/BorgflakeCanvas";
import BorgflakeSvg from "../BorgflakeSvg/BorgflakeSvg";
import { generateBorglines, generateGridData } from "../../utils/utils";

export default function BorgflakeGenerator({ params }) {
  const [gridPoints, setGridPoints] = useState([]);
  const [borgLines, setBorgLines] = useState(null);

  const {
    canvasWidth,
    canvasHeight,
    cellSize,
    outerPadding,
    generate,
    maxRandomOffsetSize,
    allowDiagonals,
    addMultipleLinesFromStart,
  } = params;

  useEffect(() => {
    if (!gridPoints || !gridPoints.length > 0) return;

    const lines = generateBorglines({
      gridPoints,
      allowDiagonals,
      addMultipleLinesFromStart,
    });
    setBorgLines(lines);

    // eslint-disable-next-line
  }, [generate, addMultipleLinesFromStart]);

  useEffect(() => {
    if (!canvasWidth || !canvasHeight || !cellSize) return;

    const pts = generateGridData({
      canvasWidth,
      canvasHeight,
      cellSize,
      outerPadding,
      maxRandomOffsetSize,
      allowDiagonals,
    });
    setGridPoints(pts);

    if (!borgLines) {
      const lines = generateBorglines({
        gridPoints: pts,
        allowDiagonals,
        addMultipleLinesFromStart,
      });
      setBorgLines(lines);
    }

    // eslint-disable-next-line
  }, [
    canvasWidth,
    canvasHeight,
    cellSize,
    outerPadding,
    maxRandomOffsetSize,
    allowDiagonals,
    addMultipleLinesFromStart,
  ]);

  // render //
  const props = {
    ...params,
    gridPoints,
    borgLines,
  };

  return (
    <div className={styles.borgflakeGenerator}>
      {props.outputType === "svg" && (
        <div className={styles.flakeHolder}>
          <BorgflakeSvg {...props} />
        </div>
      )}

      {props.outputType === "canvas" && (
        <div className={styles.flakeHolder}>
          <BorgflakeCanvas {...props} />
        </div>
      )}
    </div>
  );
}
