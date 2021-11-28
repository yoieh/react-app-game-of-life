import { IComponent } from "@yoieh/ecs-core";

export class CanvasComponent implements IComponent {
  constructor(public Context: CanvasRenderingContext2D) {}
}

export default CanvasComponent;
