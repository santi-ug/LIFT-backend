import express from "express";

import {
	_delete,
	create,
	getAllByUserFromWorkout,
	getByIdForUserFromWorkout,
	update,
} from "../controllers/activity.controller.js";

import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router({ mergeParams: true });

router
	.get("/", getByToken, getAllByUserFromWorkout) // Get all activities for a specific workout
	.get("/:activityId", getByToken, getByIdForUserFromWorkout) // Get a specific activity by ID for a specific workout
	.post("/", getByToken, create) // Create a new activity for a specific workout
	.put("/:activityId", getByToken, update) // Update a specific activity by ID for a specific workout
	.delete("/:activityId", getByToken, _delete); // Delete a specific activity by ID for a specific workout

export default router;
