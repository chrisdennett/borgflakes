import { useState } from "react";
import "./globalStyles.css";
import BorgflakeGenerator from "./components/BorgflakeGenerator/BorgflakeGenerator";
import Controls from "./components/controls/Controls";

function App() {
  const [params, setParams] = useState({});

  const onParamsChange = (newParams) => {
    setParams(newParams);
  };

  return (
    <div className="app">
      <Controls onChange={onParamsChange} />
      <BorgflakeGenerator params={params} />
    </div>
  );
}

export default App;
