import { IEntity } from "./IEntity";

export interface IComponent {
  entity: IEntity | null;
}
