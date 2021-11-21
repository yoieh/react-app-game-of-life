export * from "./IEntity";
export * from "./Entity";
export * from "./IComponent";

export type Constr<T> = { new (...args: unknown[]): T };
