import { IComponent } from "./IComponent";
import { IUpdate } from "./IUpdate";

export type Constr<T> = { new (...args: unknown[]): T };

export interface IEntity extends IUpdate {
  id: string;
  Components: IComponent[];
  AddComponent(component: IComponent): void;
  GetComponent<C extends IComponent>(constr: Constr<C>): C;
  RemoveComponent<C extends IComponent>(constr: Constr<C>): void;
  HasComponent<C extends IComponent>(constr: Constr<C>): boolean;
}
