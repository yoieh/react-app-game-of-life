import React, { useCallback, useEffect } from "react";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import Grid from "../Grid/Grid";
import { reziseCanvas } from "./reziseCanvas";

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  grid: Grid<boolean>;
}

export const Canvas: React.FC<CanvasProps> = function ({
  canvasRef,
  grid,
  // ...props
}) {
  const handleContextMenu = useCallback(
    (event) => {
      leftClickOnCanvas(event, grid);
    },
    [grid],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas?.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) reziseCanvas(canvas);
  }, [canvasRef, grid]);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => clickOnCanvas(e, grid)}
      // {...props}
    />
  );
};

export default Canvas;
