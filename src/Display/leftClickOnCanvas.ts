import React from "react";
import Grid from "../Grid/Grid";
import { drawGrid } from "./drawGrid";

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

    if (!cell.isEmpty()) {
      cell.setValue(false);
      drawGrid(context, grid);
    }
  }
};
