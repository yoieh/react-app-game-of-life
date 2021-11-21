import { Entity } from "../ecs";

export class Engine extends Entity {
  private lastTimestamp = 0;

  public Entities: Entity[] = [];

  constructor() {
    super();
    // start update loop
    this.Update();
  }

  public Awake(): void {
    super.Awake();

    // awake all children
    this.Entities.forEach((entity) => entity.Awake());

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

    // update all components
    super.Update(deltaTime);

    // update all children
    this.Entities.forEach((entity) => entity.Update(deltaTime));

    // update the timestamp
    this.lastTimestamp = Date.now();

    // Invoke on next frame
    requestAnimationFrame(() => this.Update());
  }
}

export default Engine;
