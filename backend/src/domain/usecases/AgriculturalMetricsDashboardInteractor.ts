import { DomainException } from "@/domain/exceptions";
import { AgriculturalMetricsQueryRepository } from "@/domain/protocols";

export class AgriculturalMetricsDashboardInteractor {
  constructor(
    private readonly producerQueryRepository: AgriculturalMetricsQueryRepository,
  ) {}

  async execute(): Promise<{ [key: string]: any }> {
    try {
      const getFarmCountByCropType =  await this.producerQueryRepository.getFarmCountByCropType()
      const getFarmCountByLandUse =  await this.producerQueryRepository.getFarmCountByLandUse()
      const getFarmCountByState =  await this.producerQueryRepository.getFarmCountByState()
      const getTotalFarmArea =  await this.producerQueryRepository.getTotalFarmArea()
      const getTotalFarmCount =  await this.producerQueryRepository.getTotalFarmCount()

      return {
        farmCountByCropType: getFarmCountByCropType,
        getFarmCountByLandUse,
        getFarmCountByState,
        getTotalFarmArea,
        getTotalFarmCount
      };
    } catch (error) {
      throw new DomainException("Error on get metric.");
    }
  }
}
