
const ldap = require("ldapjs");
const jwt = require('jsonwebtoken');
const TipoService = require("../services/tipoServices");
const sistemServices = require("../services/sistemServices");
const config = require("./../config/config.json");

module.exports = {
 async create(req, res) {
     try{
        const tipo = { tipo_id, descripcion_tipo, nombre } = req.body;
        const tipoCreated = await TipoService.create(tipo)
        res.status(200).send(tipoCreated.dataValues);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async list(req, res) {
    try{
        const tipos = await TipoService.list();
        res.status(200).send(tipos);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async find (req, res) {
    try{
        const tipo = await TipoService.findById(req.params.id); //req.params
        res.status(200).send(tipo);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async update (req, res) {
    try{
        const tipo = { tipo_id, descripcion_tipo, nombre, id } = req.body;
        const tipoUpdet = await TipoService.update(tipo); //req.params
        res.status(200).send(tipoUpdet);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async delete (req, res) {
    try{
        const tipo = { id } = req.params;
        const tipoDeleted = await TipoService.destroy(tipo); //req.params
        res.sendStatus(200).send(tipoDeleted);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async getTypesAreas(req, res) {
    try {
        const reporte = await TipoService.getTypesAreas();
        res.status(200).send(reporte);
    } catch (error) {
        console.error("ERROR getTypesAreas:", error);
        res.status(400).send(error);
    }
},
};