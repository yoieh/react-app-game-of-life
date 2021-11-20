import React from "react";
import { drawGrid } from "./drawGrid";
import Grid from "../Grid/Grid";

export const clickOnCanvas = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  grid: Grid<boolean>,
) => {
  event.preventDefault();
  const canvas = event.currentTarget;
  const context = canvas.getContext("2d");

  if (context) {
    const position = grid.getPositionFromEvent(event);
    const cell = grid.getCell(position.x, position.y);

    if (cell.isEmpty()) {
      cell.setValue(!cell.getValue());
      drawGrid(context, grid);
    }
  }
};

export default clickOnCanvas;
