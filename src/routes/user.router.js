import express from "express";
import {
	_delete,
	get,
	getById,
	login,
	register,
	update,
} from "../controllers/user.controller.js";
import {
	encryptPassword,
	SingUpCheck,
	validateRequest,
} from "../middlewares/user.validator.js";

const router = express.Router();

router
	.get("/", get)
	.get("/:id", getById)
	.post("/login", login)
	.post("/register", SingUpCheck, validateRequest, encryptPassword, register)
	.put("/:id", update)
	.delete("/:id", _delete);

export default router;
