import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { TimeComponent } from "../components/TimeComponent";

export class TimerSystem extends BaseSystem {
  public q: Query;

  public constructor() {
    super();

    this.q = new Query((entity: IEntity) => entity.has(TimeComponent));
  }

  public onUpdate(delta: number): void {
    // console.log(EntityManager.instance.getEntities(), this.entityManager.entities, entities.length);

    this.q.foreach((entity: IEntity) => {
      // console.log(entity.get(TimeComponent).Value)
      const timeComponent = entity.get(TimeComponent);
      timeComponent.Value = delta + 1;
    });
  }
}

export default TimerSystem;
