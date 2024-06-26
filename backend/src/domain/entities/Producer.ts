import { DomainException } from "@/domain/exceptions";
import { DocumentValidator } from "@/domain/helper";
import { Farm } from "./Farm";

export class Producer {
  document: number;
  name: string;
  farms: Farm[];

  constructor(document: number, name: string, farms: Farm[]) {
    this.validateDocument(document);
    this.document = document;
    this.name = name;
    this.farms = farms.map((farm) => {
      return new Farm(
        farm.name,
        farm.city,
        farm.state,
        farm.totalAreaHectares,
        farm.cultivableAreaHectares,
        farm.vegetationAreaHectares,
        farm.plantedCrops
      );
    });
  }

  validateDocument(document: number) {
    const documentStr = document.toString();

    if (documentStr.length === 11) {
      const checkResult = DocumentValidator.isValidCPF(documentStr);
      if (!checkResult) {
        throw new DomainException("Invalid CPF document.");
      }
    } else if (documentStr.length === 14) {
      const checkResult = DocumentValidator.isValidCNPJ(documentStr);
      if (!checkResult) {
        throw new DomainException("Invalid CNPJ document.");
      }
    } else {
      throw new DomainException(
        "Invalid document format. Document must be either CPF (11 digits) or CNPJ (14 digits)."
      );
    }
  }
}
