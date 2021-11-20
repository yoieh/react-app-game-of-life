import Grid from "../Grid/Grid";

export const reziseCanvas = (canvas: HTMLCanvasElement, grid: Grid<any>) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
