export class DomainException extends Error {
  details: any
  constructor(message: string, details?: any) {
    super(message);
    this.name = "DomainException";
    this.details = details

  }
}
