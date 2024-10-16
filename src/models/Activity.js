import { DataTypes, Model } from "sequelize";

const ACTIVITY_TABLE = "activities";

class Activity extends Model {
	static associate(models) {
		// Each Activity belongs to a Workout (foreign key: user_id)
		this.belongsTo(models.Workout, {
			as: "workout",
			foreignKey: {
				name: "workout_id",
			},
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
		allowNull: false,
		type: DataTypes.STRING,
	},
	workout_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: "workouts", // References the 'workouts' table
			key: "id", // 'id' is the primary key in the 'workouts' table
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL", // Optional, can be adjusted as needed
	},
};

export { Activity, ActivitySchema };
