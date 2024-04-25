/* eslint-disable import/first */
console.log('Starting server...')

if (process.env.NODE_ENV === undefined) throw new Error('NODE_ENV is not defined')

console.log(`Stage (NODE_ENV): ${String(process.env.NODE_ENV)}`)

process.on('unhandledRejection', (reason: Error, _: Promise<any>) => {
  console.error('Unhandled Rejection at: ', reason.stack ?? reason)
})
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception at: ', error)
})

if (String(process.env.NODE_ENV) === 'production') import('newrelic')

import './moduleAlias'
import { Server } from '@/presentation/api/server'

new Server().startup().catch(console.error)
