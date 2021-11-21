import { IEntity } from "./IEntity";
import { IComponent } from "./IComponent";

export class Component implements IComponent {
  entity: IEntity | null;

  constructor() {
    this.entity = null;
  }

  getEntity() {
    return this.entity;
  }

  setEntity(entity: IEntity) {
    this.entity = entity;
  }
}

export default Component;
