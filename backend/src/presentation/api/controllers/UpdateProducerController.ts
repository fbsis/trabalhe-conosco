import { Controller } from "@/presentation/api/protocols";
import { HttpResponse } from "@/presentation/api/helpers";
import { Producer } from "@/domain/entities";
import { ProducerCommandRepository } from "@/infra/repository/ProducerCommandRepository";
import { UpdateProducerInteractor } from "@/domain/usecases";

export class UpdateProducerController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    const producerDomain = new Producer(
      request.document,
      request.name,
      request.farms
    );

    const producerCommandRepo = new ProducerCommandRepository();
    const updateInteractor = new UpdateProducerInteractor(producerCommandRepo);
    await updateInteractor.execute(request.document, producerDomain);

    return HttpResponse.ok({});
  }
}
