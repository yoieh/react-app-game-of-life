import React, { useEffect, useMemo } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import Grid from "./Grid/Grid";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";
import { useEngineRef } from "./useEngineRef";

const App: React.FC = function () {
  const { createEngine, engineRef } = useEngineRef();

  const grid = useMemo<Grid<boolean>>(() => {
    const testGrid = new Grid<boolean>(100, 100, 10);

    testGrid.generate();

    for (let index = 0; index < 10; index += 1) {
      testGrid.getRandomCell()?.setValue(true);
    }

    return testGrid;
  }, []);

  useEffect(() => {
    if (engineRef.current && engineRef.current?.getEntities().length <= 0) {
      engineRef.current.addEntity(grid);
    }
  }, [grid, engineRef]);

  return (
    <div className="App">
      <Canvas setRef={createEngine} engine={engineRef} {...{ grid }} />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
