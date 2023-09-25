import { CountModel } from "@/domain/model";

export interface AccessApiService {
  countTonAccess(): Promise<CountModel>
}