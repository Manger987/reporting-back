const sequelize     = require('sequelize');
const reporte       = require('../models').reporte;
const reporte_tipo  = require('../models').reporte_tipo;
const usuario_reporte  = require('../models').usuario_reporte;
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

exports.findAllReportsByType = async (data) => {
    const {type_id, user_id } = data;
    if(type_id === null) throw("no viene tipo especificado");
    return await reporte
        .findAll({
            attributes:[
                'id','nombre','descripcion', 'url','vista_reporte','fecha_visualizacion','usuario_creador','archivo','createdAt','updatedAt',
                [
                    sequelize.literal(`(
                        SELECT favorito
                        FROM usuario_reportes AS usuario_reporte
                        WHERE
                            usuario_reporte.usuario_id = ${user_id}
                            AND
                            usuario_reporte.reporte_id = reporte.id
                    )`),
                    'favorito'
                ]
            ],
            include: [
                {
                    model: reporte_tipo,
                    where: {
                        tipo_id: type_id,
                    }
                }
            ]
        })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
}
