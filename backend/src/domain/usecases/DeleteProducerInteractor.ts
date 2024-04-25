import { ProducerCommandRepository } from "@/domain/protocols";

export class DeleteProducerInteractor {
  constructor(
    private readonly producerCommandRepository: ProducerCommandRepository,
  ) {}

  async execute(producerId: number): Promise<void> {
    await this.producerCommandRepository.delete(producerId);
  }
}
