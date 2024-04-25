import { HttpResponse } from '@/presentation/api/helpers'

export interface Middleware {
  handle: (request: any) => Promise<HttpResponse>
}
