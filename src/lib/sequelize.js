import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import setupModels from './../db/models/index.js';

const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect: 'postgres'
    }
); 

setupModels(sequelize); 
const models = sequelize.models;

export default models;