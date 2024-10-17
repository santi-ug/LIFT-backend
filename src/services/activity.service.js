import models from "../database/db.js";

class ActivityService {
	constructor() {}

	async find() {
		const res = await models.Activity.findAll();
		return res;
	}

	async findOne(id) {
		const res = await models.Activity.findByPk(id);
		return res;
	}

	async create(data) {
		const res = await models.Activity.create(data);
		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);

		if (!model) {
			throw new Error("Activity not found");
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

export default ActivityService;
