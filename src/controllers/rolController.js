
const RolService = require("../services/rolServices");
module.exports = {
 async create(req, res) {
     try{
        const Data = { rol, edita, activo, createdAt } = req.body;
        const perfilCreated = await RolService.create(Data)
        res.status(200).send(perfilCreated.dataValues);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async list(req, res) {
    try{
        const perfils = await RolService.list();
        res.status(200).send(perfils);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async find (req, res) {
    try{
        const perfil = await RolService.findById(req.params.id); //req.params
        res.status(200).send(perfil);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async update (req, res) {
    try{
        const perfilData = { rol ,edita ,activo, id } = req.body;
        perfilData.updatedAt = Date();
        const perfilmodified = await RolService.update(perfilData); //req.params
        res.status(200).send(perfilmodified);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async delete (req, res) {
    try{
        const perfil = { id } = req.params;
        const userDeleted = await RolService.destroy(perfil); //req.params
        res.sendStatus(200).send(userDeleted);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
};