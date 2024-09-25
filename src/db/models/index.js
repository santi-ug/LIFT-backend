import { User, UserSchema } from './users.js';

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
}

export default setupModels;