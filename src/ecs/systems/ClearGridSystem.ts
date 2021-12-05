import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { ClearGridCommandComponent } from "../components/ClearGridCommandComponent";

export class ClearGridSystem extends BaseSystem {
  private lastUpdate: number = 0;

  private activeCells: Query = new Query(
    (entity: IEntity) =>
      entity.has(CellComponent) && entity.has(PositionComponent),
    // &&
    // entity.get(CellComponent).Value === 1
    this.entityManager,
  );

  private clearQ = new Query((entity: IEntity) =>
    entity.has(ClearGridCommandComponent),
  );

  public onUpdate(): void {
    const clear = this.clearQ.find();

    if (clear) {
      this.activeCells.foreach((entity: IEntity) => {
        entity.get(CellComponent).Value = 0;
      });

      this.entityManager.removeEntity(clear.id);
    }
  }
}

export default ClearGridSystem;
