import { BiometricHistory } from "../models/BiometricHistory.js";
import BiometricHistoryService from "../services/biometrichistory.service.js";

const service = new BiometricHistoryService();

// Get all biometric histories for the authenticated user
export const getAllByUser = async (req, res) => {
	try {
		const user_id = req.user.id; // Assuming the user is attached to the request in getByToken middleware
		const biometricHistories = await BiometricHistory.findAll({
			where: { user_id }, // Find all histories belonging to the authenticated user
		});
		res.status(200).json(biometricHistories);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving biometric histories", error });
	}
};

// Get a specific biometric history by ID for the authenticated user
export const getByIdForUser = async (req, res) => {
	try {
		const user_id = req.user.id; // Assuming the user is attached to the request in getByToken middleware
		const biometricHistoryId = req.params.biometricHistoryId;
		const biometricHistory = await BiometricHistory.findOne({
			where: { id: biometricHistoryId, user_id }, // Find the history by ID and ensure it belongs to the user
		});
		if (!biometricHistory) {
			return res.status(404).json({ message: "Biometric history not found" });
		}
		res.status(200).json(biometricHistory);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving biometric history", error });
	}
};

// Create a new biometric history for the authenticated user
export const create = async (req, res) => {
	try {
		const user_id = req.user.id; // Assuming the user is attached to the request in getByToken middleware
		const { weight, height, bmi, fat_percentage, date } = req.body;

		if (!weight || typeof weight !== "number") {
			throw new Error("Invalid weight");
		}
		if (!height || typeof height !== "number") {
			throw new Error("Invalid height");
		}
		if (!bmi || typeof bmi !== "number") {
			throw new Error("Invalid BMI");
		}
		if (!fat_percentage || typeof fat_percentage !== "number") {
			throw new Error("Invalid fat percentage");
		}
		if (!date || isNaN(Date.parse(date))) {
			throw new Error("Invalid date");
		}
		if (!user_id) {
			throw new Error("User ID not found");
		}

		const response = await service.create({
			weight,
			height,
			bmi,
			fat_percentage,
			date,
			user_id, // Attach the authenticated user's ID
		});
		res.status(201).json({ success: true, data: response });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Update a specific biometric history by ID for the authenticated user
export const update = async (req, res) => {
	try {
		const user_id = req.user.id; // Assuming the user is attached to the request in getByToken middleware
		const biometricHistoryId = req.params.biometricHistoryId;
		const { weight, height, bmi, fat_percentage, date } = req.body;

		const biometricHistory = await BiometricHistory.findOne({
			where: { id: biometricHistoryId, user_id }, // Ensure the history belongs to the user
		});

		if (!biometricHistory) {
			return res.status(404).json({ message: "Biometric history not found" });
		}

		// Update the biometric history
		await biometricHistory.update({
			weight,
			height,
			bmi,
			fat_percentage,
			date,
		});

		res.status(200).json(biometricHistory);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating biometric history", error });
	}
};
