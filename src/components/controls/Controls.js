import React, { useEffect } from "react";
import { Leva, useControls } from "leva";
import { useQueryParams, BooleanParam } from "use-query-params";

export default function Controls({ showControls = true, onChange }) {
  const [query, setQuery] = useQueryParams({
    drawGrid: BooleanParam,
  });

  const [values, set] = useControls(() => ({
    drawGrid: {
      value: false,
      onChange: (value) => setQuery({ drawGrid: value }),
    },
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
