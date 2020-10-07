
/* Controllers */
const usuarioController = require('../controllers/usuarioController');
const reporteController = require('./../controllers/reporteController');
const perfilController = require('./../controllers/perfilController');
const rolController = require('./../controllers/rolController');
const tipoController = require('./../controllers/tipoController');
const sistemController = require('./../controllers/sistemController');
const AuthSaveRoutes = require('./../controllers/sistemController').AuthSaveRoutes;
module.exports = (app) => {
   app.get('/', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   //Usuario
   app.post('/usuario/create', usuarioController.create);
   app.post('/usuario/update', usuarioController.update);
   app.get('/usuario/list', usuarioController.list);
   app.get('/usuario/find/:username', usuarioController.find);
   app.get('/usuario/delete/:id', usuarioController.delete);
   app.post('/usuario/connectLoggin', usuarioController.connectLoggin);
   app.post('/usuario/loggin', usuarioController.loggin);
   //Reporte
   app.post('/reporte/create', reporteController.create);
   app.post('/reporte/update', reporteController.update);
   app.post('/reporte/addFavorite', reporteController.addFavorite);
   app.get('/reporte/list', AuthSaveRoutes, reporteController.list);
   app.get('/reporte/find/:id', reporteController.find);
   app.get('/reporte/delete/:id', reporteController.delete);
   //Reporte/report_type
   app.post('/reporte/reportAssignsType', reporteController.reportAssignsType);
   app.get('/reporte/reportTypeDestroy/:id', reporteController.reportTypeDestroy);
   app.get('/reporte/findAllReportsByType/:type_id/:user_id', reporteController.findAllReportsByType);
   app.get('/reporte/listReportsViewed/:id', reporteController.listReportsViewed);
   app.get('/reporte/listReportsByUser/:id', AuthSaveRoutes, reporteController.listReportsByUser);
   app.get('/reporte/listReportsFavorites/:id', reporteController.listReportsFavorites);
   app.get('/reporte/listReportsByTypeAndUser/:usuario_id/:tipo_id', reporteController.listReportsByTypeAndUser);
   app.get('/reporte/findAllForeignsReports/:desde', reporteController.findAllForeignsReports);
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
   //tipo
   app.post('/tipo/create', tipoController.create);
   app.post('/tipo/update', tipoController.update);
   app.get('/tipo/list', tipoController.list);
   app.get('/tipo/find/:id', tipoController.find);
   app.get('/tipo/delete/:id', tipoController.delete);
   app.get('/tipo/getTypesAreas', tipoController.getTypesAreas);
   //System
   app.post('/sistem/uploadFile', sistemController.uploadFile);
};