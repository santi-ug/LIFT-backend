import models from "../database/db.js";

class ExerciseService {
	constructor() {}

	async find() {
		const res = await models.Exercise.findAll();
		return res;
	}

	async findOne(id) {
		const res = await models.Exercise.findByPk(id);
		return res;
	}

	async create(data) {
		const res = await models.Exercise.create(data);
		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);

		if (!model) {
			throw new Error("Exercise not found");
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

export default ExerciseService;
