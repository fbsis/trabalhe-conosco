import { Farm, Producer } from "@/domain/entities";
import { ProducerQueryRepository } from "@/domain/protocols";
import { FarmAdapter, ProducerAdapter, ProducerQueryRepository as queryRepository} from "@/infra/repository/ProducerQueryRepository";
import { FarmEntitiy } from "@/infra/repository/typeOrm/entities/Farm.entities";
import { ProducerEntity } from "@/infra/repository/typeOrm/entities/Producer.entities";


describe('ProducerQueryRepository', () => {
  let producerQueryRepository: ProducerQueryRepository;

  beforeEach(() => {
    producerQueryRepository = new queryRepository();
  });

  it('should get all producers with resolved Promise', async () => {
    // Arrange
    const producerEntity1 = new ProducerEntity();
    producerEntity1.document = 62272579078;
    producerEntity1.name = 'John Doe';
    producerEntity1.farms = [];
    
    const producerEntity2 = new ProducerEntity();
    producerEntity2.document = 78859702000112;
    producerEntity2.name = 'Jane Smith';
    producerEntity2.farms = [];
    
    const producerEntities = [producerEntity1, producerEntity2];

    jest.spyOn(ProducerEntity, 'find').mockResolvedValueOnce(producerEntities);
    
    const expectedProducers = producerEntities.map(producerEntity => ProducerAdapter.toDomain(producerEntity));

    // Act
    const result = await producerQueryRepository.getAll();

    // Assert
    expect(result).toEqual(expectedProducers);
  });

  it('should get one producer with resolved Promise', async () => {
    // Arrange
    const producerId = 1;
    const producerEntity = new ProducerEntity();
    producerEntity.id = producerId;
    producerEntity.document = 78859702000112;
    producerEntity.name = 'Jane Smith';
    producerEntity.farms = [];
    jest.spyOn(ProducerEntity, 'findOne').mockResolvedValueOnce(producerEntity);

    const expectedProducer = ProducerAdapter.toDomain(producerEntity);

    // Act
    const result = await producerQueryRepository.getOne(producerId);

    // Assert
    expect(result).toEqual(expectedProducer);
  });

});
