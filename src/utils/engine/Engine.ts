import { BaseSystem } from "../ecs/BaseSystem";
import { IAwake, IUpdate } from "../lifecycle/ILifecycle";
import { EntityManager } from "../ecs/EntityManager";

export class Engine implements IAwake, IUpdate {
  private stopUpdate: boolean = false;

  private static instance: Engine;

  public static get Instance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }
    return Engine.instance;
  }

  private lastTimestamp = 0;

  public Systems: BaseSystem[] = [];

  public EntityManager: EntityManager = EntityManager.Instance;

  constructor() {
    // start update loop
    this.Update();
  }

  public Awake(): void {
    // awake all children

    // Make sure Update starts after all entities are awaken
    requestAnimationFrame(() => {
      // set initial timestamp
      this.lastTimestamp = Date.now();

      // start update loop
      this.Update();
    });
  }

  public Update(): void {
    const deltaTime = (Date.now() - this.lastTimestamp) / 1000;

    if (this.stopUpdate) {
      console.log(`${this.constructor.name} stoped`);
      return;
    }

    const update = (system: BaseSystem) => {
      system.OnUpdate(deltaTime);
    };

    // update all children

    // before update
    const toBeforeUpadte = this.Systems.filter((s) => s.beforeUpdate);
    // update
    const toUpadte = this.Systems.filter(
      (s) => !s.afterUpdate && !s.beforeUpdate && !s.afterUpdate,
    );
    // after update
    const toAfterUpdate = this.Systems.filter((s) => s.afterUpdate);
    // last update
    const toLastUpdate = this.Systems.filter((s) => s.lastUpdate);

    // update the timestamp

    try {
      toUpadte.forEach(update);

      toBeforeUpadte.forEach(update);

      toAfterUpdate.forEach(update);

      toLastUpdate.forEach(update);

      this.lastTimestamp = Date.now();

      // Invoke on next frame
      requestAnimationFrame(() => this.Update());
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  public RegisterSystem(system: BaseSystem): void {
    console.log(`Register: ${system.constructor.name}`);
    this.Systems.push(system);
  }

  public UnregisterSystem(system: BaseSystem): void {
    console.log(`Unregister: ${system.constructor.name}`);
    this.Systems = this.Systems.filter((s) => s !== system);
  }

  public Stop() {
    console.log(`Stopping ${this.constructor.name}...`);
    this.Destroy();
  }

  public Destroy() {
    Engine.Instance.stopUpdate = true;

    this.Systems.forEach((system) => {
      this.UnregisterSystem(system);
    });
  }
}

export default Engine;
