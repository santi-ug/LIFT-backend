import express from "express";
import biometricHistoryRouter from "./biometrichistory.router.js";
import userRouter from "./user.router.js";
import workoutRouter from "./workout.router.js";

function routerApi(app) {
	const router = express.Router();
	app.use("/api/v1", router);

	router.use("/users", userRouter);
	router.use("/biometrichistories", biometricHistoryRouter);
	router.use("/workouts", workoutRouter);
}

export default routerApi;
