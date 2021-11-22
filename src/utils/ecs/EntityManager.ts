import { Signal } from "@yoieh/signal";
import { IEntity } from ".";

export class EntityManager {
  private static instance: EntityManager;

  public onEntityAdded = new Signal();

  public onEntityRemoved = new Signal();

  public static get Instance(): EntityManager {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager();
    }
    return EntityManager.instance;
  }

  private entities: IEntity[];

  get Entities() {
    return this.entities;
  }

  public entityId: number;

  constructor() {
    this.entities = [];
    this.entityId = 0;
  }

  GetEntity(id: number) {
    return this.entities.find((entity) => entity.id === id);
  }

  GetEntities() {
    return this.entities;
  }

  AddEntity(entity: IEntity) {
    this.entities.push(entity);
    this.entityId += 1;
    this.onEntityAdded.dispatch(entity);
    return entity;
  }

  RemoveEntity(id: number) {
    const entity = this.GetEntity(id);
    if (entity) {
      //   entity.remove();
      this.entities = this.entities.filter((e) => e.id !== id);
      this.onEntityRemoved.dispatch(entity);
    }
  }
}
