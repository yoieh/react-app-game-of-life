import { IEntity } from "./IEntity";
import { IUpdate } from "./IUpdate";

export interface IComponent extends IUpdate {
  Entity: IEntity | null;
}
