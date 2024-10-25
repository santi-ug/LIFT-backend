import express from "express";
import {
	createSet,
	deleteSet,
	getSet,
	getSetsByActivity,
	getSetsByExercise,
	updateSet,
} from "../controllers/set.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router({ mergeParams: true }); // Allows access to activityId, workoutId, and exerciseId

// All routes pass through the getByToken middleware

// Sets under an activity
router
	.post("/", getByToken, createSet) // Create a new set for an activity
	// Which router does it go to?
	.get("/:setId", getByToken, getSet) // Get a specific set by ID
	.get("/", getByToken, getSetsByActivity); // Get all sets for an activity

// Sets under an exercise
router
	.get("/exercise", getByToken, getSetsByExercise) // Get all sets for an exercise
	.put("/:setId", getByToken, updateSet) // Update a specific set by ID
	.delete("/:setId", getByToken, deleteSet); // Delete a specific set by ID

// .get(/)
// .get(/:exerciseId)

export default router;
