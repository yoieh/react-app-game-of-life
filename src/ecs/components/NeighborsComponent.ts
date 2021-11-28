import { IComponent, IEntity } from "@yoieh/ecs-core";

export class NeighborsComponent implements IComponent {
  // TODO: find way to link cells to neighbors...
  // nw, n, ne, e, se, s, sw, w
  constructor(
    public RefCell: IEntity,
    public nw: IEntity,
    public n: IEntity,
    public ne: IEntity,
    public e: IEntity,
    public se: IEntity,
    public sw: IEntity,
    public w: IEntity,
  ) {}
}

export default NeighborsComponent;
