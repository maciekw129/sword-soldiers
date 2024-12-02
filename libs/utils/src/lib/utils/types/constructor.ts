export type Constructor<T = NonNullable<unknown>> = new (...args: any[]) => T;

export type AbstractConstructor<T = NonNullable<unknown>> = abstract new (
  ...args: any[]
) => T;
