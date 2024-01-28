import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "seb",
  password: "Sebastien0507!",
  database: "sandeo",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
  migrationsTableName: "custom_migration_table",
});
