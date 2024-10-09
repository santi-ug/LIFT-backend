import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const SingUpCheck = [ 
    body('email').trim().not().notEmpty()
    .withMessage ('this field is required').toLowerCase().isEmail().withMessage('please enter a valid email address').isLength({max: 50}), 

    body('name').trim().not().matches(" ").withMessage('No spaces allowed in the name')
    .toLowerCase().notEmpty().isString().withMessage('please enter only letters').isLength({min: 4, max: 20}), 

    body('password').trim().not().notEmpty().isLength({ min: 8, max: 50}), 
]

export const SingInCheck = [
    body('email').trim().not().notEmpty()
    .withMessage ('this field is required').toLowerCase().isEmail().withMessage('please enter a valid email address').isLength({max: 50}), 
    
    body('password').trim().not().notEmpty().isLength({ min: 8, max: 50}), 
]

export const validateRequest = (req, res, next) => {
    let errors = validationResult (req) ; 
    if ( !errors.isEmpty()) {
        console.log(errors.array());
        return res.json({errors: errors.array() });
    }
    next(); 
};

export const getByToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null; 

    console.log("Token recibido:", token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied, token missing!' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded); 
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Error de verificación del token:", error); 
        return res.status(403).json({ success: false, message: 'Invalid token' });
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
        res.status(500).json({ success: false, message: 'Error encrypting password' });
    }
};

