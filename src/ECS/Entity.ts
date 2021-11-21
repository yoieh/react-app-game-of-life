import { IComponent } from "./IComponent";
import { IEntity } from "./IEntity";

export class Entity implements IEntity {
  id: string = "";

  name: string;

  components: IComponent[];

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  addComponent(component: IComponent) {
    this.components.push(component);
  }

  removeComponent(component: IComponent) {
    this.components = this.components.filter((c) => c !== component);
  }

  getComponent(component: IComponent) {
    return this.components.find((c) => c instanceof component.constructor);
  }

  getComponents(component: IComponent) {
    return this.components.filter((c) => c instanceof component.constructor);
  }

  hasComponent(component: IComponent) {
    return (
      this.components.find((c) => c instanceof component.constructor) !==
      undefined
    );
  }
}

export default Entity;
