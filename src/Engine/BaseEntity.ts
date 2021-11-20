import { IEntity } from "./IEntity";
import { IComponent } from "./IComponent";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0;
    const v = c === "x" ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
}

export class BaseEntity implements IEntity {
  id: string;

  name: any;

  components: any;

  constructor(name: string, components: any[] = []) {
    this.id = uuidv4();
    this.name = name;
    this.components = components;
  }

  update(deltaTime: number) {
    console.log(deltaTime);
    console.log(this);
    throw new Error("Method not implemented.");
  }

  render(ctx: CanvasRenderingContext2D) {
    console.log(ctx);
    console.log(this);
    throw new Error("Method not implemented.");
  }

  getComponent(componentType: any) {
    return this.components.find(
      (component: { constructor: any }) =>
        component.constructor === componentType,
    );
  }

  getComponents(components: IComponent[]) {
    const componentTypes = components.map((c) => c.constructor);
    return this.components.filter((component: { constructor: any }) =>
      componentTypes.includes(component.constructor),
    );
  }

  hasComponent(componentType: any) {
    return this.components.some(
      (component: { constructor: any }) =>
        component.constructor === componentType,
    );
  }

  hasComponents(componentTypes: string | any[]) {
    return this.components.some((component: { constructor: any }) =>
      componentTypes.includes(component.constructor),
    );
  }

  addComponent(component: any) {
    this.components.push(component);
  }

  removeComponent(component: any) {
    this.components = this.components.filter((c: any) => c !== component);
  }

  removeComponents(componentTypes: string | any[]) {
    this.components = this.components.filter(
      (c: { constructor: any }) => !componentTypes.includes(c.constructor),
    );
  }

  removeAllComponents() {
    this.components = [];
  }

  getName() {
    return this.name;
  }
}

export default BaseEntity;
