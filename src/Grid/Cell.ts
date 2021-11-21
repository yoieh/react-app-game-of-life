import { Position } from "./Position";
import { BaseEntity } from "../Engine/BaseEntity";
import { IEntity } from "../Engine/IEntity";

export class Cell<Type> extends BaseEntity implements IEntity {
  private position: Position;

  private value!: Type;

  get Value(): Type {
    return this.value;
  }

  set Value(value: Type) {
    this.value = value;
  }

  constructor(position: Position) {
    super(`cell: ${position.toString()}`);
    this.position = position;
  }

  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }

  getPosition(): Position {
    return this.position;
  }

  setValue(value: Type): void {
    this.value = value;
  }

  isEmpty(): boolean {
    return !this.value;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.value) {
      ctx.fillRect(this.x * 10, this.y * 10, 10, 10); // grid.getCellSize(), grid.getCellSize());
    } else {
      ctx.clearRect(this.x * 10, this.y * 10, 10, 10); // grid.getCellSize(), grid.getCellSize());
    }
  }
}

export default Cell;
