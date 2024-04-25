import { Controller } from "@/presentation/api/protocols";
import { HttpResponse } from "@/presentation/api/helpers";
import { AgriculturalMetricsQueryRepository } from "@/infra/repository/AgriculturalMetricsQueryRepository";
import { AgriculturalMetricsDashboardInteractor } from "@/domain/usecases/AgriculturalMetricsDashboardInteractor";

export class MetricController implements Controller {
  async handle(): Promise<HttpResponse> {
    const producerCommandRepo = new AgriculturalMetricsQueryRepository();
    const updateInteractor = new AgriculturalMetricsDashboardInteractor(producerCommandRepo);
    const result = await updateInteractor.execute();

    return HttpResponse.ok({...result});
  }
}
