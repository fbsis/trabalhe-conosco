import { CropType, Farm, Producer } from "@/domain/entities";
import { ProducerEntity } from "./typeOrm/entities/Producer.entities";
import { ProducerQueryRepository as queryRepository } from "@/domain/protocols";
import { InfraException } from "../exception";
import { FarmEntitiy } from "./typeOrm/entities/Farm.entities";

export class ProducerQueryRepository implements queryRepository {
  getAll: () => Promise<Producer[]> = async () => {
    const producers = await ProducerEntity.find({ relations: ["farms"] });
    return producers.map(ProducerAdapter.toDomain);
  };

  getOne: (producerId: number) => Promise<Producer> = async (producerId: number) => {
    const producer = await ProducerEntity.findOne({
      where: { id: producerId },
      relations: ["farms"],
    });
    if (!producer) {
      throw new InfraException(`Producer with id ${producerId} not found.`);
    }
    
    return ProducerAdapter.toDomain(producer);
  };
}

export class ProducerAdapter {
  static toDomain(producer: ProducerEntity): Producer {
    return new Producer(
      producer.document,
      producer.name,
      producer && producer.farms && producer.farms.map(FarmAdapter.toDomain)
    );
  }
}

export class FarmAdapter {
  static toDomain(farm: FarmEntitiy): Farm {
    return new Farm(
      farm.name,
      farm.city,
      farm.state,
      farm.totalAreaHectares,
      farm.cultivableAreaHectares,
      farm.vegetationAreaHectares,
      farm.plantedCrops.map(crop => crop as CropType)
    );
  }
}
