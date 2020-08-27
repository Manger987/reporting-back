
const reporteService = require("../services/reporteServices");
module.exports = {
 async create(req, res) {
     try{
        console.log("ENTREEE:",req.body);
        const reporte = { nombre, apellido_paterno, apellido_materno, uname } = req.body;
        const reporteCreated = await reporteService.create(reporte)
        console.log('reporteCreated:',reporteCreated.dataValues);
        res.status(200).send(reporteCreated.dataValues);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async list(req, res) {
    try{
        const reportes = await reporteService.list();
        res.status(200).send(reportes);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async find (req, res) {
    try{
        const reporte = await reporteService.findById(req.params.id); //req.params
        res.status(200).send(reporte);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async update (req, res) {
    try{
        const reporte = { id,nombre,descripcion,url,vista_reporte,fecha_visualizacion,usuario_creador,archivo,updatedAt } = req.body;
        reporte.updatedAt = Date();
        const userUpdet = await reporteService.update(reporte); //req.params
        res.status(200).send(userUpdet);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async delete (req, res) {
    try{
        const reporte = { id } = req.params;
        const userDeleted = await reporteService.destroy(reporte); //req.params
        res.sendStatus(200).send(userDeleted);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async reportAssignsType (req, res) {
    try{
        const reporte = await reporteService.createReportType(req.body); //req.params
        res.status(200).send(reporte);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async reportTypeDestroy (req, res) {
    try{
        const idReportType = { id } = req.params;
        const reporte = await reporteService.DestroyReportType(idReportType); //req.params
        res.status(200).send(reporte);    
    } catch {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async findAllReportsByType (req, res) {
    try{
        const idtType = { id } = req.params;
        const reporte = await reporteService.findAllReportsByType(idtType); //req.params
        res.status(200).send(reporte);    
    } catch(error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  }
};