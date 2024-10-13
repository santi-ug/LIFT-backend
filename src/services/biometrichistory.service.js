import models from "../database/db.js";

class BiometricHistoryService {
	constructor() {}

	async find() {
		const res = await models.BiometricHistory.findAll();
		return res;
	}

	async findOne(id) {
		const res = await models.BiometricHistory.findByPk(id);
		return res;
	}

	async create(data) {
		const res = await models.BiometricHistory.create(data);
		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);

		if (!model) {
			throw new Error("BiometricHistory not found");
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

export default BiometricHistoryService;
