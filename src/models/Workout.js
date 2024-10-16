import { DataTypes, Model } from "sequelize";

const WORKOUT_TABLE = "workouts";

class Workout extends Model {
	static associate(models) {
		// Each Workout belongs to a User (foreign key: user_id)
		this.belongsTo(models.User, {
			as: "user",
			foreignKey: {
				name: "user_id",
			},
		});

		// Each Workout has many Activities
		this.hasMany(models.Activity, {
			as: "activities",
			foreignKey: {
				name: "workout_id",
			},
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: WORKOUT_TABLE,
			modelName: "Workout",
			timestamps: true,
			underscored: true,
		};
	}
}

const WorkoutSchema = {
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
	notes: {
		allowNull: false,
		type: DataTypes.STRING,
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
	start_time: {
		allowNull: false,
		type: DataTypes.DATE,
	},
	end_time: {
		allowNull: false,
		type: DataTypes.DATE,
	},
	duration: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	total_sets: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
};

export { Workout, WorkoutSchema };
