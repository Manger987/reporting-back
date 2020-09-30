const jwt = require("jsonwebtoken");
var multer = require("multer");
const config = require("./../config/config.json").secret;
//Configurate upload File
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploadFiles");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage }).array("file"); //.single('file');

module.exports = {
  async AuthSaveRoutes(req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(token, config, (err, decoded) => {
        if (err) {
          return res.status(401).json({ code: 401, message: "Token inválida" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({
        code: 401,
        message: "Token no proveída.",
      });
    }
  },

  async uploadFile(req, res) {
    try {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
        console.log("REQ:", req.files);
        return res.status(200).send(req.files);
      });
    } catch (error) {
      console.error("ERROR uploadFile:", error);
      res.status(400).send(error);
    }
  },
};
