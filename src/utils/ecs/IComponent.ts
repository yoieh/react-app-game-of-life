// eslint-disable-next-line import/no-cycle
import { IEntity } from "./IEntity";
import { IAwake, IUpdate } from "@/utils";

export interface IComponent extends IAwake, IUpdate {
  Entity: IEntity | null;
}
