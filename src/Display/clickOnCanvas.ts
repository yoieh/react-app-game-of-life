import React from "react";
import { Entity, EntityManager } from "@yoieh/ecs-core";
import { PositionComponent } from "../ecs/components/PositionComponent";
import { CellComponent } from "../ecs/components/CellComponent";

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

    const entity = new Entity(1);

    entity.add(new PositionComponent(x, y));
    entity.add(new CellComponent(1));

    EntityManager.instance.addEntity(entity);
  }
};

export default clickOnCanvas;