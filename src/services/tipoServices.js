const Sequelize     = require('sequelize');
const tipo       = require('../models').tipo;

exports.create = async (tipoData) => {
    return await tipo
        .create(tipoData)
        .then(tipo => tipo)
        .catch(error => { throw new Error(error)});
}

exports.list = async () => {
    return await tipo.findAll({})
        .then(tipos => tipos)
        .catch(error => { throw new Error(error)});
}

exports.findById = async (id) => {
    return await tipo.findAll({
        where: {
            id: id,
        }
    })
    .then(tipo => tipo)
    .catch(error => { throw new Error(error)});
}

exports.update = async (tipoEdit) => {
    return await tipo.update(tipoEdit,{ where: { id: tipoEdit.id } })
    .then(tipo => tipo)
    .catch(error => { throw new Error(error)});
}

exports.destroy = async (tipoDelete) => {
    return await tipo.destroy({ where: { id: tipoDelete.id } })
    .then(tipo => tipo)
    .catch(error => { throw new Error(error)});
}
