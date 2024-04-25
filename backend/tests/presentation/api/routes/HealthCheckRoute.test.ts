import { TestHelper } from '../../../TestHelper'
import { Server } from '@/presentation/api/server'


describe('HealthCheckRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v1/health'

  beforeAll(async () => {
    await testHelper.startupServer()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  it('should return 200 on success', async () => {
    const response = await testHelper.axiosAPIClient
      .get(route)
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      status: 'ok'
    })
  })
})
