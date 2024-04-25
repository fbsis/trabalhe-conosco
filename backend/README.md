# Introduction
Welcome to the Webhook Service! This service provides functionality for managing webhooks.

# Getting Started

Installation process

```bash
docker-compose up
```

To get inside container bash:

```bash
docker-compose run --rm app /bin/bash
```

## Code quality check

Inside docker container app, run:

1. To check typescript:

```bash
npm run type-check
```

2. To check linting and fix:

```bash
npm run lint:fix
```

3. To check for unused code:

```bash
npm run find-deadcode
```

4. To check dependencies:

```bash
npm run pkg-check
```

## Build

```bash
docker build --no-cache -t authorization-service . --build-arg NR_KEY="testnrkey" --build-arg APP_NAME="testappname"
```

### Run build

```bash
docker run -p 3000:3000 authorization-service
```

## Test

Inside docker container app, run:

1. Unit testing:

```bash
npm run test:unit
```

2. Integration testing:

```bash
npm run test:integration
```

3. Coverage testing:

```bash
npm run test:coverage
```
