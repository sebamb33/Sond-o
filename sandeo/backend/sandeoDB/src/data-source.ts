import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Question } from "./entity/Question";
import { Formulary } from "./entity/Formulary";
import { Choice } from "./entity/Choice";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "seb",
  password: "Sebastien0507!",
  database: "sandeo",
  synchronize: true,
  logging: false,
  entities: [User, Question, Formulary, Choice],
  migrations: [],
  subscribers: [],
});
