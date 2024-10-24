import express from "express";
import {
	createExercise,
	deleteExercise,
	getExercise,
	getExercisesBySet,
	updateExercise,
} from "../controllers/exercise.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router({ mergeParams: true }); // Allows access to activityId and setId

// All routes pass through the getByToken middleware
router
	.post("/", getByToken, createExercise) // Create a new exercise for a set
	.get("/", getByToken, getExercisesBySet) // Get all exercises for a specific set
	.get("/:exerciseId", getByToken, getExercise) // Get a specific exercise by ID
	.put("/:exerciseId", getByToken, updateExercise) // Update a specific exercise by ID
	.delete("/:exerciseId", getByToken, deleteExercise); // Delete a specific exercise by ID

export default router;
