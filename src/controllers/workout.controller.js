import { Workout } from "../models/Workout.js";
import WorkoutService from "../services/workout.service.js";

const service = new WorkoutService();

// Get all workouts for the authenticated user
export const getAllByUser = async (req, res) => {
	try {
		const user_id = req.user.id;
		const workouts = await Workout.findAll({
			where: { user_id },
		});
		res.status(200).json(workouts);
	} catch (error) {
		res.stats(500).json({ message: "Error retrieving workouts", error });
	}
};

// Get a specific workout by ID for the authenticated user
export const getByIdForUser = async (req, res) => {
	try {
		const user_id = req.user.id;
		const workoutId = req.params.workoutId;
		const workout = await Workout.findOne({
			where: { id: workoutId, user_id },
		});
		if (!workout) {
			return res.status(404).json({ message: "Workout not found" });
		}
		res.status(200).json(workout);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving workout", error });
	}
};

// Create a new workout for the authenticated user
export const create = async (req, res) => {
	try {
		const user_id = req.user.id;
		const { title, notes, date, start_time, end_time, duration, total_sets } =
			req.body;

		if (!title || typeof title !== "string") {
			throw new Error("Invalid title");
		}
		if (!notes || typeof notes !== "string") {
			throw new Error("Invalid notes");
		}
		if (!date || isNaN(Date.parse(date))) {
			throw new Error("Invalid date");
		}
		if (!start_time || isNaN(Date.parse(start_time))) {
			throw new Error("Invalid start time");
		}
		if (!end_time || isNaN(Date.parse(end_time))) {
			throw new Error("Invalid end time");
		}
		if (!duration || typeof duration !== "number") {
			throw new Error("Invalid duration");
		}
		if (!total_sets || typeof total_sets !== "number") {
			throw new Error("Invalid total sets");
		}
		if (!user_id) {
			throw new Error("User ID not found");
		}

		const workout = await service.create({
			title,
			notes,
			date,
			start_time,
			end_time,
			duration,
			total_sets,
			user_id,
		});

		res.status(201).json(workout);
	} catch (error) {
		res.status(500).json({ message: "Error creating workout", error });
	}
};

// Update a specific workout by ID for the authenticated user
export const update = async (req, res) => {
	try {
		const user_id = req.user.id;
		const workoutId = req.params.workoutId;
		const { title, notes, date, start_time, end_time, duration, total_sets } =
			req.body;

		if (!title || typeof title !== "string") {
			throw new Error("Invalid title");
		}
		if (!notes || typeof notes !== "string") {
			throw new Error("Invalid notes");
		}
		if (!date || isNaN(Date.parse(date))) {
			throw new Error("Invalid date");
		}
		if (!start_time || isNaN(Date.parse(start_time))) {
			throw new Error("Invalid start time");
		}
		if (!end_time || isNaN(Date.parse(end_time))) {
			throw new Error("Invalid end time");
		}
		if (!duration || typeof duration !== "number") {
			throw new Error("Invalid duration");
		}
		if (!total_sets || typeof total_sets !== "number") {
			throw new Error("Invalid total sets");
		}
		if (!user_id) {
			throw new Error("User ID not found");
		}

		const workout = await Workout.findOne({
			where: { id: workoutId, user_id },
		})
			.then((workout) => {
				console.log("Workout found:", workout);
				return workout;
			})
			.catch((error) => {
				console.error("Error finding workout:", error);
				return null;
			});

		if (!workout) {
			return res.status(404).json({ message: "Workout not found" });
		}

		const updatedWorkout = await workout.update({
			id: workoutId,
			title,
			notes,
			date,
			start_time,
			end_time,
			duration,
			total_sets,
		});

		res.status(200).json(updatedWorkout);
	} catch (error) {
		// Log the error for debugging
		console.error("Error updating workout:", error);
		res.status(500).json({ message: "Error updating workout", error });
	}
};
