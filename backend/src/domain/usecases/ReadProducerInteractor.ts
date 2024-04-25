import { Producer } from "@/domain/entities";
import { DomainException } from "@/domain/exceptions";
import { ProducerQueryRepository } from "@/domain/protocols";

export class ReadProducerInteractor {
  constructor(
    private readonly producerQueryRepository: ProducerQueryRepository,
  ) {}

  async execute(): Promise<Producer[]> {
    try {
      const getAll =  await this.producerQueryRepository.getAll();

      return getAll;
    } catch (error) {
      throw new DomainException("Error on get all producers.");
    }
  }
}
