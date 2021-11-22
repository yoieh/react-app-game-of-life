import { Signal } from "./Signal";
import { SignalListener } from "./SignalListener";

describe(">>> SignalListener", () => {
  let s: Signal<any>;

  beforeEach(() => {
    s = new Signal();
  });

  it("should trigger listener function", () => {
    const spy = jest.fn();
    const l = new SignalListener(s, spy);
    s.dispatch();
    expect(spy).toHaveBeenCalled();

    l.dispose();
  });

  it("should dispose on dispose", () => {
    const l = new SignalListener(s, () => {});

    expect(s.listeners.length).toBe(1);
    l.dispose();
    expect(s.listeners.length).toBe(0);
  });
});
