/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityManager } from "./EntityManager";
import { Engine } from "../engine/Engine";

export abstract class BaseSystem {
  EntityManager: EntityManager = EntityManager.Instance;

  public enabled: boolean = true;

  constructor() {
    Engine.Instance.RegisterSystem(this);
  }

  public OnCreate(deltaTime: number) {}

  public OnUpdate(deltaTime: number) {
    console.log(`OnUpdate BaseSystem ${deltaTime}`);
  }

  public OnDestroy(deltaTime: number) {}
}
