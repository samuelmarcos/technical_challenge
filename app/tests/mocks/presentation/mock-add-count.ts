import { CountModel } from "@/domain/model";
import { AddCount } from "@/domain/usecases/count/add-count";
import { mockCountModel } from "../domain/mock-access";

export const mockAddCount = (): AddCount => {
  class AddCountStub implements AddCount {
      async count(): Promise<CountModel> {
          return new Promise(resolve => resolve(mockCountModel()));
      }
  }
  return new AddCountStub()
}