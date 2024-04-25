import { Producer } from "@/domain/entities";

export interface ProducerCommandRepository {
  create: (producer: Producer) => Promise<void>;
  update: (producerDocument: number, producer: Producer) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
