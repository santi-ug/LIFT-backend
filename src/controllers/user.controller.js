import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import UserService from "../services/user.service.js";

const service = new UserService();

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required: name, email, password.",
			});
		}

		const response = await service.create({ name, email, password });
		res.status(201).json({ success: true, data: response });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, message: "Email and password are required." });
		}

		const user = await service.findByEmail(email);
		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "User not found." });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(401)
				.json({ success: false, message: "Incorrect password." });

		const token = jwt.sign(
			{ userId: user.id, email: user.email }, 
			process.env.JWT_SECRET
		);

		return res.status(200).json({ success: true, message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const get = async (req, res) => {
	try {
		const response = await service.find();
		res.status(200).json({ success: true, data: response });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getById = async (req, res) => {
	try {
		const { userId } = req.user;
		console.log(req.user);
		const response = await service.findOne(userId);
		res.json({ success: true, user: response});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const update = async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const response = await service.update(id, body);
		res.json(response);
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const _delete = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await service.delete(id);
		res.json(response);
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
