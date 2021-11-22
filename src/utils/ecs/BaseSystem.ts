/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityManager } from "./EntityManager";
import { Engine } from "../engine/Engine";

export abstract class BaseSystem {
  EntityManager: EntityManager = EntityManager.Instance;

  public beforeUpdate: boolean = false;

  public afterUpdate: boolean = false;

  public lastUpdate: boolean = false;

  constructor() {
    Engine.Instance.RegisterSystem(this);
  }

  public OnCreate(deltaTime: number) {}

  public OnUpdate(deltaTime: number) {
    console.log(`OnUpdate BaseSystem ${deltaTime}`);
  }

  public OnDestroy(deltaTime: number) {}
}
