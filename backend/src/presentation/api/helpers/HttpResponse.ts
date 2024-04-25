import { AccessDeniedError, ServerError, UnauthorizedError } from '@/presentation/api/errors'

export class HttpResponse {
  constructor (
    public readonly statusCode: number,
    public readonly data: any | Error
  ) {}

  static ok = (data: any): HttpResponse => new HttpResponse(200, data)
  static created = (data: any = {}): HttpResponse => new HttpResponse(201, data)
  static badRequest = (errorMessage: unknown): HttpResponse => new HttpResponse(400, this.createErrorMessage(errorMessage))
  static unauthorized = (): HttpResponse => new HttpResponse(401, new UnauthorizedError())
  static forbidden = (): HttpResponse => new HttpResponse(403, new AccessDeniedError())
  static serverError = (errorMessage: unknown): HttpResponse => new HttpResponse(500, new ServerError(this.createErrorMessage(errorMessage)))

  private static createErrorMessage (errorMessage: unknown): Error {
    return errorMessage instanceof Error ? errorMessage : new Error(String(errorMessage))
  }
}
