
export interface HttpRequester {
  get<T>(): Promise<T>
}