const Sequelize     = require('sequelize');
const usuario_reporte = require('../models').usuario_reporte;


exports.create = async (usuarioData) => {
    return await usuario_reporte
        .create(usuarioData)
        .then(usuario => usuario)
        .catch(error => { throw new Error(error)});
}

exports.list = async () => {
    return await usuario_reporte.findAll({})
        .then(usuarios => usuarios)
        .catch(error => { throw new Error(error)});
}

exports.findByUname = async (uname) => {
    return await usuario_reporte.findAll({
        where: {
            uname: uname,
        }
    })
    .then(usuario => usuario)
    .catch(error => { throw new Error(error)});
}

exports.update = async (usuarioEdit) => {
    return await usuario_reporte.update(usuarioEdit,{ where: { id: usuarioEdit.id } })
    .then(usuario => usuario)
    .catch(error => { throw new Error(error)});
}

exports.destroy = async (usuarioDelete) => {
    return await usuario_reporte.destroy({ where: { id: usuarioDelete.id } })
    .then(usuario => usuario)
    .catch(error => { throw new Error(error)});
}