import { Controller } from "@/presentation/api/protocols";
import { HttpResponse } from "@/presentation/api/helpers";
import { Producer } from "@/domain/entities";
import { ProducerCommandRepository } from "@/infra/repository/ProducerCommandRepository";
import { DeleteProducerInteractor, UpdateProducerInteractor } from "@/domain/usecases";

export class DeleteProducerController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    const producerCommandRepo = new ProducerCommandRepository();
    const updateInteractor = new DeleteProducerInteractor(producerCommandRepo);
    await updateInteractor.execute(request.document);

    return HttpResponse.ok({});
  }
}
