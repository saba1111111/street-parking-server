import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

export const ENVS = {
  database: {
    type: process.env.DATABASE_TYPE as Dialect,
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT) as number,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    name: process.env.POSTGRES_DB as string,
    schema: process.env.POSTGRES_SCHEMA as string,
  },
};
