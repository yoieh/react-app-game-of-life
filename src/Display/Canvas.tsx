import React, { useCallback, useEffect } from "react";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import Grid from "../Grid/Grid";
import { reziseCanvas } from "./reziseCanvas";
import Engine from "../Engine/Engine";

interface CanvasProps {
  setRef: (node: HTMLCanvasElement) => void;
  grid: Grid<boolean>;
  engine: Engine;
}

export const Canvas: React.FC<CanvasProps> = function ({
  setRef,
  grid,
  engine,
}) {
  const handleContextMenu = useCallback(
    (event) => {
      leftClickOnCanvas(event, grid);
    },
    [grid],
  );

  useEffect(() => {
    const canvas = engine?.getCanvas();
    canvas?.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas?.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [engine, handleContextMenu]);

  useEffect(() => {
    console.log("engine", engine);

    if (engine) reziseCanvas(engine);
  }, [engine]);

  return (
    <canvas
      ref={(node) => node && setRef(node)}
      onClick={(e) => clickOnCanvas(e, grid, engine.EntityManager)}
    />
  );
};

export default Canvas;
