import { AgriculturalMetricsQueryRepository as queryRepository } from "@/domain/protocols";
import { FarmEntitiy } from "./typeOrm/entities/Farm.entities";

export class AgriculturalMetricsQueryRepository implements queryRepository {
  getTotalFarmCount: () => Promise<number> = async () => {
    const totalFarmCount = await FarmEntitiy.count();
    return totalFarmCount;
  };

  getTotalFarmArea: () => Promise<number> = async () => {
    const totalFarmAreaSumQuery = await FarmEntitiy
      .createQueryBuilder("farm")
      .select("SUM(farm.totalAreaHectares)", "totalFarmAreaSum")
      .getRawOne();

    return totalFarmAreaSumQuery.totalFarmAreaSum || 0;
  };

  getFarmCountByState: () => Promise<{ state: string; farmCount: number }[]> =
    async () => {
      const farmCountByState = await FarmEntitiy.createQueryBuilder("farm")
        .select("farm.state as state")
        .addSelect("COUNT(*) as farmCount")
        .groupBy("farm.state")
        .getRawMany();

      return farmCountByState;
    };

  getFarmCountByCropType: () => Promise<
    { cropType: string; farmCount: number }[]
  > = async () => {
    const farmCountByCropType = await FarmEntitiy.createQueryBuilder("farm")
    .select("UNNEST(farm.plantedCrops)", "cropType")
    .addSelect("COUNT(*) as farmCount")
    .groupBy("UNNEST(farm.plantedCrops)")
    .getRawMany();

    return farmCountByCropType;
  };

  getFarmCountByLandUse: () => Promise<
    { totalAreaSum: string; cultivableAreaSum: number }
  > = async () => {
    const areaSums = await FarmEntitiy.createQueryBuilder("farm")
      .select("SUM(farm.totalAreaHectares)", "totalAreaSum")
      .addSelect("SUM(farm.cultivableAreaHectares)", "cultivableAreaSum")
      .getRawOne();

    return {
      totalAreaSum: areaSums.totalAreaSum || 0,
      cultivableAreaSum: areaSums.cultivableAreaSum || 0,
    };
  };
}
