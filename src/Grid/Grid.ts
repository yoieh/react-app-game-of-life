import { BaseEntity } from "../Engine/BaseEntity";
import { Cell } from "./Cell";
import { Position } from "./Position";
import { drawGrid } from "../Display/drawGrid";
import { IGrid } from "./IGrid";

class Grid<Type> extends BaseEntity implements IGrid<Type> {
  width: number;

  height: number;

  cellSize: number;

  cells: Cell<Type>[];

  constructor(width: number, height: number, cellSize: number) {
    super("Grid");
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cells = [];
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    // do nothing
  }

  render(ctx: CanvasRenderingContext2D) {
    drawGrid(ctx, this);
  }

  generate() {
    for (let i = 0; i < this.width * this.height; i += 1) {
      this.cells.push(
        new Cell<Type>({ x: i % this.width, y: Math.floor(i / this.width) }),
      );
    }
  }

  positionToIndex({ x, y }: Position) {
    return x + this.width * y;
  }

  indexToPosition(index: number): Position {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return { x, y };
  }

  getPositionFromEvent(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const x = Math.floor(event.clientX / this.cellSize);
    const y = Math.floor(event.clientY / this.cellSize);
    return { x, y };
  }

  getCell(x: number, y: number) {
    return this.cells[this.positionToIndex({ x, y })];
  }

  getCellByPosition(position: Position) {
    return this.getCell(
      Math.floor(position.x / this.cellSize),
      Math.floor(position.y / this.cellSize),
    );
  }

  getCellByIndex(index: number) {
    const x = index % this.width;
    const y = index / this.width;
    return this.getCell(x, y);
  }

  getCells() {
    return this.cells;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getCellSize() {
    return this.cellSize;
  }

  getRandomCell() {
    return this.getCellByIndex(Math.floor(Math.random() * this.cells.length));
  }

  setCellValue(x: number, y: number, value: Type) {
    this.getCell(x, y).setValue(value);
  }
}

export default Grid;
