'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario_tipo_perfil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usuario_tipo_perfil.init({
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
    tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo',
        key: 'id'
      }
    },
    perfil_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'perfil',
        key: 'id'
      }
    },
    fecha_vencimiento: {
      allowNull: true,
      type: DataTypes.DATE
    },
    activo: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'usuario_tipo_perfil',
    tableName: 'usuario_tipo_perfil',
  });
  usuario_tipo_perfil.associate = function (models) {
    // associations can be defined here
    usuario_tipo_perfil.belongsTo(models.usuario,
      {
        as: 'usuario',
        foreignKey: 'usuario_id',
      }
    );
    usuario_tipo_perfil.belongsTo(models.perfil,
      {
        as: 'perfil',
        foreignKey: 'perfil_id',
      }
    );
    usuario_tipo_perfil.belongsTo(models.tipo,
      {
        as: 'tipo',
        foreignKey: 'tipo_id',
      }
    );
  };
  return usuario_tipo_perfil;
};