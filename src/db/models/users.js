import { Model, DataTypes } from 'sequelize';

const USER_TABLE = 'users';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true,
        };
    }
}

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },

    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },

    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },

    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
};

export { User, UserSchema }; 