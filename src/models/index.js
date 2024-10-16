import {
	BiometricHistory,
	BiometricHistorySchema,
} from "./BiometricHistory.js";
import { User, UserSchema } from "./User.js";
import { Workout, WorkoutSchema } from "./Workout.js";

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	BiometricHistory.init(
		BiometricHistorySchema,
		BiometricHistory.config(sequelize)
	);
	Workout.init(WorkoutSchema, Workout.config(sequelize));

	User.associate(sequelize.models);
	BiometricHistory.associate(sequelize.models);
	Workout.associate(sequelize.models);
}

export default setupModels;
