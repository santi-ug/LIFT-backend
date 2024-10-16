import express from "express";
import {
	create,
	getAllByUser,
	getByIdForUser,
	update,
} from "../controllers/workout.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router();

router
	.get("/", getByToken, getAllByUser) // Get all workouts for the authenticated user
	.get("/:workoutId", getByToken, getByIdForUser) // Get specific workout by ID for the authenticated user
	.post("/", getByToken, create) // Create a new workout for the authenticated user
	.put("/:workoutId", getByToken, update); // Update a specific workout by ID for the authenticated user

export default router;
