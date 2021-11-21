import { IComponent } from "./IComponent";
import { Constr, IEntity } from "./IEntity";

export abstract class Entity implements IEntity {
  id: string = "";

  protected components: IComponent[] = [];

  get Components(): IComponent[] {
    return this.components;
  }

  constructor() {
    this.components = [];
  }

  public AddComponent(component: IComponent) {
    this.components.push(component);
  }

  public RemoveComponent<C extends IComponent>(constr: Constr<C>): void {
    this.components = this.components.filter((c) => !(c instanceof constr));
  }

  public GetComponent<C extends IComponent>(constr: Constr<C>): C {
    const component = this.components.find((c) => c instanceof constr);

    if (component) {
      return component as C;
    }

    throw new Error(
      `Component ${constr.name} not found on Entity ${this.constructor.name}`,
    );
  }

  public HasComponent<C extends IComponent>(constr: Constr<C>): boolean {
    return this.components.find((c) => c instanceof constr) !== undefined;
  }

  public Awake(): void {
    this.components.forEach((c) => c.Awake());
  }

  public Update(deltaTime: number): void {
    this.components.forEach((c) => c.Update(deltaTime));
  }
}

export default Entity;
