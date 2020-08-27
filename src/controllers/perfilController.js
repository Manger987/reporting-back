
const PerfilService = require("../services/perfilServices");
module.exports = {
 async create(req, res) {
     try{
        const Data = { perfil, activo, createdAt } = req.body;
        console.log("CONTROLL",perfil);
        const perfilCreated = await PerfilService.create(Data)
        res.status(200).send(perfilCreated.dataValues);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async list(req, res) {
    try{
        const perfils = await PerfilService.list();
        res.status(200).send(perfils);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async find (req, res) {
    try{
        const perfil = await PerfilService.findById(req.params.id); //req.params
        res.status(200).send(perfil);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async update (req, res) {
    try{
        const perfilData = { perfil, activo, id } = req.body;
        perfilData.updatedAt = Date();
        const perfilmodified = await PerfilService.update(perfilData); //req.params
        res.status(200).send(perfilmodified);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async delete (req, res) {
    try{
        const perfil = { id } = req.params;
        const userDeleted = await PerfilService.destroy(perfil); //req.params
        res.sendStatus(200).send(userDeleted);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
};