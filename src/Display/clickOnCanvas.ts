import React from "react";
import Grid from "../Grid/Grid";
import EntityManager from "../Engine/EntityManager";

export const clickOnCanvas = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  grid: Grid<boolean>,
  entityManager: EntityManager,
) => {
  event.preventDefault();
  const canvas = event.currentTarget;
  const context = canvas.getContext("2d");

  if (context) {
    const position = grid.getPositionFromEvent(event);
    const cell = grid.getCell(position.x, position.y);

    if (cell) entityManager.addEntity(cell);

    if (cell?.isEmpty()) {
      cell.setValue(!cell.Value);
    }
  }
};

export default clickOnCanvas;
