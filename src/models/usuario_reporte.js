'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario_reporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usuario_reporte.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'usuario',
          key: 'id'
      }
    },
    reporte_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'reporte',
          key: 'id'
      }
    },
    favorito: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'usuario_reporte',
  });

  usuario_reporte.associate = function(models) {
    // associations can be defined here
    usuario_reporte.belongsTo(models.usuario,
        {
            as: 'usuario',
            foreignKey: 'usuario_id',
        }
    );
    usuario_reporte.belongsTo(models.reporte,
        {
            as: 'reporte',
            foreignKey: 'reporte_id',
        }
    );
  };
  return usuario_reporte;
};