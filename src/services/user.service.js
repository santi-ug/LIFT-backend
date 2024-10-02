import models from "../database/db.js";

class UserService {
	constructor() {}

	async find() {
		const res = await models.User.findAll();
		return res;
	}

	async findByEmail(email) {
		const res = await models.User.findOne({ where: { email } });
		return res;
	}

	async findOne(id) {
		const res = await models.User.findByPk(id);
		return res;
	}

	async create(data) {
		const res = await models.User.create(data);
		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);

		if (!model) {
			throw new Error('User not found');
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

export default UserService;
