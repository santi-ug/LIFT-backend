import { Sequelize } from "sequelize";
import config from "../config/config.js";
import setupModels from "../models/index.js";

const sequelize = new Sequelize(
	config.dbName,
	config.dbUser,
	config.dbPassword,
	{
		host: config.dbHost,
		dialect: "postgres",
		operationsAliases: false,
		dialectOptions: {
			ssl: {
				require: true, // Make sure SSL is used
				rejectUnauthorized: false, // To avoid issues with self-signed certificates
			},
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

// sequelize.sync({ force: false });
setupModels(sequelize);
const models = sequelize.models;

export default models;
