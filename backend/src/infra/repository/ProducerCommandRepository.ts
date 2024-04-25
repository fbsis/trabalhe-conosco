import { Producer } from "@/domain/entities";
import { ProducerCommandRepository as commandRepository } from "@/domain/protocols";
import { InfraException } from "../exception";
import { ProducerEntity } from "./typeOrm/entities/Producer.entities";
import { FarmEntitiy } from "./typeOrm/entities/Farm.entities";

export class ProducerCommandRepository implements commandRepository {
  async create(producerPayload: Producer): Promise<void> {
    const existingProducer = await ProducerEntity.findOne({
      where: { document: producerPayload.document }
    });

    if (existingProducer) {
      throw new InfraException(`Producer with document ${producerPayload.document} already exists.`);
    }

    const producer = new ProducerEntity();
    producer.document = producerPayload.document;
    producer.name = producerPayload.name;
    await producer.save();

    for (const farmPayload of producerPayload.farms) {
      let farm = new FarmEntitiy();
      Object.assign(farm, farmPayload);
      farm.producer = producer;
      await farm.save();
    }
  }

  async update(producerDocument: number, producerPayload: Producer): Promise<void> {
    const existingProducer = await ProducerEntity.findOne({
      where: { document: producerDocument },
      relations: ["farms"]
    });

    if (!existingProducer) {
      throw new InfraException(`Producer with document ${producerDocument} not found.`);
    }

    existingProducer.document = producerPayload.document;
    existingProducer.name = producerPayload.name;
    await existingProducer.save();

    for (const farmPayload of producerPayload.farms) {
      let farm = existingProducer.farms.find((f: { name: string; }) => f.name === farmPayload.name);
      if (farm) {
        Object.assign(farm, farmPayload);
      } else {
        farm = new FarmEntitiy();
        Object.assign(farm, farmPayload);
        farm.producer = existingProducer;
        await farm.save();
      }
    }
  }

  async delete(document: number): Promise<void> {
    const producer = await ProducerEntity.findOne({
      where: { document },
      relations: ["farms"]
    });

    if (!producer) {
      throw new InfraException(`Producer with document ${document} not found.`);
    }

    await Promise.all(producer.farms.map(async (farm: { id: number; }) => FarmEntitiy.delete(farm.id)));
      
    await ProducerEntity.delete({ document });
  }
}
