import React, { useEffect, useState } from "react";
import styles from "./BorgflakeGenerator.module.css";
import BorgflakeCanvas from "../BorgflakeCanvas/BorgflakeCanvas";
import BorgflakeSvg from "../BorgflakeSvg/BorgflakeSvg";
import { generateBorglines, generateGridData } from "../../utils/utils";

export default function BorgflakeGenerator() {
  const [gridPoints, setGridPoints] = useState([]);
  const [borgLines, setBorgLines] = useState([]);
  const [flakeSize] = useState({ w: 800, h: 800 });
  const [cellSize] = useState(10);

  useEffect(() => {
    const pts = generateGridData({ ...flakeSize, cellSize });
    // setGridPoints(pts);
    const lines = generateBorglines({ gridPoints: pts });
    setBorgLines(lines);
  }, [flakeSize, cellSize]);

  // render //
  const props = {
    ...flakeSize,
    bg: "#333",
    gridPoints,
    borgLines,
    lineColour: "white",
    lineThickness: 2,
  };

  return (
    <div className={styles.borgflakeGenerator}>
      <BorgflakeCanvas {...props} />
      <BorgflakeSvg {...props} />
    </div>
  );
}
