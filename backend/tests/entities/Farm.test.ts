import { Farm, CropType } from '@/domain/entities';
import { DomainException } from '@/domain/exceptions';

describe('Farm Domain', () => {
    test('should throw error if totalArea is less than sum of cultivableArea and vegetationArea', () => {
        expect(() => {
            new Farm('Farm1', 'City1', 'State1', 10, 6, 5, [CropType.Soja, CropType.Milho]);
        }).toThrowError(new DomainException("The sum of cultivable area and vegetation area cannot exceed the total area of the farm."));
    });

    test('should throw error if any of the planted crops is invalid', () => {
        expect(() => {
            // @ts-expect-error: Testing invalid crop type
            new Farm('Farm2', 'City2', 'State2', 20, 15, 5, [CropType.Cafe, 'InvalidCrop']);
        }).toThrowError(new DomainException("Invalid crop type: InvalidCrop"));
    });

    test('should create a Farm object if all validations pass', () => {
        const farm = new Farm('Farm3', 'City3', 'State3', 30, 20, 10, [CropType.Algodao]);
        expect(farm.name).toEqual('Farm3');
        expect(farm.totalAreaHectares).toEqual(30);
    });

    test('should create a Farm object with multiple planted crops', () => {
        const farm = new Farm('Farm5', 'City5', 'State5', 40, 30, 10, [CropType.Soja, CropType.Milho, CropType.Algodao]);
        expect(farm.plantedCrops).toEqual([CropType.Soja, CropType.Milho, CropType.Algodao]);
    });
    
    test('should throw error if planted crops array is empty', () => {
        expect(() => {
            new Farm('Farm6', 'City6', 'State6', 50, 40, 10, []);
        }).toThrowError(new DomainException("Planted crops cannot be empty."));
    });
    
    test('should not throw error if planted crops array contains valid crops', () => {
        const farm = new Farm('Farm7', 'City7', 'State7', 60, 50, 10, [CropType.CanadeAcucar]);
        expect(farm.plantedCrops).toEqual([CropType.CanadeAcucar]);
    });
});
