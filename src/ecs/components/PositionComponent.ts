import { IComponent } from "@yoieh/ecs-core";

export class PositionComponent implements IComponent {
  constructor(public X: number, public Y: number) {}
}

export default PositionComponent;
