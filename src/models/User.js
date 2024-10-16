import { DataTypes, Model } from "sequelize";

const USER_TABLE = "users";

class User extends Model {
	static associate(models) {
		// A User can have many BiometricHistories
		this.hasMany(models.BiometricHistory, {
			as: "biometricHistories",
			foreignKey: {
				name: "user_id",
			},
		});
		// A User can have many Workouts
		this.hasMany(models.Workout, {
			as: "workouts",
			foreignKey: {
				name: "user_id",
			},
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: "User",
			timestamps: true,
			underscored: true,
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

	avatar: {
		allowNull: true,
		type: DataTypes.BLOB("long"),
	},
};

export { User, UserSchema };
