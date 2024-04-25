import { Controller } from '@/presentation/api/protocols'
import { RequestHandler, Router } from 'express'
import { CreateProducerController, DeleteProducerController, MetricController, ReadProducerController, UpdateProducerController } from '@/presentation/api/controllers';
const multer = require('multer');

export class ExpressRouter {
  readonly router: Router

  constructor (
    healthCheck: RequestHandler
  ) {
    this.router = Router()

    this.router.get('/v1/health', healthCheck)


    this.router.post('/v1/producer', this.adapterController(new CreateProducerController()))
    this.router.get('/v1/producer', this.adapterController(new ReadProducerController()))
    this.router.patch('/v1/producer', this.adapterController(new UpdateProducerController()))
    this.router.delete('/v1/producer/:document', this.adapterController(new DeleteProducerController()))
    this.router.get('/v1/metrics', this.adapterController(new MetricController()))
  }

  private readonly adapterController = (controller: Controller): RequestHandler => {
    return async (request, response, next) => {
      try {
        const httpRequest = {
          ...request.body,
          ...request.params,
          ...request.query,
          http: {
            method: request.method,
            route: request.method
          }
        }
        const httpResponse = await controller.handle(httpRequest)
        response.status(httpResponse.statusCode).json(httpResponse.data instanceof Error
          ? {
              error: httpResponse.data.message
            }
          : httpResponse.data)


      } catch (error) {
        next(error)
      }
    }
  }
}
