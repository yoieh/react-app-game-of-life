import { IComponent, IEntity } from "@yoieh/ecs-core";

export class NeighborsComponent implements IComponent {
  // TODO: find way to link cells to neighbors...
  // nw, n, ne, e, se, s, sw, w
  constructor(
    public RefCell: IEntity,
    public nw: IEntity | null = null,
    public n: IEntity | null = null,
    public ne: IEntity | null = null,
    public e: IEntity | null = null,
    public se: IEntity | null = null,
    public s: IEntity | null = null,
    public sw: IEntity | null = null,
    public w: IEntity | null = null,
  ) {}
}

export default NeighborsComponent;
