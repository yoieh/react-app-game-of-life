import { IComponent } from "@yoieh/ecs-core";

export class SpeedCommandComponent implements IComponent {
  constructor(public speedMultiplier: number = 1) {}
}

export default SpeedCommandComponent;
