import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import models from "../database/db.js"; // Import initialized models
const { User } = models; // Extract the User model from the models object

export const SingUpCheck = [
	body("email")
		.trim()
		.not()
		.notEmpty()
		.withMessage("this field is required")
		.toLowerCase()
		.isEmail()
		.withMessage("please enter a valid email address")
		.isLength({ max: 50 }),

	body("name")
		.trim()
		.not()
		.matches(" ")
		.withMessage("No spaces allowed in the name")
		.toLowerCase()
		.notEmpty()
		.isString()
		.withMessage("please enter only letters")
		.isLength({ min: 4, max: 20 }),

	body("password").trim().not().notEmpty().isLength({ min: 8, max: 50 }),
];

export const SingInCheck = [
	body("email")
		.trim()
		.not()
		.notEmpty()
		.withMessage("this field is required")
		.toLowerCase()
		.isEmail()
		.withMessage("please enter a valid email address")
		.isLength({ max: 50 }),

	body("password").trim().not().notEmpty().isLength({ min: 8, max: 50 }),
];

export const validateRequest = (req, res, next) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.json({ errors: errors.array() });
	}
	next();
};

export const getByToken = async (req, res, next) => {
	try {
		// Get token from headers
		const authHeader = req.headers["authorization"];
		const token = authHeader ? authHeader.split(" ")[1] : null;
		console.log("Token:", token);

		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Access denied, token missing!" });
		}

		// Verify Token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ message: "Invalid token." });
		}
		console.log("Decoded token:", decoded);

		// Find the user associated with the token
		const user = await User.findByPk(decoded.userId); // Assumes JWT contains the userId
		console.log("User:", user);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		// Attach the user object to the request
		req.user = user;

		// req.user = decoded;

		next();
	} catch (error) {
		console.error("Error verifying token:", error);
		res.status(500).json({ message: "Failed to authenticate token.", error });
	}
};

export const encryptPassword = async (req, res, next) => {
	try {
		if (req.body.password) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			req.body.password = hashedPassword;
		}
		next();
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: "Error encrypting password" });
	}
};
