import React, { useMemo, useRef } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import Grid from "./Grid/Grid";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const grid = useMemo<Grid<boolean>>(() => {
    const testGrid = new Grid<boolean>(100, 100, 10);

    testGrid.generate();

    for (let index = 0; index < 10; index++) {
      testGrid.getRandomCell()?.setValue(true);
    }

    return testGrid;
  }, []);

  console.log(grid);

  return (
    <div className="App">
      <Canvas {...{ canvasRef, grid }}></Canvas>

      <UITop></UITop>
      <UIBottom></UIBottom>
    </div>
  );
}

export default App;
