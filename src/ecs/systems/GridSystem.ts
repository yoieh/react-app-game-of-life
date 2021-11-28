import { BaseSystem, Engine, IEntity, Query } from "@yoieh/ecs-core";
import { CanvasComponent } from "../components/CanvasComponent";
import { CellComponent } from "../components/CellComponent";
import { GridComponent } from "../components/GridComponent";
// import { NeighborsComponent } from "../components/NeighborsComponent";
import { PositionComponent } from "../components/PositionComponent";

export class GridSystem extends BaseSystem {
  private gridQuery: Query = new Query(
    (entity: IEntity) => entity.has(GridComponent),
    this.entityManager,
  );

  private canvasQuery: Query = new Query(
    (entity: IEntity) => entity.has(CanvasComponent),
    this.entityManager,
  );

  private cellsQuery: Query = new Query(
    (entity: IEntity) => entity.has(PositionComponent), // && entity.has(NeighborsComponent),
    this.entityManager,
  );

  public TEST = "TEST";

  public constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  public onCreate(): void {
    const canvas = this.canvasQuery.find();
    const grid = this.gridQuery.find();

    if (!canvas || !grid) {
      Engine.instance.unregisterSystem(this);
      return;
    }

    const context = canvas.get(CanvasComponent).Context;

    // draw grid
    const gridComponent = grid.get(GridComponent);

    context.strokeStyle = "#c0c0c0";
    context.lineWidth = 0.03;

    for (let x = 0; x < gridComponent.Width / gridComponent.CellSize; x += 1) {
      for (
        let y = 0;
        y < gridComponent.Height / gridComponent.CellSize;
        y += 1
      ) {
        const cell = this.entityManager.createEntity();

        // snap to grid

        cell.add(new PositionComponent(x, y));
        cell.add(new CellComponent());
        // need a whay to find all the neighbors
        // cell.add(
        //   new NeighborsComponent(
        //     null,
        //     null,
        //     null,
        //     null,
        //     null,
        //     null,
        //     null,
        //     null,
        //   ),
        // );
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public onUpdate(): void {
    const canvas = this.canvasQuery.find();
    const grid = this.gridQuery.find();

    if (!canvas || !grid) {
      return;
    }

    const context = canvas.get(CanvasComponent).Context;

    // draw grid
    const gridComponent = grid.get(GridComponent);

    this.cellsQuery.foreach((entity: IEntity) => {
      const position = entity.get(PositionComponent);
      // const neighbors = entity.get(NeighborsComponent);

      // needs to draw the cell
      context.strokeStyle = "#c0c0c0";
      context.lineWidth = 0.03;

      context.strokeRect(
        position.X * gridComponent.CellSize,
        position.Y * gridComponent.CellSize,
        gridComponent.CellSize,
        gridComponent.CellSize,
      );
    }, this.entityManager.entities);
  }
}

export default GridSystem;
