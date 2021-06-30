import React, { useEffect, useState } from "react";
import styles from "./BorgflakeGenerator.module.css";
import BorgflakeCanvas from "../BorgflakeCanvas/BorgflakeCanvas";
import BorgflakeSvg from "../BorgflakeSvg/BorgflakeSvg";
import { generateBorglines, generateGridData } from "../../utils/utils";

export default function BorgflakeGenerator({ params }) {
  const [gridPoints, setGridPoints] = useState([]);
  const [borgLines, setBorgLines] = useState([]);

  const {
    canvasWidth,
    canvasHeight,
    cellSize,
    outerPadding,
    generate,
    maxRandomOffsetSize,
    allowDiagonals,
  } = params;

  useEffect(() => {
    if (!gridPoints.length > 0) return;

    const lines = generateBorglines({ gridPoints, allowDiagonals });
    setBorgLines(lines);

    // console.log("gridPoints: ", gridPoints);

    // eslint-disable-next-line
  }, [generate, gridPoints]);

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

    // eslint-disable-next-line
  }, [
    canvasWidth,
    canvasHeight,
    cellSize,
    outerPadding,
    maxRandomOffsetSize,
    allowDiagonals,
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
