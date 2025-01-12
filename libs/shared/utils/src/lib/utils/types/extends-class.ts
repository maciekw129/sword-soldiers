export type ExtendsClass<T, A extends Array<unknown>> = new (...args: A) => T;
