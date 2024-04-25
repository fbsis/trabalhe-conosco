import { ExpressHttpAdapter } from "@/presentation/api/adapters";
import { TestHelper } from "../../../TestHelper";
import { ProducerCommandRepository } from "@/infra/repository/ProducerCommandRepository";
jest.setTimeout(15000);


describe("create producer controller", () => {
  jest
    // @ts-expect-error:
    .spyOn(ExpressHttpAdapter.prototype, "setupDatabase")
      // @ts-expect-error:
    .mockImplementation();
  jest
    .spyOn(ProducerCommandRepository.prototype, "create")
    .mockImplementation();

  const testHelper = new TestHelper();
  const route = "/v1/producer/";

  beforeAll(async () => {
    await testHelper.startupServer();
  });

  afterAll(async () => {
    await testHelper.shutdownServer();
  });

  it("should return 200 on sucess with the values", async () => {
    const response = await testHelper.axiosAPIClient.post(route, {
      name: "teste22",
      document: "11425759777",
      farms: [],
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({});
  });
});
