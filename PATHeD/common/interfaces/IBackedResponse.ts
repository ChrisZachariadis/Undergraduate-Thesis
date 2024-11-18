export interface IBackendResponse<T> {
  data: T;
  errorMessage: string;
  errorCode: string;
  success: boolean;
}
