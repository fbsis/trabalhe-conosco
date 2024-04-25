import { Producer } from "@/domain/entities";
import { DomainException } from "@/domain/exceptions";

describe("Producer", () => {
  it("should create a producer with valid document (CPF)", () => {
    const producer = new Producer(62272579078, "John Doe", []);
    expect(producer.document).toBe(62272579078);
  });

  it("should create a producer with valid document (CNPJ)", () => {
    const producer = new Producer(38447669000107, "Jane Smith", []);
    expect(producer.document).toBe(38447669000107);
  });

  it("should throw an error for an invalid document format", () => {
    expect(() => {
      new Producer(123, "Invalid Producer", []);
    }).toThrowError(DomainException);
  });

  it("should throw an error for an invalid CPF document", () => {
    expect(() => {
      new Producer(98765432109, "Invalid CPF Producer", []);
    }).toThrowError(DomainException);
  });

  it("should throw an error for an invalid CNPJ document", () => {
    expect(() => {
      new Producer(18447669000107, "Invalid CNPJ Producer", []);
    }).toThrowError(DomainException);
  });
});
