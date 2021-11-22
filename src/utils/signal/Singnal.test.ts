import { Signal } from "./Signal";

describe(">>> Signal", () => {
  let s: Signal<any>;

  beforeEach(() => {
    s = new Signal();
    s.removeAll();
  });

  it("should be defined", () => {
    expect(s).toBeDefined();
  });

  it("should dispach on dispach", () => {
    const spy = jest.fn();
    s.add(spy);
    s.dispatch();
    expect(spy).toHaveBeenCalled();
  });

  it("should add a new listener on add", () => {
    const spy = jest.fn();
    s.add(spy);
    expect(s.listeners.length).toBe(1);
  });

  it("should remove a listener on remove", () => {
    const spy = jest.fn();
    s.add(spy);
    s.remove(spy);
    expect(s.listeners.length).toBe(0);
  });

  it("should remove all listeners on removeAll", () => {
    const spy = jest.fn();
    s.add(spy);
    s.removeAll();
    expect(s.listeners.length).toBe(0);
  });
});
