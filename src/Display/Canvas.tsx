import React, { useCallback, useEffect, useRef } from "react";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import { reziseCanvas } from "./reziseCanvas";

interface CanvasProps {}

export const Canvas: React.FC<CanvasProps> = function () {
  const canvasRef = useRef(null);

  const handleContextMenu = useCallback((event) => {
    leftClickOnCanvas(event);
  }, []);

  // useEffect(() => {
  //   const canvas = engine?.getCanvas();
  //   canvas?.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     canvas?.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, [engine, handleContextMenu]);

  // useEffect(() => {
  //   console.log("engine", engine);

  //   if (engine) reziseCanvas(engine);
  // }, [engine]);

  return <canvas ref={canvasRef} onClick={(e) => clickOnCanvas(e)} />;
};

export default Canvas;
