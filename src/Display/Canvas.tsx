import React, { useCallback, useEffect, useRef } from "react";
import { EntityManager } from "@yoieh/ecs-core";
import { useCanvasCamera2D } from "@yoieh/use-canvas-camera2d";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import { reziseCanvas } from "./reziseCanvas";
import { CanvasComponent } from "../ecs/components/CanvasComponent";

interface CanvasProps {}

const addContextEntity = (context: CanvasRenderingContext2D) => {
  const entity = EntityManager.instance.createEntity();

  entity.add(new CanvasComponent(context));

  EntityManager.instance.addEntity(entity);
};

export const Canvas: React.FC<CanvasProps> = function () {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleContextMenu = useCallback((event) => {
    leftClickOnCanvas(event);
  }, []);

  const {
    // context,
    // viewportTopLeft,
    // scale,
    // offset,
    startPan,
    // reset,
    // getTransformedPoint,
  } = useCanvasCamera2D(
    canvasRef,
    canvasRef.current?.width,
    canvasRef.current?.height,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas?.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas?.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [canvasRef, handleContextMenu]);

  useEffect(() => {
    if (canvasRef.current !== null) {
      reziseCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      addContextEntity(ctx);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => clickOnCanvas(e)}
      onMouseDown={(e) => {
        // only pan if middle mouse button
        if (e.button === 1) {
          startPan(e);
        }
      }}
    />
  );
};

export default Canvas;
