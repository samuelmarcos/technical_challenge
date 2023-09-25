import { CountModel } from "@/domain/model";

export interface CountApiService {
  countTonAccess(): Promise<CountModel>
}