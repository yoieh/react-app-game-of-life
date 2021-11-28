import React from "react";
import { EntityManager } from "@yoieh/ecs-core";
import { PositionComponent } from "../ecs/components/PositionComponent";
import { ActivateCellComponent } from "../ecs/components/ActivateCellComponent";

const getPositionFromEvent = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
};

export const clickOnCanvas = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
) => {
  event.preventDefault();
  const canvas = event.currentTarget;
  const context = canvas.getContext("2d");

  if (context) {
    const { x, y } = getPositionFromEvent(event);

    console.log(`click @ { x: ${x}, y: ${y} }`);

    const entity = EntityManager.instance.createEntity();

    entity.add(new PositionComponent(x, y));
    entity.add(new ActivateCellComponent());
  }
};

export default clickOnCanvas;
