import React from "react";
import styles from "./BorgflakeSvg.module.css";

export default function BorgflakeSvg({
  canvasWidth,
  canvasHeight,
  bgColour,
  gridPoints,
  borgLines,
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
  lineThickness,
  lineColour,
  line2Colour,
  line3Colour,
  line4Colour,
}) {
  if (!gridPoints || gridPoints.length === 0 || !borgLines) return null;

  let startPt = gridPoints.find((pt) => pt.isMiddlePt);
  const { lines, flippedXLines, flippedYLines, flippedXYLines } = borgLines;

  if (!lines) return null;

  const linePathObjectArrays = getLinePathObjectArrays(lines, gridPoints);

  const flippedXLinePathObjectArrays = getLinePathObjectArrays(
    flippedXLines,
    gridPoints
  );
  const flippedYLinePathObjectArrays = getLinePathObjectArrays(
    flippedYLines,
    gridPoints
  );
  const flippedXYLinePathObjectArrays = getLinePathObjectArrays(
    flippedXYLines,
    gridPoints
  );

  console.log("linePathObjectArrays: ", linePathObjectArrays);

  const flipXY = mirrorTopBottom && mirrorLeftRight;

  return (
    <div id="svgHolder">
      <svg
        id="svg"
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxHeight: canvasHeight, maxWidth: canvasWidth }}
        className={styles.borgflakeSvg}
      >
        <rect
          x={0}
          y={0}
          width={canvasWidth}
          height={canvasHeight}
          fill={bgColour}
        />
        {drawGrid &&
          gridPoints.map((pt, i) => (
            <circle key={i} fill="white" cx={pt.x} cy={pt.y} r={1} />
          ))}
        {linePathObjectArrays.map((linePathObjectArr, i) => (
          <g key={`line-${i}`}>
            <BorgLine
              pathObjectArray={linePathObjectArr}
              outline={outline1}
              outlineColour={outline1Colour}
              gridPoints={gridPoints}
              lineThickness={lineThickness * 3}
              lineColour={lineColour}
            />
          </g>
        ))}

        {mirrorLeftRight &&
          flippedXLinePathObjectArrays.map((flippedXLinePathObjectArr, i) => (
            <g key={`mirrorLineX-${i}`}>
              <BorgLine
                pathObjectArray={flippedXLinePathObjectArr}
                outline={outline2}
                outlineColour={outline2Colour}
                gridPoints={gridPoints}
                lineThickness={lineThickness}
                lineColour={line2Colour}
              />
            </g>
          ))}

        {mirrorTopBottom &&
          flippedYLinePathObjectArrays.map((flippedYLinePathObjectArr, i) => (
            <g key={`mirrorLineY-${i}`}>
              <BorgLine
                pathObjectArray={flippedYLinePathObjectArr}
                outline={outline3}
                outlineColour={outline3Colour}
                gridPoints={gridPoints}
                lineThickness={lineThickness}
                lineColour={line3Colour}
              />
            </g>
          ))}

        {flipXY &&
          flippedXYLinePathObjectArrays.map((flippedXYLinePathObjectArr, i) => (
            <g key={`mirrorLineX-${i}`}>
              <BorgLine
                pathObjectArray={flippedXYLinePathObjectArr}
                outline={outline4}
                outlineColour={outline4Colour}
                gridPoints={gridPoints}
                lineThickness={lineThickness}
                lineColour={line4Colour}
              />
            </g>
          ))}

        {lines.length > 0 && drawStartPt && (
          <>
            <circle
              stroke="white"
              strokeWidth="6"
              fill="none"
              cx={startPt.x}
              cy={startPt.y}
              r={6}
            />
            <circle
              stroke="green"
              strokeWidth="2"
              fill="none"
              cx={startPt.x}
              cy={startPt.y}
              r={6}
            />
          </>
        )}
      </svg>
    </div>
  );
}

function getLinePathObjectArrays(directionArrays, gridPts) {
  const linePathObjectArrays = [];

  for (let dirArr of directionArrays) {
    const lineObjectArr = makePathObjectsArrFromDirections(dirArr, gridPts);
    linePathObjectArrays.push(lineObjectArr);
  }

  return linePathObjectArrays;
}

function BorgLine({
  pathObjectArray,
  outline,
  outlineColour,
  lineThickness,
  lineColour,
}) {
  if (!pathObjectArray) return null;

  const path = makePathFromPathObjectArray(pathObjectArray);

  return (
    <g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={lineColour}
      strokeWidth={lineThickness}
    >
      {outline && (
        <path d={path} stroke={outlineColour} strokeWidth={lineThickness * 3} />
      )}
      <path d={path} />
    </g>
  );
}

function makePathFromPathObjectArray(pathObjectArray) {
  let path = "";

  for (let pathObj of pathObjectArray) {
    path += `${pathObj.type} ${pathObj.x}, ${pathObj.y}`;
  }

  return path;
}

function makePathObjectsArrFromDirections(directions, gridPts) {
  if (!gridPts || gridPts.length === 0) return null;

  let currPoint = gridPts.find((pt) => pt.isMiddlePt);

  const pathObject = [];
  pathObject.push({
    type: "M",
    x: currPoint.x,
    y: currPoint.y,
  });

  for (let currDirection of directions) {
    let nextPtIndex = getIndexFromDirection(currDirection, currPoint);

    if (nextPtIndex && nextPtIndex >= 0 && nextPtIndex < gridPts.length) {
      const nextPt = gridPts[nextPtIndex];

      pathObject.push({
        type: "L",
        x: nextPt.x,
        y: nextPt.y,
      });

      currPoint = nextPt;
    }
  }

  return pathObject;
}

function makePathFromDirections(directions, gridPts) {
  if (!gridPts || gridPts.length === 0) return null;
  if (!directions || directions.length === 0) return null;

  let currPoint = gridPts.find((pt) => pt.isMiddlePt);

  let path = `M${currPoint.x}, ${currPoint.y}`;

  for (let currDirection of directions) {
    let nextPtIndex = getIndexFromDirection(currDirection, currPoint);

    if (nextPtIndex && nextPtIndex >= 0 && nextPtIndex < gridPts.length) {
      const nextPt = gridPts[nextPtIndex];

      // if there's already a line between currPoint and nextPt, use "M" instead of "L"

      path += `L${nextPt.x}, ${nextPt.y}`;
      currPoint = nextPt;
    }
  }

  return path;
}

export function getIndexFromDirection(direction, pt) {
  let nextPtIndex = null;

  if (direction === "L") {
    nextPtIndex = pt.leftIndex;
  } else if (direction === "R") {
    nextPtIndex = pt.rightIndex;
  } else if (direction === "U") {
    nextPtIndex = pt.aboveIndex;
  } else if (direction === "D") {
    nextPtIndex = pt.belowIndex;
  } else if (direction === "UL") {
    nextPtIndex = pt.diagonalUpLeft;
  } else if (direction === "UR") {
    nextPtIndex = pt.diagonalUpRight;
  } else if (direction === "DL") {
    nextPtIndex = pt.diagonalDownLeft;
  } else if (direction === "DR") {
    nextPtIndex = pt.diagonalDownRight;
  } else {
    console.log("direction NOT FOUND: ", direction);
  }

  return nextPtIndex;
}
