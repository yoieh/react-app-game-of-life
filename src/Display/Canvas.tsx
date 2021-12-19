import React, { useCallback, useEffect, useRef } from "react";
import { EntityManager, Query } from "@yoieh/ecs-core";
import { useCanvasCamera2D } from "@yoieh/use-canvas-camera2d";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import { reziseCanvas } from "./reziseCanvas";
import { CanvasComponent } from "../ecs/components/CanvasComponent";
import { MouseTag } from "../ecs/components/MouseTag";
import { PositionComponent } from "../ecs/components/PositionComponent";

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
    getTransformedPoint,
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

  // track mouse position
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const mouseMove = (event: MouseEvent) => {
      if (!event.currentTarget) {
        return;
      }

      // const rect = event.currentTarget?.getBoundingClientRect();

      const transformedPoint = getTransformedPoint(
        event.clientX,
        event.clientY,
      );

      // query for entities with the mouse component
      const entities = new Query(
        (entity) => entity.has(MouseTag) && entity.has(PositionComponent),
      );

      // update the mouse component
      entities.foreach((entity) => {
        // console.log(entity);
        const mousePosition = entity.get(PositionComponent);
        mousePosition.X = transformedPoint.x;
        mousePosition.Y = transformedPoint.y;
      });
    };

    if (ctx) {
      canvas?.addEventListener("mousemove", mouseMove);
    }

    return () => {
      canvas?.removeEventListener("mousemove", mouseMove);
    };
  }, [canvasRef, getTransformedPoint]);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => {
        const pos = getTransformedPoint(e.pageX, e.pageY);

        clickOnCanvas(e, pos);
      }}
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
