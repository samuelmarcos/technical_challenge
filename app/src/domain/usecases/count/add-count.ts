import { CountModel } from "@/domain/model/count";

export interface AddCount {
  count(): Promise<CountModel>
}