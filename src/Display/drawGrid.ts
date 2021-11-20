import Grid from "../Grid/Grid";

export const drawGrid = (
  context: CanvasRenderingContext2D,
  grid: Grid<any>,
) => {
  const cells = grid.getCells();

  for (let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];
    const position = grid.indexToPosition(i);

    const x = position.x * grid.getCellSize();
    const y = position.y * grid.getCellSize();

    if (cell.getValue()) {
      context.fillRect(x, y, grid.getCellSize(), grid.getCellSize());
    } else {
      context.clearRect(x, y, grid.getCellSize(), grid.getCellSize());
    }

    context.strokeStyle = "#C0C0C0";
    context.lineWidth = 0.05;
    context.strokeRect(x, y, grid.getCellSize(), grid.getCellSize());
  }
};

export default drawGrid;
