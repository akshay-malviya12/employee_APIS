import { Sequelize } from 'sequelize';

import dotenv from "dotenv";

//dot env configuration.
dotenv.config();

const PASSWORD = process.env.DB_PASSWORD as string;
const DBNAME = process.env.DB_NAME as string;

const sequelize = new Sequelize(
  DBNAME,
  'root',
  PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT),
    logging: false,
  }
)

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

export default sequelize;

