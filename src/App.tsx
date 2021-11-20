import React, { useEffect, useMemo, useRef, useState } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import Grid from "./Grid/Grid";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";
import Engine from "./Engine/Engine";

const App: React.FC = function () {
  const [stated, setStated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const grid = useMemo<Grid<boolean>>(() => {
    const testGrid = new Grid<boolean>(100, 100, 10);

    testGrid.generate();

    for (let index = 0; index < 10; index += 1) {
      testGrid.getRandomCell()?.setValue(true);
    }

    return testGrid;
  }, []);

  useEffect(() => {
    if (canvasRef.current && !stated) {
      const engine = new Engine(canvasRef.current);
      engine.start();
      engine.addEntity(grid);
      setStated(true);
    }
  }, [grid, stated]);

  return (
    <div className="App">
      {/* {engine?.getFps()} */}
      <Canvas {...{ canvasRef, grid }} />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
