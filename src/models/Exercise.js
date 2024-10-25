import { DataTypes, Model } from "sequelize";

const EXERCISE_TABLE = "exercises";

class Exercise extends Model {
	static associate(models) {
		// Each Exercise can have multiple Variations
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: EXERCISE_TABLE,
			modelName: "Exercise",
			timestamps: true,
			underscored: true,
		};
	}
}

const ExerciseSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	exercise_api_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	exercise_data: {
		allowNull: false,
		type: DataTypes.JSONB,
	},
};

export { Exercise, ExerciseSchema };
