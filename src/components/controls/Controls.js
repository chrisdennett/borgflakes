import React, { useEffect } from "react";
import { button, folder, Leva, useControls } from "leva";
import {
  useQueryParams,
  BooleanParam,
  StringParam,
  NumberParam,
} from "use-query-params";

export default function Controls({ showControls = true, onChange }) {
  const [query, setQuery] = useQueryParams({
    generate: StringParam,
    drawCanvas: BooleanParam,
    drawSvg: BooleanParam,
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
  });

  const [values, set] = useControls(() => ({
    generate: button(() => setQuery({ generate: Date.now() })),

    drawSvg: {
      value: false,
      onChange: (value) => setQuery({ drawSvg: value }),
    },

    drawCanvas: {
      value: false,
      onChange: (value) => setQuery({ drawCanvas: value }),
    },

    drawGrid: {
      value: false,
      onChange: (value) => setQuery({ drawGrid: value }),
    },

    mirrorLeftRight: {
      value: false,
      onChange: (value) => setQuery({ mirrorLeftRight: value }),
    },

    mirrorTopBottom: {
      value: false,
      onChange: (value) => setQuery({ mirrorTopBottom: value }),
    },

    drawStartPt: {
      value: false,
      onChange: (value) => setQuery({ drawStartPt: value }),
    },

    Colours: folder({
      bgColour: {
        value: "#333",
        onChange: (value) => setQuery({ bgColour: value }),
      },
      lineColour: {
        value: "#fff",
        onChange: (value) => setQuery({ lineColour: value }),
      },
    }),

    lineThickness: {
      value: 1,
      step: 1,
      min: 0.2,
      max: 20,
      onChange: (value) => setQuery({ lineThickness: value }),
    },

    CanvasSize: folder({
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
    }),
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
