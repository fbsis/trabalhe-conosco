export const healthCheckPath = {
  get: {
    tags: ['Health Check'],
    summary: 'Check Server Health',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/healthCheck'
            }
          }
        }
      }
    }
  }
}
