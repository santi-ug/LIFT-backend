import models from "../database/db.js";

class VariationService {
	constructor() {}

	async find() {
		const res = await models.Variation.findAll();
		return res;
	}

	async findOne(id) {
		const res = await models.Variation.findByPk(id);
		return res;
	}

	async create(data) {
		const res = await models.Variation.create(data);
		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);

		if (!model) {
			throw new Error("Variation not found");
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

export default VariationService;
