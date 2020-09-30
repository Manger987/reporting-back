
const reporte_archivo = require("../models/reporte_archivo");
const reporteService = require("../services/reporteServices");
const usuarioReporteService = require("../services/usuarioReporteServices");
module.exports = {
    async create(req, res) {
        try {
            const reporteCreated = await reporteService.create(req.body);
            res.status(200).send(reporteCreated.dataValues);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async list(req, res) {
        try {
            const reportes = await reporteService.list();
            res.status(200).send(reportes);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async find(req, res) {
        try {
            const reporte = await reporteService.findById(req.params.id); //req.params
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async update(req, res) {
        try {
            const reporte = { id, nombre, descripcion, url, vista_reporte, fecha_visualizacion, usuario_creador, archivo, updatedAt } = req.body;
            reporte.updatedAt = Date();
            const userUpdet = await reporteService.update(reporte); //req.params
            console.log("UPDATEDDD;;", userUpdet);
            res.status(200).send(userUpdet);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async delete(req, res) {
        try {
            const reporte = { id } = req.params;
            reporte.activo = false;
            const userDeleted = await reporteService.update(reporte); //req.params
            res.sendStatus(200).send(userDeleted);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async reportAssignsType(req, res) {
        try {
            const reporte = await reporteService.createReportType(req.body); //req.params
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async reportTypeDestroy(req, res) {
        try {
            const idReportType = { id } = req.params;
            const reporte = await reporteService.DestroyReportType(idReportType); //req.params
            res.status(200).send(reporte);
        } catch {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async findAllReportsByType(req, res) {
        try {
            const reporte = await reporteService.findAllReportsByType(req.params); //req.params
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async listReportsViewed(req, res) {
        try {
            const usuario_id = req.params.id;
            const reporte = await usuarioReporteService.listReportsViewed(usuario_id); //req.params
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async listReportsByUser(req, res) {
        try {
            const usuario_id = req.params.id;
            const reporte = await usuarioReporteService.listReportsByUser(usuario_id);
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async listReportsFavorites(req, res) {
        try {
            const usuario_id = req.params.id;
            const reporte = await usuarioReporteService.listReportsFavorites(usuario_id); //req.params
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async listReportsByTypeAndUser(req, res) {
        try {
            const { usuario_id, tipo_id } = req.params;
            const reporte = await usuarioReporteService.listReportsByTypeAndUser(usuario_id, tipo_id); //req.params
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
    async addFavorite(req, res) {
        try {
            const { usuario_id, reporte_id } = req.body;
            if (!(usuario_id) || !(reporte_id)) throw ("Error: Faltan parametros de entrada:usuario,reporte");
            const existUserReport = await usuarioReporteService.findByUserAndReporte(usuario_id, reporte_id);
            let reporte;
            if (existUserReport && existUserReport.id) {
                //update
                req.body.favorito = !existUserReport.favorito;
                reporte = await usuarioReporteService.update({ ...req.body, id: existUserReport.id });
            } else {
                //create
                reporte = await usuarioReporteService.create(req.body);
            }
            res.status(200).send(reporte);
        } catch (error) {
            console.error("ERROR:", error);
            res.status(400).send(error);
        }
    },
};