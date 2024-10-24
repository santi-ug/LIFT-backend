import { Exercise } from "../models/Exercise.js";
import { Variation } from "../models/Variation.js";
import ExerciseService from "../services/exercise.service.js";

const service = new ExerciseService();

// Get a specific exercise by ID
export const getExercise = async (req, res) => {
	try {
		const exercise_id = req.params.exerciseId;
		const exercise = await Exercise.findOne({
			where: { id: exercise_id },
			include: [{ model: Variation, as: "variations" }],
		});

		if (!exercise) {
			return res.status(404).json({ message: "Exercise not found" });
		}

		res.status(200).json(exercise);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving exercise", error });
	}
};

// Get all exercises for a specific set
export const getExercisesBySet = async (req, res) => {
	try {
		const set_id = req.params.setId;
		const exercises = await Exercise.findAll({
			where: { set_id },
			include: [{ model: Variation, as: "variations" }],
		});

		res.status(200).json(exercises);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving exercises", error });
	}
};

// Create a new exercise (using the service)
export const createExercise = async (req, res) => {
	try {
		const set_id = req.params.setId; // Exercise belongs to a set
		const { exercise_api_id, exercise_data, notes, variations } = req.body;

		const newExercise = await service.create({
			exercise_api_id,
			exercise_data,
			notes,
			set_id,
		});

		// If the exercise has variations, create them
		if (variations && variations.length > 0) {
			for (const variation of variations) {
				await Variation.create({ ...variation, exercise_id: newExercise.id });
			}
		}

		res.status(201).json(newExercise);
	} catch (error) {
		res.status(500).json({ message: "Error creating exercise", error });
	}
};

// Update a specific exercise by ID
export const updateExercise = async (req, res) => {
	try {
		const exercise_id = req.params.exerciseId;
		const { exercise_api_id, exercise_data, notes } = req.body;

		const exercise = await Exercise.findOne({ where: { id: exercise_id } });
		if (!exercise) {
			return res.status(404).json({ message: "Exercise not found" });
		}

		const updatedExercise = await exercise.update({
			exercise_api_id,
			exercise_data,
			notes,
		});

		res.status(200).json(updatedExercise);
	} catch (error) {
		res.status(500).json({ message: "Error updating exercise", error });
	}
};

// Delete a specific exercise by ID
export const deleteExercise = async (req, res) => {
	try {
		const exercise_id = req.params.exerciseId;
		const exercise = await Exercise.findOne({ where: { id: exercise_id } });

		if (!exercise) {
			return res.status(404).json({ message: "Exercise not found" });
		}

		await exercise.destroy();
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: "Error deleting exercise", error });
	}
};
