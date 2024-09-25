import express from "express";
import { create, getById, update, _delete } from '../controllers/user.controller.js';

const router = express.Router();

router
    .get('/:id', getById)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', _delete)

export default router;