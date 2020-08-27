const Sequelize     = require('sequelize');
const perfil       = require('../models').perfil;


exports.create = async (perfilData) => {
    return await perfil
        .create(perfilData)
        .then(perfil => perfil)
        .catch(error => { throw new Error(error)});
}

exports.list = async () => {
    return await perfil.findAll({})
        .then(perfils => perfils)
        .catch(error => { throw new Error(error)});
}

exports.findById = async (id) => {
    return await perfil.findAll({
        where: {
            id: id,
        }
    })
    .then(perfil => perfil)
    .catch(error => { throw new Error(error)});
}

exports.update = async (perfilEdit) => {
    return await perfil.update(perfilEdit,{ where: { id: perfilEdit.id } })
    .then(perfil => perfil)
    .catch(error => { throw new Error(error)});
}

exports.destroy = async (perfilDelete) => {
    return await perfil.destroy({ where: { id: perfilDelete.id } })
    .then(perfil => perfil)
    .catch(error => { throw new Error(error)});
}