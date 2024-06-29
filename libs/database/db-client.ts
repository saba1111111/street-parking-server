import { ENVS } from "../common/constants";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  ENVS.database.name,
  ENVS.database.user,
  ENVS.database.password,
  {
    host: ENVS.database.host,
    port: ENVS.database.port,
    dialect: ENVS.database.type,
  }
);

// Example usage in your application

export default sequelize;
