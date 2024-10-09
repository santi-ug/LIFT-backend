import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
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

		const token = jwt.sign(
			{ userId: response.id, email: response.email },
			process.env.JWT_SECRET
		);

		res.status(201).json({ success: true, data: response, token });
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

		return res
			.status(200)
			.json({ success: true, message: "Login successful", token });
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
		res.json({ success: true, user: response });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const update = async (req, res) => {
	try {
		const { userId } = req.user;
		const { name, email, password } = req.body;

		const response = await service.update(userId, { name, email, password });
		res.status(200).json({ success: true, data: response });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("avatar");

export const updateImage = async (req, res) => {
	console.log("hola aqui");
	upload(req, res, async function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json({ success: false, message: err.message });
		} else if (err) {
			return res.status(500).json({ success: false, message: err.message });
		}

		if (!req.file || !req.file.buffer) {
			return res
				.status(400)
				.json({
					success: false,
					message: "No file uploaded or file is invalid.",
				});
		}

		try {
			const { userId } = req.user;
			const avatar = req.file.buffer;

			const response = await service.update(userId, { avatar });

			return res.status(200).json({
				success: true,
				message: "Profile image updated successfully",
				user: {
					id: response.id,
					name: response.name,
					email: response.email,
					avatar: response.avatar.toString("base64"),
					createdAt: response.createdAt,
					updatedAt: response.updatedAt,
				},
			});
		} catch (error) {
			res.status(500).json({ success: false, message: error.message });
		}
	});
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

export const logout = async (req, res) => {
	try {
		const decoded = req.user;

		if (!decoded) {
			return res
				.status(401)
				.json({ success: false, message: "Access denied, token missing!" });
		}

		req.session = null;
		res
			.status(200)
			.json({ success: true, message: "Sesión cerrada con éxito" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
