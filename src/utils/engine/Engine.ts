import { System } from "../ecs/System";
import { IAwake, IUpdate } from "../lifecycle/ILifecycle";

export class Engine implements IAwake, IUpdate {
  private lastTimestamp = 0;

  public Systems: System[] = [];

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
    // const deltaTime = (Date.now() - this.lastTimestamp) / 1000;

    // update all components
    // super.Update(deltaTime);

    // update all children
    this.Systems.forEach((system) => system.OnUpdate());

    // update the timestamp
    this.lastTimestamp = Date.now();

    // Invoke on next frame
    requestAnimationFrame(() => this.Update());
  }
}

export default Engine;
