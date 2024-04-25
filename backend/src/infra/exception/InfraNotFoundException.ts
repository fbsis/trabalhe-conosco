export class InfraNotFoundException extends Error {
  details: any
  constructor (message: string, details?: any) {
    super(message)
    this.name = 'InfraDoNotExistsException'
    this.details = details
  }
}
