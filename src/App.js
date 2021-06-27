import { useState } from "react";
import "./globalStyles.css";
import { saveAs } from "file-saver";
import BorgflakeGenerator from "./components/BorgflakeGenerator/BorgflakeGenerator";
import Controls from "./components/controls/Controls";

function App() {
  const [params, setParams] = useState({});

  const onParamsChange = (newParams) => {
    setParams(newParams);
  };

  const onSaveSvg = () => save_as_svg();
  const onSaveCanvas = () => onSave();

  return (
    <div className="app">
      <Controls
        onChange={onParamsChange}
        onSaveSvg={onSaveSvg}
        onSaveCanvas={onSaveCanvas}
      />
      <BorgflakeGenerator params={params} />
    </div>
  );
}

export default App;

const save_as_svg = () => {
  var full_svg = get_svg_text();
  var blob = new Blob([full_svg], { type: "image/svg+xml" });
  saveAs(blob, "borgFlakeSVG.svg");
};

const get_svg_text = () => {
  var svg_data = document.getElementById("svgHolder")
    ? document.getElementById("svgHolder").innerHTML
    : "waiting"; //put id of your svg element here

  // The return creates and easier to read file
  svg_data = svg_data.split(">").join(`>
  `);

  return svg_data;
};

const onSave = () => {
  var canvas = document.getElementById("borgFlakeCanvas");

  if (!canvas) return;
  canvas.toBlob(
    (blob) => {
      saveAs(blob, `borg-flake.jpg`);
    },
    "image/jpeg",
    0.95
  );
};
