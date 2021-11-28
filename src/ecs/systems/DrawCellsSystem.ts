import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { CellComponent } from "../components/CellComponent";
import { PositionComponent } from "../components/PositionComponent";
import { CanvasComponent } from "../components/CanvasComponent";

export class DrawCellsSystem extends BaseSystem {
  public q: Query;

  private canvasQuery: Query;

  public constructor() {
    super();

    this.q = new Query(
      (entity: IEntity) =>
        entity.has(PositionComponent) && entity.has(CellComponent),
    );
    this.canvasQuery = new Query((entity: IEntity) =>
      entity.has(CanvasComponent),
    );
  }

  public onUpdate(): void {
    const entities = this.q.filter(this.entityManager.entities);
    const canvasEntities = this.canvasQuery.filter(this.entityManager.entities);

    const canvas = this.canvasQuery.find(canvasEntities);

    if (!canvas) {
      return;
    }

    this.q.foreach(entities, (entity: IEntity) => {
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
