/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { BaseSystem } from "../ecs/BaseSystem";
import { Engine } from "./Engine";

class S extends BaseSystem {}

describe(">>> Engine", () => {
  let engine: Engine;

  beforeEach(() => {
    engine = Engine.Instance;

    window.requestAnimationFrame = jest
      .fn()
      .mockImplementationOnce((cb) => cb()); // <-- ADD
  });

  it("should start update loop next frame after awake", () => {
    const spy = jest.spyOn(engine, "Update");

    engine.Awake();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should register a new system", () => {
    const s = new S();

    expect(engine.Systems.length).toBe(1);
  });
});
