import React, { useMemo, useRef } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import Grid from "./Grid/Grid";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";
import Engine from "./Engine/Engine";

const App: React.FC = function () {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const grid = useMemo<Grid<boolean>>(() => {
    const testGrid = new Grid<boolean>(100, 100, 10);

    testGrid.generate();

    for (let index = 0; index < 10; index += 1) {
      testGrid.getRandomCell()?.setValue(true);
    }

    return testGrid;
  }, []);

  const engine = useMemo(() => {
    if (canvasRef.current) {
      const memoEngine = new Engine(canvasRef.current);
      memoEngine.start();
      return memoEngine;
    }
    return undefined;
  }, [canvasRef]);

  return (
    <div className="App">
      {engine?.getFps()}
      <Canvas {...{ canvasRef, grid }} />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
