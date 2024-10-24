import { Exercise } from "../models/Exercise.js";
import { Set } from "../models/Set.js";
import SetService from "../services/set.service.js";

const service = new SetService();

// Get a specific set by ID
export const getSet = async (req, res) => {
	try {
		const set_id = req.params.setId;
		const set = await Set.findOne({
			where: { id: set_id },
			include: [{ model: Exercise, as: "exercises" }],
		});

		if (!set) {
			return res.status(404).json({ message: "Set not found" });
		}

		res.status(200).json(set);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving set", error });
	}
};

// Get all sets for a specific activity
export const getSetsByActivity = async (req, res) => {
	try {
		const activity_id = req.params.activityId;
		const sets = await Set.findAll({
			where: { activity_id },
			include: [{ model: Exercise, as: "exercises" }],
		});

		res.status(200).json(sets);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving sets", error });
	}
};

// Get all sets for a specific exercise
export const getSetsByExercise = async (req, res) => {
	try {
		const exercise_id = req.params.exerciseId;
		const sets = await Set.findAll({
			where: { exercise_id },
			include: [{ model: Exercise, as: "exercises" }],
		});

		res.status(200).json(sets);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving sets", error });
	}
};

// Create a new set for a specific activity or exercise (using the service)
export const createSet = async (req, res) => {
	try {
		const { activityId, exerciseId } = req.params;
		const { reps, time, weight, weight_unit, is_superset, exercises } =
			req.body;

		let newSet;

		if (activityId) {
			// Create a set for an activity
			newSet = await service.create({
				reps,
				time,
				weight,
				weight_unit,
				is_superset,
				activity_id: activityId,
			});
		} else if (exerciseId) {
			// Create a set for an exercise
			newSet = await service.create({
				reps,
				time,
				weight,
				weight_unit,
				is_superset,
				exercise_id: exerciseId,
			});
		}

		// If there are exercises linked to this set, create them
		if (exercises && exercises.length > 0) {
			for (const exercise of exercises) {
				await Exercise.create({ ...exercise, set_id: newSet.id });
			}
		}

		res.status(201).json(newSet);
	} catch (error) {
		res.status(500).json({ message: "Error creating set", error });
	}
};

// Update a specific set by ID
export const updateSet = async (req, res) => {
	try {
		const set_id = req.params.setId;
		const { reps, time, weight, weight_unit } = req.body;

		const set = await Set.findOne({ where: { id: set_id } });
		if (!set) {
			return res.status(404).json({ message: "Set not found" });
		}

		const updatedSet = await set.update({
			reps,
			time,
			weight,
			weight_unit,
		});

		res.status(200).json(updatedSet);
	} catch (error) {
		res.status(500).json({ message: "Error updating set", error });
	}
};

// Delete a specific set by ID
export const deleteSet = async (req, res) => {
	try {
		const set_id = req.params.setId;
		const set = await Set.findOne({ where: { id: set_id } });

		if (!set) {
			return res.status(404).json({ message: "Set not found" });
		}

		await set.destroy();
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: "Error deleting set", error });
	}
};
