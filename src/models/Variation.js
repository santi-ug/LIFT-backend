import { DataTypes, Model } from "sequelize";

const VARIATION_TABLE = "variations";

class Variation extends Model {
	static associate(models) {
		// Variation belongs to both a Set and an Exercise
		this.belongsTo(models.Set, {
			as: "set",
			foreignKey: {
				name: "set_id",
			},
		});

		this.belongsTo(models.Exercise, {
			as: "exercise",
			foreignKey: {
				name: "exercise_id",
			},
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: VARIATION_TABLE,
			modelName: "Variation",
			timestamps: true,
			underscored: true,
		};
	}
}

const VariationSchema = {
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
	date: {
		allowNull: true,
		type: DataTypes.DATE,
	},
	is_superset_variation: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
	},
	set_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "sets",
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

export { Variation, VariationSchema };
