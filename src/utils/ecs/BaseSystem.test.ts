/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { Engine } from "..";
import { BaseSystem } from "./BaseSystem";

class S extends BaseSystem {}

describe(">>> System", () => {
  let engine: Engine;

  it("should trigger OnCreate", () => {
    const s = new S();
    const spy = jest.spyOn(s, "OnCreate");

    s.OnCreate(0);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should trigger OnUpdate", () => {
    const s = new S();
    const spy = jest.spyOn(s, "OnUpdate");

    s.OnUpdate(0);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should trigger OnDestroy", () => {
    const s = new S();
    const spy = jest.spyOn(s, "OnDestroy");

    s.OnDestroy(0);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
