import { Signal } from "./Signal";

export class SignalListener<Listener extends (...args: any[]) => any> {
  private signal: Signal<Listener>;

  listener: Listener;

  constructor(signal: Signal<Listener>, listener: Listener) {
    this.signal = signal;
    this.listener = listener;
    this.signal.add(this.listener);
  }

  dispose() {
    this.signal.remove(this.listener);
  }
}
