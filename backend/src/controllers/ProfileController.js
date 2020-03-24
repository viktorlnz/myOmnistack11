const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
                .where('ong_id', ong_id)
                .select('*');

        console.log(ong_id);
        console.log(incidents);

        return res.json(incidents);
    }
};