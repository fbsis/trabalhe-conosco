import 'reflect-metadata'
import { EnvAdapter } from '@/infra/configs/envs'
import { ExpressHttpAdapter } from '@/presentation/api/adapters'

import { Server as HttpServer } from 'http'
import gracefulShutdown from 'http-graceful-shutdown'

export class Server {
  private httpServer: HttpServer | undefined

  constructor (
    private readonly api = new ExpressHttpAdapter()
  ) {}

  async startup (): Promise<void> {
    console.log(`Service name: ${EnvAdapter.server.name}`)
    this.httpServer = await this.api.startup(EnvAdapter.http.listenPort)
    gracefulShutdown(this.httpServer)
  }

  async shutdown (): Promise<void> {
    return await new Promise(resolve => {
      this.httpServer?.close(() => {
        resolve()
      })
    })
  }
}
