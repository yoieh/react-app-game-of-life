import { Entity } from "../ecs/Entity";

class Engine extends Entity {
  private lastTimestamp = 0;

  constructor() {
    super();
    // start update loop
    this.Update();
  }

  public Update(): void {
    const deltaTime = (Date.now() - this.lastTimestamp) / 1000;

    // update all components
    super.Update(deltaTime);

    // update the timestamp
    this.lastTimestamp = Date.now();

    // Invoke on next frame
    requestAnimationFrame(() => this.Update());
  }
}

export default Engine;
