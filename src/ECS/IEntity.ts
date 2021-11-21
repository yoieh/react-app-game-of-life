import { IComponent } from "./IComponent";

export interface IEntity {
  id: string;
  name: string;
  components: IComponent[];
  addComponent(component: IComponent): void;
  removeComponent(component: IComponent): void;
  hasComponent(component: IComponent): boolean;
  getComponent(component: IComponent): IComponent | undefined;
  getComponents(component: IComponent): IComponent[];
}
