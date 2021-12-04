import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { NeighborsComponent } from "../components/NeighborsComponent";
import { SimulationTimeComponent } from "../components/SimulationTimeComponent";

export class SimpleAutomataSystem extends BaseSystem {
  private lastUpdate: number = 0;

  private activeCells: Query = new Query(
    (entity: IEntity) =>
      entity.has(CellComponent) &&
      entity.has(PositionComponent) &&
      entity.has(NeighborsComponent),
    // &&
    // entity.get(CellComponent).Value === 1
    this.entityManager,
  );

  private time = new Query((entity: IEntity) =>
    entity.has(SimulationTimeComponent),
  );

  public onUpdate(): void {
    const timeEntity = this.time.find();
    if (!timeEntity) {
      return;
    }

    const time = timeEntity.get(SimulationTimeComponent).Value;

    if (this.lastUpdate + 1000 < time) {
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

        // Each cell with one or no neighbors dies, as if by solitude.
        // Each cell with four or more neighbors dies, as if by overpopulation.
        // Each cell with two or three neighbors survives.
        if (activeCount < 2 || activeCount > 3) {
          entity.get(CellComponent).Value = 0;
        }

        // Each cell with three neighbors becomes populated.
        if (activeCount === 3) {
          entity.get(CellComponent).Value = 1;
        }
      });

      this.lastUpdate = time;
    }
  }
}

export default SimpleAutomataSystem;
