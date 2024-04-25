import { healthCheckSchema } from "./schemas";

export const healthCheckPath = {
  get: {
    tags: ['Health Check'],
    summary: 'Check Server Health',
    responses: {
      200: {
        description: 'Success',
      }
    }
  }
}

export const createProducerPath = {
  post: {
    summary: 'Create a new Producer',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              document: { type: 'string' },
              farms: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    totalAreaHectares: { type: 'number' },
                    cultivableAreaHectares: { type: 'number' },
                    vegetationAreaHectares: { type: 'number' },
                    plantedCrops: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['name', 'city', 'state', 'totalAreaHectares', 'cultivableAreaHectares', 'vegetationAreaHectares', 'plantedCrops']
                }
              }
            },
            required: ['name', 'document', 'farms']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success'
      }
    }
  },
  delete: {
    summary: 'get a new Producer',
    parameters: [
      {
        in: 'path',
        name: 'document',
        schema: {
          type: 'string'
        },
        required: true,
        description: 'Document of the Producer to delete',
      }
    ],
    responses: {
      200: {
        description: 'Success'
      }
    }
  },
  get: {
    summary: 'get a new Producer',
    responses: {
      200: {
        description: 'Success'
      }
    }
  },
  patch: {
    summary: 'get a new Producer',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              document: { type: 'string' },
              farms: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    totalAreaHectares: { type: 'number' },
                    cultivableAreaHectares: { type: 'number' },
                    vegetationAreaHectares: { type: 'number' },
                    plantedCrops: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['name', 'city', 'state', 'totalAreaHectares', 'cultivableAreaHectares', 'vegetationAreaHectares', 'plantedCrops']
                }
              }
            },
            required: ['name', 'document', 'farms']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success'
      }
    }
  }
};

const deletePath = {
  delete: {
    summary: 'get a new Producer',
    parameters: [
      {
        in: 'path',
        name: 'document',
        schema: {
          type: 'string'
        },
        required: true,
        description: 'Document of the Producer to delete',
      }
    ],
    responses: {
      200: {
        description: 'Success'
      }
    }
  }
}

export default {
  openapi: "3.0.0",
  info: {
    title: "brain-griculture",
    description: "API para o projeto Brain Agriculture",
    version: "1.0.0",
    contact: {
      name: "Felipe Braga",
      email: "felipefbs85@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3001"
    }
  ],
  paths: {
    "/v1/health": healthCheckPath,
    "/v1/producer": createProducerPath,
    "/v1/producer/:document": deletePath,
  },
  schemas: {
    healthCheck: healthCheckSchema
  }
};
