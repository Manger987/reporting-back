'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reporte_tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reporte_tipo.init({
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
    tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'tipo',
          key: 'id'
      }
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
    sequelize,
    modelName: 'reporte_tipo',
  });

  reporte_tipo.associate = function(models) {
    // associations can be defined here
    reporte_tipo.belongsTo(models.reporte,
        {
            as: 'reporte',
            foreignKey: 'reporte_id',
        }
    );
    reporte_tipo.belongsTo(models.tipo,
        {
            as: 'tipo',
            foreignKey: 'tipo_id',
        }
    );
  }

  return reporte_tipo;
};