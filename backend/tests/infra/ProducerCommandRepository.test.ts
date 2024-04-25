import { ProducerCommandRepository } from "@/infra/repository/ProducerCommandRepository";
import { FarmEntitiy } from "@/infra/repository/typeOrm/entities/Farm.entities";
import { ProducerEntity } from "@/infra/repository/typeOrm/entities/Producer.entities";

describe("ProducerCommandRepository", () => {
  let producerCommandRepository: ProducerCommandRepository;

  beforeEach(() => {
    producerCommandRepository = new ProducerCommandRepository();
  });

  it("should create a producer with resolved Promise on save", async () => {
    // Arrange
    const producerPayload = {
      document: "123456789",
      name: "John Doe",
      farms: [{ name: "Farm 1" }],
    };

    jest.spyOn(ProducerEntity, "findOne").mockResolvedValueOnce(null);
    jest
      .spyOn(ProducerEntity.prototype, "save")
        // @ts-expect-error:
      .mockResolvedValueOnce({ id: 1 });
    // @ts-expect-error:
    jest.spyOn(FarmEntitiy.prototype, "save").mockResolvedValueOnce({ id: 1 });

    // @ts-expect-error:
    await producerCommandRepository.create(producerPayload);

    // Assert
    expect(ProducerEntity.findOne).toHaveBeenCalled();
    expect(ProducerEntity.prototype.save).toHaveBeenCalled();
    expect(FarmEntitiy.prototype.save).toHaveBeenCalled();
  });

  it('should update a producer with resolved Promise on save', async () => {
    // Arrange
    const producerDocument = 123456789;
    const producerPayload = {
      document: '987654321',
      name: 'Jane Doe',
      farms: [{ name: 'Farm 2' }]
    };

    const existingProducer = new ProducerEntity();
    existingProducer.id = 1;
    existingProducer.document = producerDocument;
    existingProducer.farms = [];
    
    jest.spyOn(ProducerEntity, 'findOne').mockResolvedValueOnce(existingProducer);
    // @ts-expect-error: Testing private method
    jest.spyOn(ProducerEntity.prototype, 'save').mockResolvedValueOnce();
    // @ts-expect-error: Testing private method
    jest.spyOn(FarmEntitiy.prototype, 'save').mockResolvedValueOnce();

    // Act
    // @ts-expect-error: Testing private method
    await producerCommandRepository.update(producerDocument, producerPayload);

    // Assert
    expect(ProducerEntity.findOne).toHaveBeenCalled();
    expect(ProducerEntity.prototype.save).toHaveBeenCalled();
    expect(FarmEntitiy.prototype.save).toHaveBeenCalled();
  });

  it('should delete a producer with resolved Promise on delete', async () => {
    // Arrange
    const producerDocument = 123456789;

    const producer = new ProducerEntity();
    producer.id = 1;
    producer.document = producerDocument;
    // @ts-expect-error Testing private method
    producer.farms = [{ id: 1 }];

    jest.spyOn(ProducerEntity, 'findOne').mockResolvedValueOnce(producer);
    // @ts-expect-error: Testing private method
    jest.spyOn(FarmEntitiy, 'delete').mockResolvedValueOnce();
    // @ts-expect-error: Testing private method
    jest.spyOn(ProducerEntity, 'delete').mockResolvedValueOnce();

    // Act
    await producerCommandRepository.delete(producerDocument);

    // Assert
    expect(ProducerEntity.findOne).toHaveBeenCalled();
    expect(FarmEntitiy.delete).toHaveBeenCalled();
    expect(ProducerEntity.delete).toHaveBeenCalled();
  });
});
