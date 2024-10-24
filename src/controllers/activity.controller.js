import { Activity } from "../models/Activity.js";
import { Exercise } from "../models/Exercise.js";
import { Set } from "../models/Set.js";
import ActivityService from "../services/activity.service.js";

const service = new ActivityService();

// Get all activities for the authenticated user in the current workout
export const getAllByUserFromWorkout = async (req, res) => {
	try {
		const workout_id = req.params.workoutId;
		const activities = await Activity.findAll({
			where: {
				workout_id: workout_id,
			},
			include: [
				{
					model: Set,
					as: "sets",
					include: [
						{
							model: Exercise,
							as: "exercises",
						},
					],
				},
				{
					model: Exercise,
					as: "singleExercise",
				},
			],
		});

		res.status(200).json(activities);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving activities", error });
	}
};

// Get a specific activity by ID for the authenticated user in the current workout
export const getByIdForUserFromWorkout = async (req, res) => {
	try {
		const workout_id = req.params.workoutId;
		const activity_id = req.params.activityId;
		const activity = await Activity.findOne({
			where: {
				id: activity_id,
				workout_id: workout_id,
			},
			include: [
				{
					model: Set,
					as: "sets",
					include: [
						{
							model: Exercise,
							as: "exercises",
						},
					],
				},
				{
					model: Exercise,
					as: "singleExercise",
				},
			],
		});

		if (!activity) {
			return res.status(404).json({ message: "Activity not found" });
		}

		res.status(200).json(activity);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving activity", error });
	}
};

// Create a new activity for the authenticated user in the current workout
export const create = async (req, res) => {
	try {
		const user_id = req.user.id; // Assuming the user is attached to the request in getByToken middleware
		const workout_id = req.params.workoutId;
		const {
			title,
			order_number,
			notes,
			is_single_exercise,
			exercise_id,
			sets,
		} = req.body;

		if (!title || typeof title !== "string") {
			throw new Error("Invalid title");
		}
		if (!order_number || typeof order_number !== "number") {
			throw new Error("Invalid order number");
		}
		if (!notes || typeof notes !== "string") {
			throw new Error("Invalid notes");
		}
		if (!user_id) {
			throw new Error("User ID not found");
		}
		if (!workout_id) {
			throw new Error("Workout ID not found");
		}

		let activity;

		// Handle the case of a single exercise activity
		if (is_single_exercise) {
			activity = await service.create({
				title,
				order_number,
				notes,
				workout_id,
				is_single_exercise,
				exercise_id, // Assign the single exercise to the activity
			});

			// Create the sets for the single exercise if provided
			if (sets && sets.length > 0) {
				for (const set of sets) {
					await Set.create({ ...set, activity_id: activity.id });
				}
			}
		} else {
			// Handle the case of multiple sets containing multiple exercises
			activity = await service.create({
				title,
				order_number,
				notes,
				workout_id,
				is_single_exercise,
			});

			// Create the sets with their respective exercises
			for (const set of sets) {
				const newSet = await Set.create({ ...set, activity_id: activity.id });
				if (set.exercises && set.exercises.length > 0) {
					for (const exercise of set.exercises) {
						await Exercise.create({ ...exercise, set_id: newSet.id });
					}
				}
			}
		}

		res.status(201).json(activity);
	} catch (error) {
		res.status(500).json({ message: "Error creating activity", error });
	}
};

// Update a specific activity by ID for the authenticated user in the current workout
export const update = async (req, res) => {
	try {
		const workout_id = req.params.workoutId;
		const activity_id = req.params.activityId;
		const { title, order_number, notes } = req.body;

		if (!title || typeof title !== "string") {
			throw new Error("Invalid title");
		}
		if (!order_number || typeof order_number !== "number") {
			throw new Error("Invalid order number");
		}
		if (!notes || typeof notes !== "string") {
			throw new Error("Invalid notes");
		}

		const activity = await Activity.findOne({
			where: {
				id: activity_id,
				workout_id,
			},
		});

		if (!activity) {
			return res.status(404).json({ message: "Activity not found" });
		}

		const updatedActivity = await activity.update({
			title,
			order_number,
			notes,
		});

		res.status(200).json(updatedActivity);
	} catch (error) {
		res.status(500).json({ message: "Error updating activity", error });
	}
};

// Delete a specific activity by ID for the authenticated user in the current workout
export const _delete = async (req, res) => {
	try {
		const workout_id = req.params.workoutId;
		const activity_id = req.params.activityId;

		const activity = await Activity.findOne({
			where: {
				id: activity_id,
				workout_id,
			},
		});

		if (!activity) {
			return res.status(404).json({ message: "Activity not found" });
		}

		await activity.destroy();
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: "Error deleting activity", error });
	}
};
