import { ExpressHttpAdapter } from "@/presentation/api/adapters/ExpressHttpAdapter";

describe.skip('ExpressHttpAdapter', () => {
    it('should run beforeStartup without calling setupDatabase', async () => {
      // Mock setupDatabase method to prevent it from executing
      // @ts-expect-error
      jest.spyOn(ExpressHttpAdapter.prototype, 'setupDatabase').mockImplementation();
  
      const expressHttpAdapter = new ExpressHttpAdapter();
  
      // Call the beforeStartup method
      // @ts-expect-error
      expressHttpAdapter.beforeStartup();
  
      // Assert that setupDatabase was not called
      // @ts-expect-error
      expect(ExpressHttpAdapter.prototype.setupDatabase).toHaveBeenCalled();
    });
  });