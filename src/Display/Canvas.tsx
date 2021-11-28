import React, { useCallback, useEffect, useRef } from "react";
import { Entity, EntityManager } from "@yoieh/ecs-core";

import { leftClickOnCanvas } from "./leftClickOnCanvas";
import { clickOnCanvas } from "./clickOnCanvas";
import { reziseCanvas } from "./reziseCanvas";
import { CanvasComponent } from "../ecs/components/CanvasComponent";

interface CanvasProps {}

const addContextEntity = (context: CanvasRenderingContext2D) => {
  const entity = new Entity(1);

  entity.add(new CanvasComponent(context));

  EntityManager.instance.addEntity(entity);
};

export const Canvas: React.FC<CanvasProps> = function () {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleContextMenu = useCallback((event) => {
    leftClickOnCanvas(event);
  }, []);

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

  return <canvas ref={canvasRef} onClick={(e) => clickOnCanvas(e)} />;
};

export default Canvas;
