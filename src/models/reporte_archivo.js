'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reporte_archivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reporte_archivo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    reporte_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'reporte',
          key: 'id'
      }
    },
    nombre_archivo: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'reporte_archivo',
    modelName: 'reporte_archivo',
  });

  reporte_archivo.associate = function(models) {
    // associations can be defined here
    reporte_archivo.belongsTo(models.reporte,
        {
            as: 'reporte_archivo',
            foreignKey: 'reporte_id',
        }
    );
  }
  return reporte_archivo;
};