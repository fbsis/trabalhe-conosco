import { HttpResponse } from '@/presentation/api/helpers'
import { ServerError } from '@/presentation/api/errors'

jest.mock('@/presentation/api/errors/ServerError')

describe('HttpResponse', () => {
  it('should create an Error if errorMessage is not an instance of an Error', () => {
    const errorMessage = 'fake_error_message'
    HttpResponse.serverError(errorMessage)
    expect(ServerError).toBeCalledWith(new Error(String(errorMessage)))
  })
})
