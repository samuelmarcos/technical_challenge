
export interface HttpRequester {
  get<T>(url: string): Promise<T>
}