import { Producer } from "@/domain/entities";
import { ProducerCommandRepository } from "@/domain/protocols";

export class UpdateProducerInteractor {
  constructor(
    private readonly producerCommandRepository: ProducerCommandRepository,
  ) {}

  async execute(producerDocument: number, producer: Producer): Promise<void> {
    await this.producerCommandRepository.update(producerDocument, producer);
  }
}
