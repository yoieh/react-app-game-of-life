import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { CanvasComponent } from "../components/CanvasComponent";
import { GridComponent } from "../components/GridComponent";

export class DrawCellsSystem extends BaseSystem {
  public q: Query = new Query(
    (entity: IEntity) =>
      entity.has(PositionComponent) && entity.has(CellComponent),
  );

  private gridQuery: Query = new Query(
    (entity: IEntity) => entity.has(GridComponent),
    this.entityManager,
  );

  private canvasQuery: Query = new Query((entity: IEntity) =>
    entity.has(CanvasComponent),
  );

  public onRender(): void {
    const canvas = this.canvasQuery.find();
    const grid = this.gridQuery.find();

    if (!canvas || !grid) {
      return;
    }

    const cellSize = grid.get(GridComponent).CellSize;

    this.q.foreach((entity: IEntity) => {
      const position = entity.get(PositionComponent);
      const cell = entity.get(CellComponent);

      // cellcordinat to pixel cordinat
      const x = position.X * cellSize;
      const y = position.Y * cellSize;

      // needs to draw the cell
      if (cell.Value) {
        const context = canvas.get(CanvasComponent).Context;
        context.fillStyle = "black";
        context.fillRect(x, y, cellSize, cellSize);
      }
    });
  }
}

export default DrawCellsSystem;
