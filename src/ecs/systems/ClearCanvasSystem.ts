import { BaseSystem, Query, IEntity } from "@yoieh/ecs-core";
import { CanvasComponent } from "../components/CanvasComponent";
import { GridComponent } from "../components/GridComponent";

export class ClearCanvasSystem extends BaseSystem {
  private gridQuery: Query = new Query(
    (entity: IEntity) => entity.has(GridComponent),
    this.entityManager,
  );

  private canvasQuery: Query = new Query(
    (entity: IEntity) => entity.has(CanvasComponent),
    this.entityManager,
  );

  public onRender(): void {
    const canvas = this.canvasQuery.find();
    const gridQuery = this.gridQuery.find();

    if (!canvas || !gridQuery) {
      return;
    }

    const ctx = canvas.get(CanvasComponent).Context;
    ctx.clearRect(
      0,
      0,
      gridQuery.get(GridComponent).Width,
      gridQuery.get(GridComponent).Height,
    );
  }
}

export default ClearCanvasSystem;
