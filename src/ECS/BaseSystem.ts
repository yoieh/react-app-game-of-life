import { IComponent } from "./IComponent";
import { ISystem } from "./ISystem";
import { IEntity } from "../Engine/IEntity";

export class BaseSystem implements ISystem {
  name: string;

  priority: any;

  components: any[];

  constructor(name: string, priority: any, components: IComponent[]) {
    this.name = name;
    this.priority = priority;
    this.components = components;
  }

  update(delta: number, entities: IEntity[]) {
    console.log(delta, entities, this.components);
    throw new Error("Method not implemented.");
  }
}

export default System;
