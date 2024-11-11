import { DataTypes, Model } from "sequelize";

const SET_TABLE = "sets";

class Set extends Model {
	static associate(models) {
		// A Set belongs to an Activity
		this.belongsTo(models.Activity, {
			as: "activity",
			foreignKey: {
				name: "activity_id",
			},
		});

		// A Set can contain one or multiple exercises
		this.hasMany(models.Exercise, {
			as: "exercises",
			foreignKey: "set_id",
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: SET_TABLE,
			modelName: "Set",
			timestamps: true,
			underscored: true,
		};
	}
}

const SetSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	reps: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	time: {
		type: DataTypes.TIME,
		allowNull: true,
	},
	weight: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	is_superset: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	rpe: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	rir: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	notes: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	order_number: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	order_dropset_number: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	rest_time: {
		type: DataTypes.TIME,
		allowNull: true,
	},
	type: {
		type: DataTypes.ENUM,
		values: ["warmup", "dropset", "set"],
		validate: {
			isIn: {
				args: [["warmup", "dropset", "set"]],
				msg: "Type must be one of 'warmup', 'dropset', or 'set'",
			},
		},
		allowNull: false,
	},
	activity_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: "activities",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
};

export { Set, SetSchema };
