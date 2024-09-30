import express from "express";
import {
	_delete,
	create,
	get,
	getById,
	login,
	update,
} from "../controllers/user.controller.js";
import {
	encryptPassword,
	SingUpCheck,
	validateRequest,
} from "../middleware/user.validator.js";

const router = express.Router();

router
	.get("/", get)
	.get("/:id", getById)
	.post("/login", login)
	.post("/", SingUpCheck, validateRequest, encryptPassword, create)
	.put("/:id", update)
	.delete("/:id", _delete);

export default router;
