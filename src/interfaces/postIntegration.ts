export type IPostIntegration<TBody, TResponse = void> = (
  body: TBody
) => Promise<TResponse>;
