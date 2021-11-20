import React, { useCallback, useEffect, useMemo, useRef } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import Grid from "./Grid/Grid";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";
import Engine from "./Engine/Engine";

const useCanvasRef = () => {
  const ref: React.MutableRefObject<HTMLCanvasElement | undefined> =
    useRef<HTMLCanvasElement>();
  const engineRef: React.MutableRefObject<Engine | undefined> =
    useRef<Engine>();

  const setRef = useCallback((node: HTMLCanvasElement) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.

      if (!engineRef.current) {
        engineRef.current = new Engine(node);
        engineRef.current.start();
      }
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return { setRef, ref, engineRef };
};

const App: React.FC = function () {
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const { setRef, ref, engineRef } = useCanvasRef();

  const grid = useMemo<Grid<boolean>>(() => {
    const testGrid = new Grid<boolean>(100, 100, 10);

    testGrid.generate();

    for (let index = 0; index < 10; index += 1) {
      testGrid.getRandomCell()?.setValue(true);
    }

    return testGrid;
  }, []);

  useEffect(() => {
    if (ref.current && engineRef.current) {
      engineRef.current.addEntity(grid);
    }
  }, [ref, grid, engineRef]);

  return (
    <div className="App">
      <Canvas setRef={setRef} engineRef={engineRef} {...{ grid }} />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
