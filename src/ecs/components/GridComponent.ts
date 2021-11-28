import { IComponent } from "@yoieh/ecs-core";

export class GridComponent implements IComponent {
  constructor(
    public Width: number = 0,
    public Height: number = 0,
    public CellSize: number = 0,
  ) {}
}

export default GridComponent;
