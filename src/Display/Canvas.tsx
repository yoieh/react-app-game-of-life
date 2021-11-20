import React, { useCallback, useEffect } from "react";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import Grid from "../Grid/Grid";
import { reziseCanvas } from "./reziseCanvas";
import Engine from "../Engine/Engine";

interface CanvasProps {
  setRef: (node: HTMLCanvasElement) => void;
  grid: Grid<boolean>;
  engine: React.MutableRefObject<Engine | undefined>;
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
    const canvas = engine.current?.getCanvas();
    canvas?.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  useEffect(() => {
    if (engine.current) reziseCanvas(engine.current);
  }, [engine]);

  return (
    <canvas
      ref={(node) => node && setRef(node)}
      onClick={(e) => clickOnCanvas(e, grid)}
    />
  );
};

export default Canvas;
