export interface AgriculturalMetricsQueryRepository {
  getTotalFarmCount: () => Promise<number>;
  getTotalFarmArea: () => Promise<number>;
  getFarmCountByState: () => Promise<{ state: string; farmCount: number }[]>;
  getFarmCountByCropType: () => Promise<{ cropType: string; farmCount: number }[]>;
  getFarmCountByLandUse: () => Promise<{ totalAreaSum: string; cultivableAreaSum: number }>;
}
