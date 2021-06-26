import React, { useEffect } from "react";
import { folder, Leva, useControls } from "leva";
import {
  useQueryParams,
  BooleanParam,
  StringParam,
  NumberParam,
} from "use-query-params";

export default function Controls({ showControls = true, onChange }) {
  const [query, setQuery] = useQueryParams({
    drawGrid: BooleanParam,
    bgColour: StringParam,
    lineColour: StringParam,
    canvasWidth: NumberParam,
    canvasHeight: NumberParam,
    lineThickness: NumberParam,
  });

  const [values, set] = useControls(() => ({
    drawGrid: {
      value: false,
      onChange: (value) => setQuery({ drawGrid: value }),
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
