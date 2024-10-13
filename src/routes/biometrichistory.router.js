import express from "express";
import {
	create,
	getAllByUser,
	getByIdForUser,
	update,
} from "../controllers/biometrichistory.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router();

router
	.get("/", getByToken, getAllByUser) // Get all biometric histories for the authenticated user
	.get("/:biometricHistoryId", getByToken, getByIdForUser) // Get specific biometric history by ID for the authenticated user
	.post("/", getByToken, create) // Create a new biometric history for the authenticated user
	.put("/:biometricHistoryId", getByToken, update); // Update a specific biometric history by ID for the authenticated user

export default router;
