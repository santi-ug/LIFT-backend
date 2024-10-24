import express from "express";
import activityRouter from "./activity.router.js";
import biometricHistoryRouter from "./biometrichistory.router.js";
import exerciseRouter from "./exercise.router.js";
import setRouter from "./set.router.js";
import userRouter from "./user.router.js";
import variationRouter from "./variation.router.js";
import workoutRouter from "./workout.router.js";

function routerApi(app) {
	const router = express.Router();
	app.use("/api/v1", router);

	router.use("/users", userRouter);
	router.use("/biometrichistories", biometricHistoryRouter);
	router.use("/workouts", workoutRouter);
	router.use("/workouts/:workoutId/activities", activityRouter);
	router.use("/workouts/:workoutId/activities/:activityId/sets", setRouter);
	router.use(
		"/workouts/:workoutId/activities/:activityId/exercises/:exerciseId/sets",
		setRouter
	);
	router.use(
		"/workouts/:workoutId/activities/:activityId/exercises",
		exerciseRouter
	);
	router.use(
		"/workouts/:workoutId/activities/:activityId/exercises/:exerciseId/variations",
		variationRouter
	);
}

export default routerApi;
