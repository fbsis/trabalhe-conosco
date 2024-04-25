import { DomainException } from "@/domain/exceptions";

export enum CropType {
    Soja = "Soja",
    Milho = "Milho",
    Algodao = "Algodão",
    Cafe = "Café",
    CanadeAcucar = "Cana de Açúcar"
}

export class Farm {
    name: string;
    city: string;
    state: string;
    totalAreaHectares: number;
    cultivableAreaHectares: number;
    vegetationAreaHectares: number;
    plantedCrops: CropType[];

    constructor(
        name: string,
        city: string,
        state: string,
        totalAreaHectares: number,
        cultivableAreaHectares: number,
        vegetationAreaHectares: number,
        plantedCrops: CropType[]
    ) {
        this.name = name;
        this.city = city;
        this.state = state;
        this.totalAreaHectares = totalAreaHectares;
        this.validateAreas(
            totalAreaHectares,
            cultivableAreaHectares,
            vegetationAreaHectares
        );
        this.cultivableAreaHectares = cultivableAreaHectares;
        this.vegetationAreaHectares = vegetationAreaHectares;

        this.validatePlantedCrops(plantedCrops);
        this.plantedCrops = plantedCrops;
    }

    validateAreas(
        totalArea: number,
        cultivableArea: number,
        vegetationArea: number
    ) {
        if (cultivableArea + vegetationArea > totalArea) {
            throw new DomainException(
                "The sum of cultivable area and vegetation area cannot exceed the total area of the farm."
            );
        }
    }

    validatePlantedCrops(plantedCrops: CropType[]) {
        if(!plantedCrops || plantedCrops.length === 0) throw new DomainException(`Planted crops cannot be empty.`);
        for (const crop of plantedCrops) {
            if (!Object.values(CropType).includes(crop)) {
                throw new DomainException(`Invalid crop type: ${crop}`);
            }
        }
    }
}
