'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize');
const usuario_reporte = require('./usuario_reporte');
module.exports = (sequelize, DataTypes) => {
  class reporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reporte.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    url: DataTypes.STRING,
    vista_reporte: DataTypes.INTEGER,
    fecha_visualizacion: DataTypes.DATE,
    usuario_creador: DataTypes.INTEGER,
    archivo: DataTypes.STRING,
    // archivo: {
    //   type: DataTypes.ARRAY(Sequelize.JSON),
    //   allowNull: true,
    //   references: {
    //       model: 'reporte_archivo',
    //       key: 'reporte_id'
    //   }
    // },
    activo: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'reporte',
    sequelize,
    modelName: 'reporte',
  });
  reporte.associate = function (models) {
    // associations can be defined here
    reporte.hasMany(models.usuario_reporte,
      {
        foreignKey: 'reporte_id',
      }
    );
    reporte.hasMany(models.reporte_tipo,
      {
        as: 'reporte_tipo',
        foreignKey: 'reporte_id',
      }
    );
    reporte.hasMany(models.reporte_archivo,
      {
        as: 'reporte_archivo',
        foreignKey: 'reporte_id',
      }
    );
  };
  return reporte;
};