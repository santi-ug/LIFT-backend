import express from "express";
import userRouter from './user.roter.js';

function routerApi(app) {
    const router = express.Router();
    app.use('/v1', router);
    router.use('/users', userRouter);
}

export default routerApi;