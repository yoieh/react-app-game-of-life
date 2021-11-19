import { Position } from "./Position";

export class Cell<Type> {
  private position: Position;
  private value!: Type;

  constructor(position: Position) {
    this.position = position;
  }

  x(): number {
    return this.position.x;
  }
  y(): number {
    return this.position.y;
  }

  getPosition(): Position {
    return this.position;
  }

  setValue(value: Type): void {
    this.value = value;
  }
  getValue(): Type {
    return this.value;
  }
  isEmpty(): boolean {
    return !this.value;
  }
}
