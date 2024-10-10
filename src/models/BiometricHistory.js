import { DataTypes, Model } from "sequelize";
import { User } from "./user.js"; // Import the User model

const BIOMETRIC_HISTORY_TABLE = "biometric_histories";

class BiometricHistory extends Model {
	static associate(models) {
		// Each BiometricHistory belongs to a User (foreign key: user_id)
		this.belongsTo(models.User, {
			as: "user",
			foreignKey: {
				name: "user_id",
			},
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: BIOMETRIC_HISTORY_TABLE,
			modelName: "BiometricHistory",
			timestamps: true,
			underscored: true,
		};
	}
}

const BiometricHistorySchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	weight: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	height: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	imc: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	fat_percentage: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	date: {
		allowNull: false,
		type: DataTypes.DATE,
	},

	user_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: "users", // References the 'users' table
			key: "id", // 'id' is the primary key in the 'users' table
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL", // Optional, can be adjusted as needed
	},
};

export { BiometricHistory, BiometricHistorySchema };
