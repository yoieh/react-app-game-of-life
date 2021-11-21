import { BaseSystem } from "../ecs/BaseSystem";
import { IAwake, IUpdate } from "../lifecycle/ILifecycle";
import { EntityManager } from "../ecs/EntityManager";

export class Engine implements IAwake, IUpdate {
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

    // update all children

    // before update
    this.Systems.filter((s) => s.beforeUpdate).forEach((system) =>
      system.OnUpdate(deltaTime),
    );

    // update
    this.Systems.filter(
      (s) => !s.afterUpdate && !s.beforeUpdate && !s.afterUpdate,
    ).forEach((system) => system.OnUpdate(deltaTime));

    // after update
    this.Systems.filter((s) => s.afterUpdate).forEach((system) =>
      system.OnUpdate(deltaTime),
    );

    // last update
    this.Systems.filter((s) => s.lastUpdate).forEach((system) =>
      system.OnUpdate(deltaTime),
    );

    // update the timestamp
    this.lastTimestamp = Date.now();

    // Invoke on next frame
    requestAnimationFrame(() => this.Update());
  }

  public RegisterSystem(system: BaseSystem): void {
    this.Systems.push(system);
  }
}

export default Engine;
