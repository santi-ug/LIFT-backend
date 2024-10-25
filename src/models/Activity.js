import { DataTypes, Model } from "sequelize";

const ACTIVITY_TABLE = "activities";

class Activity extends Model {
	static associate(models) {
		// Activity belongs to a Workout
		this.belongsTo(models.Workout, {
			as: "workout",
			foreignKey: {
				name: "workout_id",
			},
		});

		// Activity can either be a single exercise or multiple sets
		this.belongsTo(models.Exercise, {
			as: "singleExercise",
			foreignKey: {
				name: "exercise_id",
			},
		});

		// Activity can have multiple sets
		this.hasMany(models.Set, {
			as: "sets",
			foreignKey: "activity_id",
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ACTIVITY_TABLE,
			modelName: "Activity",
			timestamps: true,
			underscored: true,
		};
	}
}

const ActivitySchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	title: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	order_number: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	notes: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	is_single_exercise: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
	},
	variation: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	workout_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "workouts",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
	exercise_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "exercises",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
};

export { Activity, ActivitySchema };
