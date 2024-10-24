import express from "express";
import {
	createVariation,
	deleteVariation,
	getVariation,
	getVariationsByExercise,
	updateVariation,
} from "../controllers/variation.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router({ mergeParams: true }); // Allows access to exerciseId

// All routes pass through the getByToken middleware
router
	.post("/", getByToken, createVariation) // Create a new variation for an exercise
	.get("/", getByToken, getVariationsByExercise) // Get all variations for a specific exercise
	.get("/:variationId", getByToken, getVariation) // Get a specific variation by ID
	.put("/:variationId", getByToken, updateVariation) // Update a specific variation by ID
	.delete("/:variationId", getByToken, deleteVariation); // Delete a specific variation by ID

export default router;
