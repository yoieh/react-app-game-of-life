import { IEntity } from "../Engine/IEntity";
import { Cell } from "./Cell";
import { Position } from "./Position";

export interface IGrid<Type> extends IEntity {
  getCells(): Cell<Type>[];
  indexToPosition(index: number): Position;
  getCellSize(): number;
  width: number;
  height: number;
  cells: Cell<Type>[];
}

export default IGrid;
