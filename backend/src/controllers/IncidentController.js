const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const LIMIT = 5;
        const {page = 1} = req.query;
        
        const [ count ] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(LIMIT)
        .offset((page - 1) * LIMIT)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        res.header('X-Total-Count', count['count(*)']);

        return(res.json(incidents));
    },
    async create(req, res){
        const { title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return res.json({ id });
    },
    async delete(req, res){
        let retorno;

        const {id} = req.params;

        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id) //condição WHERE
            .select('ong_id') //selecionar a coluna ong_id
            .first(); //apenas o primeiro registro
        
        
        if(incident.ong_id !== ong_id){
            retorno = res.status(401).json({error: 'Operation not permitted.'});
        }

        else{
            await connection('incidents').where('id', id).delete();

            retorno = res.status(204).send();
        }

        return retorno;
    }
};