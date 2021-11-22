import { BaseSystem } from "../ecs/BaseSystem";
import { IUpdate } from "../lifecycle/ILifecycle";
import { EntityManager } from "../ecs/EntityManager";

export class Engine implements IUpdate {
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

  public constructor() {
    console.log("Engine created");
  }

  public Update(deltaTime: number): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const system of this.Systems) {
      if (system.enabled) {
        system.OnUpdate(deltaTime);
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
}

export default Engine;
