export interface ICreateIntegration<TBody, TResponse = void> {
  execute: (body: TBody) => Promise<TResponse>;
}