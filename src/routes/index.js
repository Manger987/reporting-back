/* Controllers */
const usuarioController = require('../controllers/usuarioController');
const reporteController = require('./../controllers/reporteController');
const perfilController = require('./../controllers/perfilController');
const rolController = require('./../controllers/rolController');
module.exports = (app) => {
   app.get('/', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   //Usuario
   app.post('/usuario/create', usuarioController.create);
   app.post('/usuario/update', usuarioController.update);
   app.get('/usuario/list', usuarioController.list);
   app.get('/usuario/find/:uname', usuarioController.find);
   app.get('/usuario/delete/:id', usuarioController.delete);
   //Reporte
   app.post('/reporte/create', reporteController.create);
   app.post('/reporte/update', reporteController.update);
   app.get('/reporte/list', reporteController.list);
   app.get('/reporte/find/:id', reporteController.find);
   app.get('/reporte/delete/:id', reporteController.delete);
   //Reporte/report_type
   app.post('/reporte/reportAssignsType', reporteController.reportAssignsType);
   app.get('/reporte/reportTypeDestroy/:id', reporteController.reportTypeDestroy);
   app.get('/reporte/findAllReportsByType/:id', reporteController.findAllReportsByType);
   //Perfil
   app.post('/perfil/create', perfilController.create);
   app.post('/perfil/update', perfilController.update);
   app.get('/perfil/list', perfilController.list);
   app.get('/perfil/find/:id', perfilController.find);
   app.get('/perfil/delete/:id', perfilController.delete);
   //Rol
   app.post('/rol/create', rolController.create);
   app.post('/rol/update', rolController.update);
   app.get('/rol/list', rolController.list);
   app.get('/rol/find/:id', rolController.find);
   app.get('/rol/delete/:id', rolController.delete);
   
};