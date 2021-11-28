import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { CanvasComponent } from "../components/CanvasComponent";

export class DrawCellsSystem extends BaseSystem {
  public q: Query = new Query(
    (entity: IEntity) =>
      entity.has(PositionComponent) && entity.has(CellComponent),
  );

  private canvasQuery: Query = new Query((entity: IEntity) =>
    entity.has(CanvasComponent),
  );

  public onUpdate(): void {
    const canvas = this.canvasQuery.find();

    if (!canvas) {
      return;
    }

    this.q.foreach((entity: IEntity) => {
      // console.log(entity.get(TimeComponent).Value)
      const position = entity.get(PositionComponent);
      const cell = entity.get(CellComponent);

      // needs to draw the cell
      if (cell.Value) {
        const context = canvas.get(CanvasComponent).Context;
        context.fillStyle = "black";
        context.fillRect(position.X, position.Y, 10, 10);
      }
    });
  }
}

export default DrawCellsSystem;
