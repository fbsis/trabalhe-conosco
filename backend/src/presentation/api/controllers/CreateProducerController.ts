import { Controller } from "@/presentation/api/protocols";
import { HttpResponse } from "@/presentation/api/helpers";
import { Producer } from "@/domain/entities";
import { ProducerCommandRepository } from "@/infra/repository/ProducerCommandRepository";
import { CreateProducerInteractor } from "@/domain/usecases";

export class CreateProducerController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    
    const producerDomain = new Producer(
      request.document,
      request.name,
      request.farms
    );

    const producerCommandRepo = new ProducerCommandRepository();
    const createInteractor = new CreateProducerInteractor(producerCommandRepo);
    await createInteractor.execute(producerDomain);

    return HttpResponse.created();
  }
}
