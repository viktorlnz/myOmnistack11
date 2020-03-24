const connection = require('../database/connection');
const crypto = require('crypto');

module.exports ={

    async index(req, res) {
        const ongs = await connection('ongs').select();
    
        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    const ong = {id, name, email, whatsapp, city, uf};

    console.log(ong);

    await connection('ongs').insert(ong);

    return res.json({ id });
}

};