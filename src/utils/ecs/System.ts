import { EntityManager } from "./EntityManager";

export abstract class System {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  OnCreate() {}

  OnUpdate() {}

  OnDestroy() {}
}
