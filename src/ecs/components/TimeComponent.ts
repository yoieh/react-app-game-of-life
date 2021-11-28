import { IComponent } from "@yoieh/ecs-core";

export class TimeComponent implements IComponent {
  constructor(public Value: number = 0) {}
}

export default TimeComponent;
