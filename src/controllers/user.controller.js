import UserService from '../services/user.service.js';

const service = new UserService();

export const create = async( req, res ) => {
    try{
        const { name, email, password } = req.body;
        const response = await service.create(req.body);
        res.json({ success: true, data: response});
    }catch (error){
        res.status(500).send({ success: false, message: error.message });
    }
}

export const getById = async( req, res ) => {
    try{
        const { id } = req.params; 
        const response = await service.findOne(id);
        res.json( response );
    }catch (error){
        res.status(500).send({ success: false, message: error.message });
    }
}

export const update = async( req, res ) => {
    try{
        const { id } = req.params; 
        const body = req.body;
        const response = await service.update(id, body);
        res.json( response );
    }catch (error){
        res.status(500).send({ success: false, message: error.message });
    }
}

export const _delete = async( req, res ) => {
    try{
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json( response );
    }catch (error){
        res.status(500).send({ success: false, message: error.message });
    }
}
