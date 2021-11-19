import React, { useCallback, useEffect, useRef } from "react";
import Grid from "./Grid/Grid";

const testGrid = new Grid(100, 100, 10);
testGrid.generate();

for (let index = 0; index < 10; index++) {
  testGrid.getRandomCell()?.setValue(true);
}

export const Canvas = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLCanvasElement> &
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
) => {
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
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas) reziseCanvas(canvas);
    if (context) drawGrid(context);
  }, []);

  return <canvas ref={canvasRef} onClick={clickOnCanvas} {...props} />;
};

const reziseCanvas = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const drawGrid = (context: CanvasRenderingContext2D) => {
  const cells = testGrid.getCells();

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const position = testGrid.indexToPosition(i);

    const x = position.x * testGrid.getCellSize();
    const y = position.y * testGrid.getCellSize();

    if (cell.getValue()) {
      context.fillRect(x, y, testGrid.getCellSize(), testGrid.getCellSize());
    } else {
      context.clearRect(x, y, testGrid.getCellSize(), testGrid.getCellSize());
    }

    context.strokeStyle = "#C0C0C0";
    context.lineWidth = 0.05;
    context.strokeRect(x, y, testGrid.getCellSize(), testGrid.getCellSize());
  }
};

const clickOnCanvas = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
) => {
  event.preventDefault();
  const canvas = event.currentTarget;
  const context = canvas.getContext("2d");

  if (context) {
    const position = testGrid.getPositionFromEvent(event);
    const cell = testGrid.getCell(position.x, position.y);

    if (cell.isEmpty()) {
      cell.setValue(!cell.getValue());
      drawGrid(context);
    }
  }
};

const leftClickOnCanvas = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
) => {
  event.preventDefault();
  const canvas = event.currentTarget;
  const context = canvas.getContext("2d");

  if (context) {
    const position = testGrid.getPositionFromEvent(event);
    const cell = testGrid.getCell(position.x, position.y);

    if (!cell.isEmpty()) {
      cell.setValue(false);
      drawGrid(context);
    }
  }
};
