import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { NeighborsComponent } from "../components/NeighborsComponent";

export class SimpleAutomataSystem extends BaseSystem {
  private activeCells: Query = new Query(
    (entity: IEntity) =>
      entity.has(CellComponent) &&
      entity.has(PositionComponent) &&
      entity.has(NeighborsComponent) &&
      entity.get(CellComponent).Value === 1,
    this.entityManager,
  );

  public onUpdate(): void {
    this.activeCells.foreach((entity: IEntity) => {
      const neighbors = entity.get(NeighborsComponent);

      let activeCount = 0;

      if (neighbors.nw?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.n?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.ne?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.e?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.se?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.s?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.sw?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (neighbors.w?.get(CellComponent).Value === 1) {
        activeCount += 1;
      }

      if (activeCount < 2 || activeCount > 3) {
        entity.get(CellComponent).Value = 0;
      }
    });
  }
}

export default SimpleAutomataSystem;
