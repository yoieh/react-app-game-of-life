import { Entity, IEntity } from ".";

export class EntityManager {
  private static instance: EntityManager;

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

  entityId: number;

  constructor() {
    this.entities = [];
    this.entityId = 0;
  }

  CreateEntity() {
    const entity = new Entity(this.entityId);
    this.entities.push(entity);
    this.entityId += 1;
    return entity;
  }

  GetEntity(id: number) {
    return this.entities.find((entity) => entity.id === id);
  }

  GetEntities() {
    return this.entities;
  }

  RemoveEntity(id: number) {
    const entity = this.GetEntity(id);
    if (entity) {
      //   entity.remove();
      this.entities = this.entities.filter((e) => e.id !== id);
    }
  }
}
