export class InfraException extends Error {
  details: any
  constructor (message: string, details?: any) {
    super(message)
    this.name = 'InfraException'
    this.details = details
  }
}
