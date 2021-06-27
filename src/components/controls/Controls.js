import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { button, folder, Leva, useControls } from "leva";
import {
  useQueryParams,
  BooleanParam,
  StringParam,
  NumberParam,
} from "use-query-params";

const defaultValsPath =
  "?bgColour=%23333333&canvasHeight=800&canvasWidth=800&cellSize=10&drawGrid=0&drawStartPt=0&generate=1624827080631&lineColour=%23dedede&lineThickness=3&maxRandomOffsetSize=0.08&mirrorLeftRight=1&mirrorTopBottom=1&outerPadding=40&outline1=1&outline1Colour=%23ff0000&outline2=0&outline2Colour=%23ff0000&outline3=0&outline3Colour=%23ff0000&outline4=0&outline4Colour=%23ff0000&outputType=svg";

export default function Controls({
  showControls = true,
  onChange,
  onSaveSvg,
  onSaveCanvas,
}) {
  const [query, setQuery] = useQueryParams({
    generate: StringParam,
    outputType: StringParam,
    drawGrid: BooleanParam,
    mirrorLeftRight: BooleanParam,
    mirrorTopBottom: BooleanParam,
    drawStartPt: BooleanParam,
    bgColour: StringParam,
    lineColour: StringParam,
    canvasWidth: NumberParam,
    canvasHeight: NumberParam,
    cellSize: NumberParam,
    lineThickness: NumberParam,
    outerPadding: NumberParam,
    outline1: BooleanParam,
    outline2: BooleanParam,
    outline3: BooleanParam,
    outline4: BooleanParam,
    outline1Colour: StringParam,
    outline2Colour: StringParam,
    outline3Colour: StringParam,
    outline4Colour: StringParam,
    maxRandomOffsetSize: NumberParam,
  });
  let history = useHistory();

  const [values, set] = useControls(() => ({
    generate: button(() => setQuery({ generate: Date.now() })),

    outputType: {
      value: "svg",
      options: ["svg", "canvas"],
      onChange: (option) => setQuery({ outputType: option }),
    },

    saveSVG: folder(
      {
        Save_SVG: button(onSaveSvg),
      },
      { render: (get) => get("outputType") === "svg" }
    ),

    saveCANVAS: folder(
      {
        Save_CANVAS: button(onSaveCanvas),
      },
      { render: (get) => get("outputType") === "canvas" }
    ),

    path_options: folder({
      drawGrid: {
        value: false,
        onChange: (value) => setQuery({ drawGrid: value }),
      },

      mirrorLeftRight: {
        value: true,
        onChange: (value) => setQuery({ mirrorLeftRight: value }),
      },

      mirrorTopBottom: {
        value: true,
        onChange: (value) => setQuery({ mirrorTopBottom: value }),
      },

      drawStartPt: {
        value: false,
        onChange: (value) => setQuery({ drawStartPt: value }),
      },
    }),

    Lines: folder({
      bgColour: {
        value: "#333",
        onChange: (value) => setQuery({ bgColour: value }),
      },

      lineColour: {
        value: "#dedede",
        onChange: (value) => setQuery({ lineColour: value }),
      },

      lineThickness: {
        value: 3,
        step: 1,
        min: 0.2,
        max: 20,
        onChange: (value) => setQuery({ lineThickness: value }),
      },
    }),

    Outlines: folder({
      outline1: {
        value: true,
        onChange: (value) => setQuery({ outline1: value }),
      },
      outline1Colour: {
        value: "red",
        onChange: (value) => setQuery({ outline1Colour: value }),
        render: (get) => get("Outlines.outline1") === true,
      },

      outline2: {
        value: false,
        onChange: (value) => setQuery({ outline2: value }),
      },
      outline2Colour: {
        value: "red",
        onChange: (value) => setQuery({ outline2Colour: value }),
        render: (get) => get("Outlines.outline2") === true,
      },

      outline3: {
        value: false,
        onChange: (value) => setQuery({ outline3: value }),
      },
      outline3Colour: {
        value: "red",
        onChange: (value) => setQuery({ outline3Colour: value }),
        render: (get) => get("Outlines.outline3") === true,
      },

      outline4: {
        value: false,
        onChange: (value) => setQuery({ outline4: value }),
      },
      outline4Colour: {
        value: "red",
        onChange: (value) => setQuery({ outline4Colour: value }),
        render: (get) => get("Outlines.outline4") === true,
      },
    }),

    CHANGING_THESE_WILL_REGENERATE_LINE: folder({
      maxRandomOffsetSize: {
        value: 0,
        step: 0.01,
        min: 0,
        max: 2,
        onChange: (value) => setQuery({ maxRandomOffsetSize: value }),
      },
      canvasWidth: {
        value: 800,
        step: 1,
        min: 10,
        max: 1000,
        onChange: (value) => setQuery({ canvasWidth: value }),
      },
      canvasHeight: {
        value: 800,
        step: 1,
        min: 10,
        max: 1000,
        onChange: (value) => setQuery({ canvasHeight: value }),
      },

      cellSize: {
        value: 10,
        step: 1,
        min: 1,
        max: 100,
        onChange: (value) => setQuery({ cellSize: value }),
      },

      outerPadding: {
        value: 40,
        step: 2,
        min: 0,
        max: 200,
        onChange: (value) => setQuery({ outerPadding: value }),
      },
    }),

    reset: button(() => history.push(`/${defaultValsPath}`)),
  }));

  useEffect(() => {
    const updatedKeys = Object.keys(query);
    if (updatedKeys.length > 0) {
      const updates = {};
      for (let key of updatedKeys) {
        updates[key] = query[key];
      }

      // set the controls based on the query
      set(updates);

      // update the app based on the query
      onChange({ ...values, ...updates });
    }

    // eslint-disable-next-line
  }, [query]);

  return <Leva hidden={!showControls} />;
}
