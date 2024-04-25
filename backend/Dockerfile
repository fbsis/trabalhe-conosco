#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY ./src ./src

RUN npm ci --quiet \
    && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:18-alpine

ARG NR_KEY

ARG APP_NAME

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --production

COPY --from=builder --chown=node:node /usr/src/app/ ./


CMD [ "npm", "start" ]
