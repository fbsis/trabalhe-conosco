import { AgriculturalMetricsQueryRepository } from "@/domain/protocols";
import { AgriculturalMetricsQueryRepository as queryRepository } from "@/infra/repository/AgriculturalMetricsQueryRepository";
import { FarmEntitiy } from "@/infra/repository/typeOrm/entities/Farm.entities";

describe('AgriculturalMetricsQueryRepository', () => {
  let agriculturalMetricsQueryRepository: AgriculturalMetricsQueryRepository;

  beforeEach(() => {
    agriculturalMetricsQueryRepository = new queryRepository();
  });

  it('should get total farm count with resolved Promise', async () => {
    // Arrange
    const totalFarmCount = 10;
    jest.spyOn(FarmEntitiy, 'count').mockResolvedValueOnce(totalFarmCount);

    // Act
    const result = await agriculturalMetricsQueryRepository.getTotalFarmCount();

    // Assert
    expect(result).toEqual(totalFarmCount);
  });

  it('should get total farm area with resolved Promise', async () => {
    // Arrange
    const totalFarmAreaSum = 1000;
    // @ts-expect-error Testing private method
    jest.spyOn(FarmEntitiy, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValueOnce({ totalFarmAreaSum })
    });

    // Act
    const result = await agriculturalMetricsQueryRepository.getTotalFarmArea();

    // Assert
    expect(result).toEqual(totalFarmAreaSum);
  });

  it('should get farm count by state with resolved Promise', async () => {
    // Arrange
    const farmCountByState = [{ state: 'State 1', farmCount: 5 }];
    // @ts-expect-error Testing private method
    jest.spyOn(FarmEntitiy, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValueOnce(farmCountByState)
    });

    // Act
    const result = await agriculturalMetricsQueryRepository.getFarmCountByState();

    // Assert
    expect(result).toEqual(farmCountByState);
  });

  it('should get farm count by crop type with resolved Promise', async () => {
    // Arrange
    const farmCountByCropType = [{ cropType: 'Type 1', farmCount: 3 }];
    // @ts-expect-error Testing private method
    jest.spyOn(FarmEntitiy, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValueOnce(farmCountByCropType)
    });

    // Act
    const result = await agriculturalMetricsQueryRepository.getFarmCountByCropType();

    // Assert
    expect(result).toEqual(farmCountByCropType);
  });

  it('should get farm count by land use with resolved Promise', async () => {
    // Arrange
    const areaSums = { totalAreaSum: 2000, cultivableAreaSum: 1500 };
    // @ts-expect-error Testing private method
    jest.spyOn(FarmEntitiy, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValueOnce(areaSums)
    });

    // Act
    const result = await agriculturalMetricsQueryRepository.getFarmCountByLandUse();

    // Assert
    expect(result).toEqual(areaSums);
  });
});
