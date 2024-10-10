import {
	BiometricHistory,
	BiometricHistorySchema,
} from "./BiometricHistory.js";
import { User, UserSchema } from "./user.js";

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	BiometricHistory.init(
		BiometricHistorySchema,
		BiometricHistory.config(sequelize)
	);

	User.associate(sequelize.models);
	BiometricHistory.associate(sequelize.models);
}

export default setupModels;
