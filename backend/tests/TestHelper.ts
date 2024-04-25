import { EnvAdapter } from '@/infra/configs/envs'
import { ExpressHttpAdapter } from '@/presentation/api/adapters'
import { Server } from '@/presentation/api/server'

import axios, { AxiosInstance } from 'axios'
import nock from 'nock'

// @ts-expect-error:
jest.spyOn(ExpressHttpAdapter.prototype, 'setupDatabase').mockImplementation();

export class TestHelper {
  axiosAPIClient: AxiosInstance
  server: Server | undefined

  constructor () {
    const axiosConfig = {
      baseURL: `http://localhost:${EnvAdapter.http.listenPort}`,
      validateStatus: () => true
    }
    this.axiosAPIClient = axios.create(axiosConfig)
  }

  async startupServer (): Promise<void> {

    this.server = new Server()
    await this.server.startup()
  }

  async shutdownServer (): Promise<void> {
    await this.server?.shutdown()
  }

  cleanAllServicesMocks (): void {
    nock.cleanAll()
  }
}
