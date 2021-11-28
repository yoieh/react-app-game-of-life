import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { ActivateCellComponent } from "../components/ActivateCellComponent";
import { CanvasComponent } from "../components/CanvasComponent";
import { CellComponent } from "../components/CellComponent";
import { GridComponent } from "../components/GridComponent";
import { PositionComponent } from "../components/PositionComponent";

export class ResolveCellPositionSystem extends BaseSystem {
  private gridQuery: Query = new Query(
    (entity: IEntity) => entity.has(GridComponent),
    this.entityManager,
  );

  private canvasQuery: Query = new Query(
    (entity: IEntity) => entity.has(CanvasComponent),
    this.entityManager,
  );

  private activateCellsQuery: Query = new Query(
    (entity: IEntity) =>
      entity.has(ActivateCellComponent) && entity.has(PositionComponent),
    this.entityManager,
  );

  private deactivateCellsQuery: Query = new Query(
    (entity: IEntity) => entity.has(CanvasComponent),
    this.entityManager,
  );

  public onUpdate(): void {
    const canvas = this.canvasQuery.find();
    const gridQuery = this.gridQuery.find();

    if (!canvas || !gridQuery) {
      return;
    }

    this.activateCellsQuery.foreach((entity: IEntity) => {
      const position = entity.get(PositionComponent);
      const grid = gridQuery.get(GridComponent);
      const canvasComponent = canvas.get(CanvasComponent);

      if (position && grid && canvasComponent) {
        // snap to grid
        const snappedX = Math.floor(position.X / grid.CellSize) * grid.CellSize;
        const snappedY = Math.floor(position.Y / grid.CellSize) * grid.CellSize;

        position.X = snappedX;
        position.Y = snappedY;

        entity.add(new CellComponent(1));
        entity.remove(ActivateCellComponent);
      }
    });
  }
}

export default ResolveCellPositionSystem;
