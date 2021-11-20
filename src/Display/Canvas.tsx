import React, { useCallback, useEffect } from "react";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import Grid from "../Grid/Grid";
import { reziseCanvas } from "./reziseCanvas";
import Engine from "../Engine/Engine";

interface CanvasProps {
  setRef: (node: HTMLCanvasElement) => void;
  grid: Grid<boolean>;
  engineRef: React.MutableRefObject<Engine | undefined>;
}

export const Canvas: React.FC<CanvasProps> = function ({
  setRef,
  grid,
  engineRef,
}) {
  const handleContextMenu = useCallback(
    (event) => {
      leftClickOnCanvas(event, grid);
    },
    [grid],
  );

  useEffect(() => {
    const canvas = engineRef.current?.getCanvas();
    canvas?.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  useEffect(() => {
    if (engineRef.current) reziseCanvas(engineRef.current);
  }, [engineRef]);

  return (
    <canvas
      ref={(node) => node && setRef(node)}
      onClick={(e) => clickOnCanvas(e, grid)}
    />
  );
};

export default Canvas;
