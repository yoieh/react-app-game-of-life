/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { Engine } from "./Engine";
import { Entity, IComponent } from "../ecs";

class C1 implements IComponent {
  public Entity: Engine = new Engine();

  public Awake(): void {
    /* ... */
  }

  public Update(deltaTime: number): void {
    /* ... */
  }
}
class C2 implements IComponent {
  public Entity: Engine = new Engine();

  public Awake(): void {
    /* ... */
  }

  public Update(deltaTime: number): void {
    /* ... */
  }
}
class C3 implements IComponent {
  public Entity: Engine = new Engine();

  public Awake(): void {
    /* ... */
  }

  public Update(deltaTime: number): void {
    /* ... */
  }
}

class E1 extends Entity {}
class E2 extends Entity {}
class E3 extends Entity {}

describe(">>> Engine", () => {
  let engine: Engine;

  const c1 = new C1();
  const c2 = new C2();
  const c3 = new C3();

  const e1 = new E1();
  const e2 = new E2();
  const e3 = new E3();

  beforeEach(() => {
    engine = new Engine();
    engine.Entities.push(e1, e2, e3);

    window.requestAnimationFrame = jest
      .fn()
      .mockImplementationOnce((cb) => cb()); // <-- ADD
  });

  it("should start update loop next frame after awake", () => {
    const spy = jest.spyOn(engine, "Update");

    engine.Awake();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should awake all Components", () => {
    const spy1 = jest.spyOn(c1, "Awake");
    const spy2 = jest.spyOn(c2, "Awake");
    const spy3 = jest.spyOn(c3, "Awake");

    expect(spy1).not.toBeCalled();
    expect(spy2).not.toBeCalled();
    expect(spy3).not.toBeCalled();

    engine.AddComponent(c1);
    engine.AddComponent(c2);
    engine.AddComponent(c3);

    engine.Awake();

    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });

  it("should update all Components", () => {
    const spy1 = jest.spyOn(c1, "Update");
    const spy2 = jest.spyOn(c2, "Update");
    const spy3 = jest.spyOn(c3, "Update");

    expect(spy1).not.toBeCalled();
    expect(spy2).not.toBeCalled();
    expect(spy3).not.toBeCalled();

    engine.AddComponent(c1);
    engine.AddComponent(c2);
    engine.AddComponent(c3);

    engine.Update();

    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });

  it("should awake all children", () => {
    const spy1 = jest.spyOn(e1, "Awake");
    const spy2 = jest.spyOn(e2, "Awake");
    const spy3 = jest.spyOn(e3, "Awake");

    expect(spy1).not.toBeCalled();
    expect(spy2).not.toBeCalled();
    expect(spy3).not.toBeCalled();

    engine.Awake();

    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });

  it("should update all children", () => {
    const spy1 = jest.spyOn(e1, "Update");
    const spy2 = jest.spyOn(e2, "Update");
    const spy3 = jest.spyOn(e3, "Update");

    expect(spy1).not.toBeCalled();
    expect(spy2).not.toBeCalled();
    expect(spy3).not.toBeCalled();

    engine.Update();

    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });
});
