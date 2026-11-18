export interface IServiceOperationResult<T> {
  result: T | null;
  isSuccessful: boolean;
  errorCodes: string[];
  errors: string[];
}

export interface IApiResponse<T> extends IServiceOperationResult<T> {
  status: number;
}
