import { ok, serverError } from '@/presentation/helpers/http-helpers';
import {
  AddCount,
  Controller,
  HttpRequest,
  HttpResponse,
} from './add-count-controller-protocols';

export class AddCountController implements Controller {
  constructor(private readonly addCount: AddCount) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessNumber = await this.addCount.count();

      return ok(accessNumber);
    } catch (err: any) {
      return serverError(err);
    }
  }
}
