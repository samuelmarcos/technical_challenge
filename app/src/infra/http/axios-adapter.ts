import { HttpRequester } from "@/service/count/protocols";
import { AxiosInstance } from "axios";

export class AxiosAdapter implements HttpRequester {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url)
    return response.data as T
  }
  
}