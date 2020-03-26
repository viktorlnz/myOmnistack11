const connection = require('../database/connection');

//Controller para login do usuário da aplicação
module.exports = {
    async create(req, res){
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        let retorno;

        if (!ong){
            retorno = res.status(400).json({error: 'No ONG found with this ID'});
        }

        else{
            retorno = res.json(ong);
        }

        return retorno;
    }
};