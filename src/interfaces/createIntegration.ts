export interface ICreateIntegration<T> {
  create: (body: T) => Promise<void>;
}