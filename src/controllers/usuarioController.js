
const ldap = require("ldapjs");
const jwt = require('jsonwebtoken');
const UsuarioService = require("../services/usuarioServices");
const sistemServices = require("../services/sistemServices");
const config = require("./../config/config.json");

module.exports = {
 async create(req, res) {
     try{
        const usuario = { nombre, apellido_paterno, apellido_materno, username } = req.body;
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
        const usuario = await UsuarioService.findByUsername(req.params.username); //req.params
        res.status(200).send(usuario);
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },
  async update (req, res) {
    try{
        const usuario = { nombre, apellido_paterno, apellido_materno, username, id } = req.body;
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
  },async connectLoggin (req, res) {
    try{
        const { username, password } = req.body ? req.body : req.params;
        console.log(username);
        const client = ldap.createClient({
            url: config.conectionActiveDirectory.url
        });
        client.bind(username, password, function(err) {
            if (err) {
                console.log("ERROR in connection:",err)
                res.status(500).send(err.message);
            }else{
                console.log("success log");
                res.status(200).send('OK');
            }
        })
        
    } catch (error) {
        console.error("ERROR:",error);
        res.status(400).send(error);
    }
  },async loggin (req, res) {
    try{
        let { username, password } = req.body;
        const AuthLogin = await sistemServices.loginActiveDirectory(username, password).then((dataReturn) => dataReturn);
        if(AuthLogin.code === 200) {
            //creacion usuario
            const user = await UsuarioService.loggin(username, password);
            console.log(user);
            if(user.code === 200)
                user.data.token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '24h' });//1d
            
            res.send(user);
        }
    } catch (error) {
        console.error("ERROR:",error);
        res.send(error);
    }
  }
};