import models from "../database/db.js";

class WorkoutService {
	constructor() {}

	async find() {
		const res = await models.Workout.findAll();
		return res;
	}

	async findOne(id) {
		const res = await models.Workout.findByPk(id);
		return res;
	}

	async create(data) {
		const res = await models.Workout.create(data);
		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);

		if (!model) {
			throw new Error("Workout not found");
		}

		const res = await model.update(data);
		return res;
	}

	async delete(id) {
		const model = await this.findOne(id);
		await model.destroy();
		return { deleted: true };
	}
}

export default WorkoutService;
