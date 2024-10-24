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

		// A Set can contain multiple exercises
		this.hasMany(models.Exercise, {
			as: "exercises",
			foreignKey: "set_id",
		});

		// A Set (including supersets) can have variations
		this.hasMany(models.Variation, {
			as: "variations",
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
		allowNull: true,
		type: DataTypes.INTEGER,
	},
	time: {
		allowNull: true,
		type: DataTypes.TIME,
	},
	weight: {
		allowNull: true,
		type: DataTypes.DOUBLE,
	},
	weight_unit: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	is_superset: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
	},
	activity_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "activities",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
};

export { Set, SetSchema };
