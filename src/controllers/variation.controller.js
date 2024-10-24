import { Variation } from "../models/Variation.js";
import VariationService from "../services/variation.service.js";

const service = new VariationService();

// Get a specific variation by ID
export const getVariation = async (req, res) => {
	try {
		const variation_id = req.params.variationId;
		const variation = await Variation.findOne({
			where: { id: variation_id },
		});

		if (!variation) {
			return res.status(404).json({ message: "Variation not found" });
		}

		res.status(200).json(variation);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving variation", error });
	}
};

// Get all variations for a specific exercise
export const getVariationsByExercise = async (req, res) => {
	try {
		const exercise_id = req.params.exerciseId;
		const variations = await Variation.findAll({
			where: { exercise_id },
		});

		res.status(200).json(variations);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving variations", error });
	}
};

// Create a new variation (using the service)
export const createVariation = async (req, res) => {
	try {
		const exercise_id = req.params.exerciseId; // Variation belongs to an exercise
		const { title, date, is_superset_variation } = req.body;

		const newVariation = await service.create({
			title,
			date,
			is_superset_variation,
			exercise_id,
		});

		res.status(201).json(newVariation);
	} catch (error) {
		res.status(500).json({ message: "Error creating variation", error });
	}
};

// Update a specific variation by ID
export const updateVariation = async (req, res) => {
	try {
		const variation_id = req.params.variationId;
		const { title, date, is_superset_variation } = req.body;

		const variation = await Variation.findOne({ where: { id: variation_id } });
		if (!variation) {
			return res.status(404).json({ message: "Variation not found" });
		}

		const updatedVariation = await variation.update({
			title,
			date,
			is_superset_variation,
		});

		res.status(200).json(updatedVariation);
	} catch (error) {
		res.status(500).json({ message: "Error updating variation", error });
	}
};

// Delete a specific variation by ID
export const deleteVariation = async (req, res) => {
	try {
		const variation_id = req.params.variationId;
		const variation = await Variation.findOne({ where: { id: variation_id } });

		if (!variation) {
			return res.status(404).json({ message: "Variation not found" });
		}

		await variation.destroy();
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: "Error deleting variation", error });
	}
};
