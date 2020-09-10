const Sequelize     = require('sequelize');
const usuario       = require('../models').usuario;
const usuario_tipo_perfil       = require('../models').usuario_tipo_perfil;

exports.create = async (usuarioData) => {
    return await usuario
        .create(usuarioData)
        .then(usuario => usuario)
        .catch(error => { throw new Error(error)});
}

exports.list = async () => {
    return await usuario.findAll({})
        .then(usuarios => usuarios)
        .catch(error => { throw new Error(error)});
}

exports.findByUsername = async (username) => {
    return await usuario.findAll({
        where: {
            username: username,
        }
    })
    .then(usuario => usuario)
    .catch(error => { throw new Error(error)});
}

exports.update = async (usuarioEdit) => {
    return await usuario.update(usuarioEdit,{ where: { id: usuarioEdit.id } })
    .then(usuario => usuario)
    .catch(error => { throw new Error(error)});
}

exports.destroy = async (usuarioDelete) => {
    return await usuario.destroy({ where: { id: usuarioDelete.id } })
    .then(usuario => usuario)
    .catch(error => { throw new Error(error)});
}

exports.loggin = async (username, password) => {
    dataReturn = {};
    const user = await usuario.findOne({
        include: [
            {
                model: usuario_tipo_perfil
            },
        ], 
        where: { username: username } 
    }).then((userReturn) => userReturn);
    if (!user) { //sino encuentra usuario lo crea
        usuario.create({username, password}).then((userCreated) => { 
            dataReturn.code = 200
            dataReturn.data = userCreated.dataValues;    
        });
    } else if (!user.validPassword(password)) {
        dataReturn.code = 204
        dataReturn.message = "Password incorrecto";
    } else {
        dataReturn.code = 200
        dataReturn.data = user.dataValues;
    }
    return dataReturn;
}
