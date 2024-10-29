import express from "express";
import {
	_delete,
	get,
	getById,
	login,
	logout,
	register,
	removeImage,
	update,
	updateImage,
} from "../controllers/user.controller.js";
import {
	encryptPassword,
	SingUpCheck,
	validateRequest,
	SingInCheck, 
	getByToken,
} from "../middlewares/user.validator.js";

const router = express.Router();

router
	.get("/", get)
	.get("/me", getByToken, getById)
	.post("/login", SingInCheck, validateRequest, login)
	.post("/register", SingUpCheck, validateRequest, encryptPassword, register)
	.put("/myImage", getByToken, updateImage)
	.delete("/myImage", getByToken, removeImage)
	.post("/logout", getByToken, logout)
	.put("/me", getByToken, encryptPassword, update)
	.delete("/me", getByToken, _delete)

export default router;
