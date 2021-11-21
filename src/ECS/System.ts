import { IComponent } from "./IComponent";

export class System {
  name: string;

  priority: any;

  components: any[];

  constructor(name: string, priority: any, components: IComponent[]) {
    this.name = name;
    this.priority = priority;
    this.components = components;
  }

  update(dt: any, entities: any) {
    console.log(dt, entities, this.components);
    throw new Error("Method not implemented.");
  }
}

export default System;
