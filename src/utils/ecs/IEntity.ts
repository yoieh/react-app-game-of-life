import { IComponent, Constr } from ".";
import { IAwake, IUpdate } from "../lifecycle";

export interface IEntity extends IAwake, IUpdate {
  id: string;
  Components: IComponent[];
  AddComponent(component: IComponent): void;
  GetComponent<C extends IComponent>(constr: Constr<C>): C;
  RemoveComponent<C extends IComponent>(constr: Constr<C>): void;
  HasComponent<C extends IComponent>(constr: Constr<C>): boolean;
}
