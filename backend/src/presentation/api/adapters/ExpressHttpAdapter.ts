import { HttpServer } from '@/infra/protocols'
import { ExpressRouter } from '@/presentation/api/router'

import { Server } from 'http'
import express, { RequestHandler, Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import { DatabaseConnection } from '@/infra/repository'

export class ExpressHttpAdapter implements HttpServer {
  private readonly app: Express = express();
  private serverConnection: Server | undefined;

  async startup (port: number): Promise<Server> {
    this.beforeStartup()
    this.serverConnection = this.app.listen(port, () => {
      console.log(`Http server listening on port: ${port}`)
    })
    return this.serverConnection
  }

  private beforeStartup (): void {
    this.setupDatabase()
    this.setupSecurity()
    this.setupRouter()
  }

  private setupRouter (): void {
    const { router } = new ExpressRouter(this.healthCheck())
    this.app.use(router)
  }

  private setupDatabase (): void {
    const dbConnection = DatabaseConnection.getInstance();
    dbConnection.initialize().then(() => {
      console.log("Database connection established successfully!")
    });
  }

  private setupSecurity (): void {
    this.app.use(cors())
    this.app.use(helmet())
    this.app.disable('x-powered-by')
    this.app.use(
      express.json({
        limit: '10kb'
      })
    )
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(xss())
    this.app.use(hpp())
    this.app.set('trust proxy', true)
  }

  private healthCheck (): RequestHandler {
    return async (_, response) => {
      response.json({ status: 'ok' })
    }
  }
}
