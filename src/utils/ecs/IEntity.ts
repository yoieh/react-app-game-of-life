import { IComponent, Constr } from ".";

export interface IEntity {
  id: number;
  Components: IComponent[];
  AddComponent(component: IComponent): void;
  GetComponent<C extends IComponent>(constr: Constr<C>): C;
  RemoveComponent<C extends IComponent>(constr: Constr<C>): void;
  HasComponent<C extends IComponent>(constr: Constr<C>): boolean;
}
