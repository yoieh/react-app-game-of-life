export class Signal<Listener extends (...args: any[]) => any> {
  listeners: Listener[];

  constructor() {
    this.listeners = [];
  }

  add(listener: Listener) {
    this.listeners.push(listener);
  }

  remove(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  removeAll() {
    this.listeners = [];
  }

  dispatch(...args: Parameters<Listener>) {
    this.listeners.forEach((l) => l(...args));
  }
}
