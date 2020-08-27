const Sequelize     = require('sequelize');
const rol       = require('../models').rol;


exports.create = async (rolData) => {
    return await rol
        .create(rolData)
        .then(rol => rol)
        .catch(error => { throw new Error(error)});
}

exports.list = async () => {
    return await rol.findAll({})
        .then(rols => rols)
        .catch(error => { throw new Error(error)});
}

exports.findById = async (id) => {
    return await rol.findAll({
        where: {
            id: id,
        }
    })
    .then(rol => rol)
    .catch(error => { throw new Error(error)});
}

exports.update = async (rolEdit) => {
    return await rol.update(rolEdit,{ where: { id: rolEdit.id } })
    .then(rol => rol)
    .catch(error => { throw new Error(error)});
}

exports.destroy = async (rolDelete) => {
    return await rol.destroy({ where: { id: rolDelete.id } })
    .then(rol => rol)
    .catch(error => { throw new Error(error)});
}