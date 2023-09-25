import { Axios, AxiosInstance, AxiosRequestConfig } from "axios"
import { mockCountModel } from "../domain/mock-access"

export const mockAxiosInstance = (): Partial<AxiosInstance> => {
  class AxiosInstanceStub extends Axios {
    async get<T>(url: string, config: AxiosRequestConfig): Promise<T> {
      return Promise.resolve(mockCountModel() as T)
    }
  }

  return new AxiosInstanceStub() as AxiosInstance
}