const { Op } = require("sequelize");
const sequelize     = require('sequelize');
const usuario_reporte = require("../models").usuario_reporte;
const usuario = require("../models").usuario;
const reporte = require("../models").reporte;
const reporte_tipo = require("../models").reporte_tipo;

exports.create = async (usuarioData) => {
    return await usuario_reporte
        .create(usuarioData)
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.list = async () => {
    return await usuario_reporte
        .findAll({})
        .then((usuarios) => usuarios)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.findById = async (id) => {
    return await usuario_reporte
        .findAll({
            where: {
                id: id,
            },
        })
        .then((usuarioReporte) => usuarioReporte)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.findByUserAndReporte = async (usuario_id, reporte_id) => {
    return await usuario_reporte
        .findOne({
            where: {
                usuario_id: usuario_id,
                reporte_id: reporte_id
            },
        })
        .then((usuarioReporte) => usuarioReporte)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.update = async (usuarioEdit) => {
    return await usuario_reporte
        .update(usuarioEdit, { where: { id: usuarioEdit.id } })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.destroy = async (usuarioDelete) => {
    return await usuario_reporte
        .destroy({ where: { id: usuarioDelete.id } })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.listReportsViewed = async (usuario_id) => {
    return await reporte
        .findAll({
            attributes:[
                'id','nombre','descripcion', 'url','vista_reporte','fecha_visualizacion','usuario_creador','archivo','createdAt','updatedAt',
                [
                    sequelize.literal(`(
                        SELECT favorito
                        FROM usuario_reportes AS usuario_reporte
                        WHERE
                            usuario_reporte.usuario_id = ${usuario_id}
                            AND
                            usuario_reporte.reporte_id = reporte.id
                    )`),
                    'favorito'
                ]
            ],
            include: [
                {
                    model: usuario_reporte,
                    where: {
                        [Op.and]: [
                            { usuario_id: usuario_id },
                            { updatedAt: { [Op.ne]: null } }, //where updatedAt != null
                        ],
                    },
                    order: [[usuario_reporte, "updated_at", "desc"]],
                },
            ],
            limit: 10,
        })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.listReportsByUser = async (usuario_id) => {
    return await reporte
        .findAll({
            attributes:[
                'id','nombre','descripcion', 'url','vista_reporte','fecha_visualizacion','usuario_creador','archivo','createdAt','updatedAt',
                [
                    sequelize.literal(`(
                        SELECT favorito
                        FROM usuario_reportes AS usuario_reporte
                        WHERE
                            usuario_reporte.usuario_id = ${usuario_id}
                            AND
                            usuario_reporte.reporte_id = reporte.id
                    )`),
                    'favorito'
                ]
            ],
            include: [
                {
                    model: usuario_reporte,
                    where: {
                        usuario_id: usuario_id,
                    },
                },
            ],
        })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.listReportsFavorites = async (usuario_id) => {
    return await reporte
        .findAll({
            attributes:[
                'id','nombre','descripcion', 'url','vista_reporte','fecha_visualizacion','usuario_creador','archivo','createdAt','updatedAt',
                [
                    sequelize.literal(`(
                        SELECT favorito
                        FROM usuario_reportes AS usuario_reporte
                        WHERE
                            usuario_reporte.usuario_id = ${usuario_id}
                            AND
                            usuario_reporte.reporte_id = reporte.id
                    )`),
                    'favorito'
                ]
            ],
            include: [
                {
                    model: usuario_reporte,
                    where: {
                        usuario_id: usuario_id,
                        favorito: 1,
                    },
                },
            ],
        })
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};

exports.listReportsByTypeAndUser = async (usuario_id, tipo_id = null) => {

    let consulta = {
        include: [
            {
                model: usuario_reporte,
                where: {
                    usuario_id: usuario_id,
                },
            }
        ],
    };

    if (tipo_id && parseInt(tipo_id) !== null) {
        consulta.include.push({
            model: reporte_tipo,
            where: {
                tipo_id: tipo_id,
            }
        });
    }

    return await reporte
        .findAll(consulta)
        .then((usuario) => usuario)
        .catch((error) => {
            throw new Error(error);
        });
};
