import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { SimulationTimeComponent } from "../components/SimulationTimeComponent";
import { GridComponent } from "../components/GridComponent";
import Neighbors from "../../utils/Neighbors";

const neighborsCheck = new Neighbors();

export class SimpleAutomataSystem extends BaseSystem {
  private lastUpdate: number = 0;

  private activeCells: Query = new Query(
    (entity: IEntity) =>
      entity.has(CellComponent) && entity.has(PositionComponent),
    // &&
    // entity.get(CellComponent).Value === 1
    this.entityManager,
  );

  private time = new Query((entity: IEntity) =>
    entity.has(SimulationTimeComponent),
  );

  private gridQuery: Query = new Query((entity: IEntity) =>
    entity.has(GridComponent),
  );

  public onUpdate(): void {
    const timeEntity = this.time.find();
    if (!timeEntity) {
      return;
    }

    const time = timeEntity.get(SimulationTimeComponent).Value;
    const { speedMultiplier } = timeEntity.get(SimulationTimeComponent);

    // this aleast works for now...
    const nextUpdate = this.lastUpdate + 100 / speedMultiplier;

    if (nextUpdate < time) {
      this.activeCells.foreach((entity: IEntity) => {
        const { X, Y } = entity.get(PositionComponent);
        const neighbors = neighborsCheck.getAllNeighbors(X, Y);

        let activeCount = 0;

        const gird = this.gridQuery.find();

        neighbors.forEach(({ x, y }) => {
          if (gird) {
            const width = gird.get(GridComponent).Width;
            const cell = gird.get(GridComponent).Cells[x + y * width];

            if (cell && cell.get(CellComponent).Value === 1) {
              activeCount += 1;
            }
          }
        });

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
