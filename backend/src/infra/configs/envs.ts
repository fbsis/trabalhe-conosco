export type DatabaseSettings = {
  authentication: {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: string,
    logging: string
  };
};

export class EnvAdapter {
  static readonly server = {
    stage: process.env.NODE_ENV ?? "development",
    name: process.env.SERVICE_NAME ?? "brain-griculture",
  };

  static readonly http = {
    listenPort: Number(process.env.PORT ?? 3001),
  };

  static readonly databaseSettings: DatabaseSettings = {
    authentication: {
      type: process.env.DATABASE_TYPE ?? "postgres",
      host: process.env.DATABASE_HOST ?? "localhost",
      port: 3306,
      username: process.env.DATABASE_USERNAME ?? "root",
      password: process.env.DATABASE_PASSWORD ?? "password",
      database: process.env.DATABASE_DATABASE ?? "brain-griculture",
      synchronize: process.env.DATABASE_SYNCHRONIZE ?? "true",
      logging: process.env.DATABASE_LOGGING ?? "true",
    },
  };
}
