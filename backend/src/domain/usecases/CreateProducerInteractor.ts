import { Producer } from "../entities";
import { ProducerCommandRepository } from "../protocols";

export class CreateProducerInteractor {
  constructor(
    private readonly producerCommandRepository: ProducerCommandRepository,
  ) {}

  async execute(producer: Producer): Promise<void> {
    await this.producerCommandRepository.create(producer);
  }
}
