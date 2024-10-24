import { Activity, ActivitySchema } from "./Activity.js";
import {
	BiometricHistory,
	BiometricHistorySchema,
} from "./BiometricHistory.js";
import { Exercise, ExerciseSchema } from "./Exercise.js";
import { Set, SetSchema } from "./Set.js";
import { User, UserSchema } from "./User.js";
import { Variation, VariationSchema } from "./Variation.js";
import { Workout, WorkoutSchema } from "./Workout.js";

function setupModels(sequelize) {
	// Initialize all models with their schema and config
	User.init(UserSchema, User.config(sequelize));
	BiometricHistory.init(
		BiometricHistorySchema,
		BiometricHistory.config(sequelize)
	);
	Workout.init(WorkoutSchema, Workout.config(sequelize));
	Activity.init(ActivitySchema, Activity.config(sequelize));
	Exercise.init(ExerciseSchema, Exercise.config(sequelize));
	Set.init(SetSchema, Set.config(sequelize));
	Variation.init(VariationSchema, Variation.config(sequelize));

	// Associate models with one another
	User.associate(sequelize.models);
	BiometricHistory.associate(sequelize.models);
	Workout.associate(sequelize.models);
	Activity.associate(sequelize.models);
	Exercise.associate(sequelize.models);
	Set.associate(sequelize.models);
	Variation.associate(sequelize.models);
}

export default setupModels;
