/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { Engine } from "./Engine";
import { Entity, IComponent } from "../ecs";

describe(">>> Engine", () => {
  let engine: Engine;

  beforeEach(() => {
    engine = new Engine();

    window.requestAnimationFrame = jest
      .fn()
      .mockImplementationOnce((cb) => cb()); // <-- ADD
  });

  it("should start update loop next frame after awake", () => {
    const spy = jest.spyOn(engine, "Update");

    engine.Awake();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
