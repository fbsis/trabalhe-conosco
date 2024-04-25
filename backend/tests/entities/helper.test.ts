import { DocumentValidator } from "@/domain/helper";

describe("DocumentValidator", () => {
  describe("isValidCPF", () => {
    it("should return true for a valid CPF", () => {
      const cpf = "123.456.789-09";
      expect(DocumentValidator.isValidCPF(cpf)).toBe(true);
    });

    it("should return false for an invalid CPF", () => {
      const cpf = "123.456.789-00";
      expect(DocumentValidator.isValidCPF(cpf)).toBe(false);
    });
  });

  describe("isValidCPF", () => {
    it("should return true for a valid CPF without symbols", () => {
      const cpf = "62272579078";
      expect(DocumentValidator.isValidCPF(cpf)).toBe(true);
    });

  });

  describe("isValidCNPJ", () => {
    it("should return true for a valid CNPJ without symbols", () => {
      const cnpj = "01465834000135";
      expect(DocumentValidator.isValidCNPJ(cnpj)).toBe(true);
    });

  });

});
