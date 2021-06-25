import React, { useEffect, useState } from "react";
import styles from "./BorgflakeGenerator.module.css";
import BorgflakeCanvas from "../BorgflakeCanvas/BorgflakeCanvas";
import BorgflakeSvg from "../BorgflakeSvg/BorgflakeSvg";
import { generateGridData } from "../../utils/utils";

export default function BorgflakeGenerator() {
  const [gridPoints, setGridPoints] = useState([]);
  const [flakeSize] = useState({ w: 800, h: 800 });
  const [cellSize] = useState(50);

  useEffect(() => {
    setGridPoints(generateGridData({ ...flakeSize, cellSize }));
  }, [flakeSize, cellSize]);

  // render //
  const props = { ...flakeSize, bg: "#333", gridPoints };

  return (
    <div className={styles.borgflakeGenerator}>
      <BorgflakeCanvas {...props} />
      <BorgflakeSvg {...props} />
    </div>
  );
}
