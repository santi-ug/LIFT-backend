import { DataTypes, Model } from "sequelize";

const EXERCISE_TABLE = "exercises";

class Exercise extends Model {
	static associate(models) {
		// Each Exercise can belong to an Activity (for single-exercise activities)
		this.belongsTo(models.Activity, {
			as: "activity",
			foreignKey: {
				name: "activity_id",
			},
		});

		// Each Exercise can belong to a Set (for exercises part of sets or supersets)
		this.belongsTo(models.Set, {
			as: "set",
			foreignKey: {
				name: "set_id",
			},
		});

		// Each Exercise can have multiple Variations
		this.hasMany(models.Variation, {
			as: "variations",
			foreignKey: "exercise_id",
		});
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
	notes: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	// For when the exercise is part of a single-exercise activity
	activity_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "activities",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
	// For when the exercise is part of a set or superset
	set_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "sets",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
};

export { Exercise, ExerciseSchema };
