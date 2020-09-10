const Sequelize     = require('sequelize');
const reporte       = require('../models').reporte;
const reporte_tipo  = require('../models').reporte_tipo;
const tipo  = require('../models').tipo;

exports.create = async (reporteData) => {
    return await reporte
        .create(reporteData)
        .then(reporte => reporte)
        .catch(error => { throw new Error(error)});
}

exports.list = async () => {
    return await reporte.findAll({})
        .then(reportes => reportes)
        .catch(error => { throw new Error(error)});
}

exports.findById = async (id) => {
    return await reporte.findAll({
        where: {
            id: id,
        }
    })
    .then(reporte => reporte)
    .catch(error => { throw new Error(error)});
}

exports.update = async (reporteEdit) => {
    return await reporte.update(reporteEdit,{ where: { id: reporteEdit.id } })
    .then(reporte => reporte)
    .catch(error => { throw new Error(error)});
}

exports.destroy = async (reporteDelete) => {
    return await reporte.destroy({ where: { id: reporteDelete.id } })
    .then(reporte => reporte)
    .catch(error => { throw new Error(error)});
}

exports.createReportType = async (reporteType) => {
    return await reporte_tipo
        .create(reporteType)
        .then(reporte => reporte)
        .catch(error => { throw new Error(error)});
}

exports.DestroyReportType = async (reporteTypeDelete) => {
    return await reporte_tipo.destroy({ where: { id: reporteTypeDelete.id } })
    .then(function (deletedRecord) {
        console.log('deletedRecord', deletedRecord);
        if(deletedRecord === 1){
            return {status:200, message:"Deleted successfully"};          
        }
        else
        {
            return {status:404, message:"record not found"};
        }
    })
    .catch(function (error){
        res.status(500).json(error);
    });
}

exports.findAllReportsByType = async (reporteTipo) => {
    return await reporte_tipo.findAll({
        where: {
            tipo_id: reporteTipo.id,
        },
        include: [{
            model: reporte,
            as: 'reporte'
        },{
            model: tipo,
            as: 'tipo'
        }]
    })
    .then(reporte => reporte)
    .catch(error => { throw new Error(error)});
}
