import { Model, DataTypes } from 'sequelize';

const USER_TABLE = 'users';

class User extends Model {
    static associate(models) {
        // Asociaciones con otros modelos aquí
    }

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

    username: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'name'
    },

    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        field:'email'
    },

    password: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'password'
    },
};

export { User, UserSchema }; 