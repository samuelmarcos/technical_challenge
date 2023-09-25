import { Axios, AxiosInstance, AxiosRequestConfig } from "axios"

export const mockAxiosInstance = (): Partial<AxiosInstance> => {
  class AxiosInstanceStub extends Axios {
    async get<T>(url: string, config: AxiosRequestConfig) {
      return Promise.resolve({} as T)
    }
  }

  return new AxiosInstanceStub() as AxiosInstance
}