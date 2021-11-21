import { IComponent, Constr } from "@/utils/ecs";
import { IAwake, IUpdate } from "@/utils/lifecycle";

export interface IEntity extends IAwake, IUpdate {
  id: string;
  Components: IComponent[];
  AddComponent(component: IComponent): void;
  GetComponent<C extends IComponent>(constr: Constr<C>): C;
  RemoveComponent<C extends IComponent>(constr: Constr<C>): void;
  HasComponent<C extends IComponent>(constr: Constr<C>): boolean;
}
