import { get, create, getById, update, _delete, login } from '../controllers/user.controller.js';
import { SingUpCheck, validateRequest, encryptPassword } from '../middleware/user.validator.js';
import express from "express";

const router = express.Router();

router
    .get('/', get)
    .get('/:id', getById)
    .post('/login', login)
    .post('/', 
        SingUpCheck, 
        validateRequest,
        encryptPassword,
        create,
    )
    .put('/:id', update)
    .delete('/:id', _delete)

export default router;