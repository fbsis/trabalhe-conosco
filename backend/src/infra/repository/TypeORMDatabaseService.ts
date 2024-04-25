import { EnvAdapter } from "@/infra/configs/envs";
import { InfraException } from "@/infra/exception";
import { DataSource } from "typeorm"
import { FarmEntitiy } from "./typeOrm/entities/Farm.entities";
import { ProducerEntity } from "./typeOrm/entities/Producer.entities";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: EnvAdapter.databaseSettings.authentication.type,
      host: EnvAdapter.databaseSettings.authentication.host,
      port: 5432,
      username: EnvAdapter.databaseSettings.authentication.username,
      password: EnvAdapter.databaseSettings.authentication.password,
      database: EnvAdapter.databaseSettings.authentication.database,
      synchronize: true,
      logging: EnvAdapter.databaseSettings.authentication.logging === "true",
      entities: [FarmEntitiy, ProducerEntity],
      subscribers: [],
      migrations: [],
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async initialize(): Promise<void> {
    try {
      await this.dataSource.initialize();
    } catch (error) {
      throw new InfraException('DatabaseServiceErrorInitializeException', error)
    }
  }
}