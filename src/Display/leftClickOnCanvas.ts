import React from "react";
import Grid from "../Grid/Grid";

export const leftClickOnCanvas = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  grid: Grid<any>,
) => {
  event.preventDefault();
  const canvas = event.currentTarget;
  const context = canvas.getContext("2d");

  if (context) {
    const position = grid.getPositionFromEvent(event);
    const cell = grid.getCell(position.x, position.y);

    if (cell && !cell.isEmpty()) {
      cell.setValue(false);
    }
  }
};

export default leftClickOnCanvas;
