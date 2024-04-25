import { Controller } from "@/presentation/api/protocols";
import { HttpResponse } from "@/presentation/api/helpers";
import { ReadProducerInteractor } from "@/domain/usecases";
import { ProducerQueryRepository } from "@/infra/repository/ProducerQueryRepository";

export class ReadProducerController implements Controller {
  async handle(): Promise<HttpResponse> {


    const producerQueryRepo = new ProducerQueryRepository();
    const createInteractor = new ReadProducerInteractor(producerQueryRepo);
    const producers = await createInteractor.execute();

    return HttpResponse.ok(producers);
  }
}
