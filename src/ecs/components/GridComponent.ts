import { IComponent, IEntity } from "@yoieh/ecs-core";

export class GridComponent implements IComponent {
  constructor(
    public Width: number = 0,
    public Height: number = 0,
    public CellSize: number = 0,

    public Cells: IEntity[] = [],
  ) {}
}

export default GridComponent;
