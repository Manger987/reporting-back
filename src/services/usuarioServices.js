const Sequelize     = require('sequelize');
const usuario       = require('../models').usuario;


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

exports.findByUname = async (uname) => {
    return await usuario.findAll({
        where: {
            uname: uname,
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