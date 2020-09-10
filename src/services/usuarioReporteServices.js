const { Op } = require("sequelize");
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

exports.findByUname = async (uname) => {
    return await usuario_reporte
        .findAll({
            where: {
                uname: uname,
            },
        })
        .then((usuario) => usuario)
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
    /*return await usuario_reporte.findAll({
          where: {
              usuario_id: usuario_id,
              updatedAt:{
                  [Op.or]: {
                      [Op.not] : '0000-00-00 00:00:00',
                      [Op.not] : null
                  }
              }
          },
          include: [{
              model: usuario,
              as: 'usuario'
          },{
              model: reporte,
              as: 'reporte'
          }]
      })
      .then(reporte => reporte)
      .catch(error => { throw new Error(error)});*/
};

exports.listReportsByUser = async (usuario_id) => {
    return await reporte
        .findAll({
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
