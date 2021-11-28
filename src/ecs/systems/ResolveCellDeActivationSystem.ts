import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { CanvasComponent } from "../components/CanvasComponent";
import { CellComponent } from "../components/CellComponent";
import { DeActivateCellComponent } from "../components/DeActivateCellComponent";
import { GridComponent } from "../components/GridComponent";
import { PositionComponent } from "../components/PositionComponent";

export class ResolveCellDeActivationSystem extends BaseSystem {
  private gridQuery: Query = new Query(
    (entity: IEntity) => entity.has(GridComponent),
    this.entityManager,
  );

  private canvasQuery: Query = new Query(
    (entity: IEntity) => entity.has(CanvasComponent),
    this.entityManager,
  );

  private deactivateCellsQuery: Query = new Query(
    (entity: IEntity) => entity.has(DeActivateCellComponent),
    this.entityManager,
  );

  private cellQuery: Query = new Query(
    (entity: IEntity) => entity.has(CellComponent),
    this.entityManager,
  );

  public onUpdate(): void {
    const canvas = this.canvasQuery.find();
    const gridQuery = this.gridQuery.find();

    if (!canvas || !gridQuery) {
      return;
    }

    const newCellPositions: PositionComponent[] = [];

    this.deactivateCellsQuery.foreach((entity: IEntity) => {
      const position = entity.get(PositionComponent);
      const grid = gridQuery.get(GridComponent);
      const canvasComponent = canvas.get(CanvasComponent);

      if (position && grid && canvasComponent) {
        // to cell cordinat
        const cellX = Math.floor(position.X / grid.CellSize);
        const cellY = Math.floor(position.Y / grid.CellSize);

        position.X = cellX;
        position.Y = cellY;

        newCellPositions.push(position);

        // delete activations cell
        this.entityManager.removeEntity(entity.id);
      }
    });

    if (newCellPositions.length > 0) {
      this.cellQuery.foreach((entity: IEntity) => {
        const positionComponent = entity.get(PositionComponent);

        // checing if position is in newCellPositions
        const isActive = newCellPositions.some(
          (newActiveCellPosition: PositionComponent) =>
            newActiveCellPosition.X === positionComponent.X &&
            newActiveCellPosition.Y === positionComponent.Y,
        );

        if (isActive) {
          entity.add(new CellComponent(0));
        }
      });
    }
  }
}

export default ResolveCellDeActivationSystem;
