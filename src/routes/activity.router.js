import express from "express";
import {
	_delete,
	create,
	getAllByUserFromWorkout,
	getByIdForUserFromWorkout,
	update,
} from "../controllers/activity.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router({ mergeParams: true }); // Allows access to workoutId

// All routes pass through the getByToken middleware
router
	.get("/", getByToken, getAllByUserFromWorkout) // Get all activities for a workout
	.get("/:activityId", getByToken, getByIdForUserFromWorkout) // Get a specific activity
	.post("/", getByToken, create) // Create a new activity
	.put("/:activityId", getByToken, update) // Update a specific activity
	.delete("/:activityId", getByToken, _delete); // Delete a specific activity

export default router;
