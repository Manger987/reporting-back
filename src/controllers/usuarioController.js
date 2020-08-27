
const UsuarioService = require("../services/usuarioServices");
module.exports = {
 async create(req, res) {
     try{
        const usuario = { nombre, apellido_paterno, apellido_materno, uname } = req.body;
        const usuarioCreated = await UsuarioService.create(usuario)
        res.status(200).send(usuarioCreated.dataValues);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async list(req, res) {
    try{
        const usuarios = await UsuarioService.list();
        res.status(200).send(usuarios);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
 },
 async find (req, res) {
    try{
        const usuario = await UsuarioService.findByUname(req.params.uname); //req.params
        res.status(200).send(usuario);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async update (req, res) {
    try{
        const usuario = { nombre, apellido_paterno, apellido_materno, uname, id } = req.body;
        const userUpdet = await UsuarioService.update(usuario); //req.params
        res.status(200).send(userUpdet);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async delete (req, res) {
    try{
        const usuario = { id } = req.params;
        const userDeleted = await UsuarioService.destroy(usuario); //req.params
        res.sendStatus(200).send(userDeleted);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
};