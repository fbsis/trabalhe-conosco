import { Server } from 'http'

export interface HttpServer {
  startup: (port: number) => Promise<Server>
}
