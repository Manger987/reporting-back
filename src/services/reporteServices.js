const sequelize = require('sequelize');
const reporte = require('../models').reporte;
const reporte_tipo = require('../models').reporte_tipo;
const reporte_archivo = require('../models').reporte_archivo;
const usuario_reporte = require('../models').usuario_reporte;
const tipo = require('../models').tipo;

exports.create = async (reporteData) => {
    return await reporte
        .create(reporteData,{
            include: [{
                model: reporte_archivo,
                as: 'reporte_archivo'
            },
            {
                model: reporte_tipo,
                as: 'reporte_tipo'
            }]
        })
        .then(async reporte => {
            const fileSaved = [];
            await reporte.reporte_archivo.map(file => {
                fileSaved.push(file.dataValues);
            })
            reporte.dataValues.reporte_archivo = fileSaved;
            return reporte;
        })
        .catch(error => { throw new Error(error) });
}

exports.list = async () => {
    return await reporte.findAll({
        where: { activo: 1 }
    })
        .then(reportes => reportes)
        .catch(error => { throw new Error(error) });
}

exports.findById = async (id) => {
    return await reporte.findAll({
        where: {
            id: id,
        }
    })
        .then(reporte => reporte)
        .catch(error => { throw new Error(error) });
}

exports.update = async (reporteEdit) => {
    return await reporte.update(reporteEdit, { where: { id: reporteEdit.id } })
        .then(reporte => reporte)
        .catch(error => { throw new Error(error) });
}

exports.destroy = async (reporteDelete) => {
    return await reporte.destroy({ where: { id: reporteDelete.id } })
        .then(reporte => reporte)
        .catch(error => { throw new Error(error) });
}

exports.createReportType = async (reporteType) => {
    return await reporte_tipo
        .create(reporteType)
        .then(reporte => reporte)
        .catch(error => { throw new Error(error) });
}

exports.DestroyReportType = async (reporteTypeDelete) => {
    return await reporte_tipo.destroy({ where: { id: reporteTypeDelete.id } })
        .then(function (deletedRecord) {
            console.log('deletedRecord', deletedRecord);
            if (deletedRecord === 1) {
                return { status: 200, message: "Deleted successfully" };
            }
            else {
                return { status: 404, message: "record not found" };
            }
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

exports.findAllReportsByType = async (data) => {
    const { type_id, user_id } = data;
    if (type_id === null) throw ("no viene tipo especificado");
    return await reporte
        .findAll({
            where: { activo: 1 },
            attributes: [
                'id', 'nombre', 'descripcion', 'url', 'vista_reporte', 'fecha_visualizacion', 'usuario_creador', 'archivo', 'createdAt', 'updatedAt',
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
                    model: reporte_tipo, as: 'reporte_tipo',
                    where: {
                        tipo_id: type_id,
                    }
                }, 
                { model: reporte_archivo, as: 'reporte_archivo' }
            ]
        })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
}

exports.create_reporte_archivo = async (reporteData) => {
        await reporte_archivo
            .bulkCreate(reporteData)
            .then(reporteArchivo => {
                reporteArchivo.dataValues
            })
            .catch(error => { throw new Error(error) });
}

exports.destroy_reporte_archivo = async (reporteDelete) => {
    return await reporte_archivo.destroy({ where: { id: reporteDelete.id } })
        .then(reporte => reporte)
        .catch(error => { throw new Error(error) });
}

exports.findAllForeignsReports = async () => {
    return await reporte.findAll({
        where: { vista_reporte: 1 },
        include: [
            { model: reporte_tipo, as: 'reporte_tipo' },
            { model: reporte_archivo, as: 'reporte_archivo' }
        ]
    })
    .then(reporte => reporte)
    .catch(error => { throw new Error(error) });
}
