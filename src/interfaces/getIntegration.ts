export type IGetIntegration<TQueryParams, TResponse> = (
  params?: TQueryParams
) => Promise<TResponse>;
