import { TestHelper } from '../../../TestHelper'

describe.skip('SwaggerRoute', () => {
  const testHelper = new TestHelper()
  const route = '/api-docs'

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
  })
})
