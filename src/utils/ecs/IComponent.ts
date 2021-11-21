import { IEntity } from "@/utils/ecs";
import { IAwake, IUpdate } from "@/utils/lifecycle";

export interface IComponent extends IAwake, IUpdate {
  Entity: IEntity | null;
}
