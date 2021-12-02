import { IComponent } from "@yoieh/ecs-core";

export class CellComponent implements IComponent {
  constructor(public Value: number = 0) {}
}

export default CellComponent;
