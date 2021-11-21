import { IEntity } from "./IEntity";

class EntityManager {
  private entities: IEntity[];

  private entityCount: number;

  constructor() {
    this.entities = [];
    this.entityCount = 0;
  }

  public addEntity(entity: IEntity) {
    console.log(`Adding entity:  ${entity.id}`);
    this.entities.push(entity);
    this.entityCount = this.entities.length;
  }

  public removeEntity(entity: IEntity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
    this.entityCount = this.entities.length;
  }

  public getEntities() {
    return this.entities;
  }

  public setEntities(entities: IEntity[]) {
    this.entities = entities;
  }
}

export default EntityManager;
