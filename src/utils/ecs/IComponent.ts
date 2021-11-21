import { IEntity } from ".";
import { IAwake, IUpdate } from "../lifecycle";

export interface IComponent extends IAwake, IUpdate {
  Entity: IEntity | null;
}
