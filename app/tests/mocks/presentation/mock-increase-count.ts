import { IncreaseCount } from "@/domain/usecases/count/increase-count";

export const mockIncreaseCount = (): IncreaseCount => {
  class AddCountStub implements IncreaseCount {
      async increase(): Promise<void> {
          return new Promise(resolve => resolve());
      }
  }
  return new AddCountStub()
}