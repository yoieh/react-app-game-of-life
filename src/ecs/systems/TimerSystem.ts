import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { TimeComponent } from "../components/TimeComponent";

export class TimerSystem extends BaseSystem {
  public q: Query;

  public constructor() {
    super();

    this.q = new Query((entity: IEntity) => entity.has(TimeComponent));
  }

  public onUpdate(delta: number): void {
    this.q.foreach((entity: IEntity) => {
      const timeComponent = entity.get(TimeComponent);
      timeComponent.Value = delta + 1;
    });
  }
}

export default TimerSystem;
