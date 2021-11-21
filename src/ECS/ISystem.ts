import { IEntity } from "./IEntity";

export interface ISystem {
  update(delta: number, entities: IEntity[]): void;
}
