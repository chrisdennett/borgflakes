import React, { useEffect, useState } from "react";
import styles from "./BorgflakeGenerator.module.css";
import BorgflakeCanvas from "../BorgflakeCanvas/BorgflakeCanvas";
import BorgflakeSvg from "../BorgflakeSvg/BorgflakeSvg";
import { generateBorglines, generateGridData } from "../../utils/utils";

export default function BorgflakeGenerator({ params }) {
  const [gridPoints, setGridPoints] = useState([]);
  const [borgLines, setBorgLines] = useState([]);
  const [flakeSize] = useState({ w: 800, h: 800 });
  const [cellSize] = useState(6);

  useEffect(() => {
    const pts = generateGridData({ ...flakeSize, cellSize });
    setGridPoints(pts);
    const lines = generateBorglines({ gridPoints: pts });
    setBorgLines(lines);
  }, [flakeSize, cellSize]);

  // render //
  const props = {
    ...flakeSize,
    ...params,
    bg: "#333",
    gridPoints,
    borgLines,
    lineColour: "rgba(255,255,255,1)",
    lineThickness: 2,
    drawCenterPt: false,
    mirrorLeftRight: true,
    mirrorTopBottom: true,
    useSvg: true,
  };

  const useCanvas = !props.useSvg;

  return (
    <div className={styles.borgflakeGenerator}>
      {useCanvas && (
        <div className={styles.flakeHolder}>
          <BorgflakeCanvas {...props} />
        </div>
      )}

      {props.useSvg && (
        <div className={styles.flakeHolder}>
          <BorgflakeSvg {...props} />
        </div>
      )}
    </div>
  );
}
