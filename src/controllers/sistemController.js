const jwt = require('jsonwebtoken');
const config = require("./../config/config.json").secret;
module.exports = {
    async AuthSaveRoutes(req, res, next) {
        const token = req.headers['access-token'];
        if (token) {
            jwt.verify(token, config, (err, decoded) => {
                if (err) {
                    return res.json({ mensaje: 'Token inválida' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.send({
                mensaje: 'Token no proveída.'
            });
        }
    }
}    