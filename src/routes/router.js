import express from "express";
import userRouter from "./user.router.js";

function routerApi(app) {
	const router = express.Router();
	app.use("/api/v1", router);

	router.use("/users", userRouter);
}

export default routerApi;
