import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { CanvasComponent } from "../components/CanvasComponent";
import { GridComponent } from "../components/GridComponent";
import { MouseTag } from "../components/MouseTag";
import { PositionComponent } from "../components/PositionComponent";

export class MouseHighlightSystem extends BaseSystem {
  private q: Query;

  private canvasQuery: Query;

  private gridQuery: Query = new Query(
    (entity: IEntity) => entity.has(GridComponent),
    this.entityManager,
  );

  public constructor() {
    super();

    this.q = new Query(
      (entity: IEntity) =>
        entity.has(MouseTag) && entity.has(PositionComponent),
    );

    this.canvasQuery = new Query(
      (entity: IEntity) => entity.has(CanvasComponent),
      this.entityManager,
    );
  }

  public onCreate(): void {
    const mouse = this.entityManager.createEntity();

    mouse.add(new MouseTag());
    mouse.add(new PositionComponent(0, 0));
  }

  public onRender(): void {
    const mouse = this.q.find();
    const canvas = this.canvasQuery.find();
    const grid = this.gridQuery.find();

    if (!mouse || !canvas || !grid) {
      return;
    }

    const { X, Y } = mouse.get(PositionComponent);
    const context = canvas.get(CanvasComponent).Context;
    const cellSize = grid.get(GridComponent).CellSize;

    // snap to grid
    const x = Math.floor(X / cellSize) * cellSize;
    const y = Math.floor(Y / cellSize) * cellSize;

    // stroke with orange
    context.strokeStyle = "#ffa500";
    context.lineWidth = 0.3;
    context.strokeRect(x, y, cellSize, cellSize);
  }
}

export default MouseHighlightSystem;
