import { IComponent } from "../Engine/IComponent";
import { IEntity } from "./IEntity";
import { ISystem } from "./ISystem";

export class ECS {
  entities: IEntity[];

  components: IComponent[];

  systems: ISystem[];

  constructor() {
    this.entities = [];
    this.components = [];
    this.systems = [];
  }

  addEntity(entity: IEntity) {
    this.entities.push(entity);
  }

  addComponent(component: IComponent) {
    this.components.push(component);
  }

  addSystem(system: ISystem) {
    this.systems.push(system);
  }

  update(deltaTime: number) {
    this.systems.forEach((system) => {
      system.update(deltaTime);
    });
  }
}

export default ECS;
