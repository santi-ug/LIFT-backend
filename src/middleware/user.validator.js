import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

export const SingUpCheck = [ 
    body('email').trim().not().isEmpty()
    .withMessage ('this field is required').isEmail().withMessage('please enter a valid email address'),

    body('name').trim().not().isEmpty().isString().withMessage('please enter only letters').isLength({min: 4, max: 20}), 

    body('password').trim().not().isEmpty().isLength({ min: 8}), 
]

export const validateRequest = (req, res, next) => {
    let errors = validationResult (req) ; 
    if ( !errors.isEmpty()) {
        console.log(errors.array());
        return res.json({errors: errors.array() });
    }
    next(); 
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

