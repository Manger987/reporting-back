'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario_perfil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usuario_perfil.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    usuario_id: DataTypes.INTEGER,
    perfil_id: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'usuario_perfil',
  });

  usuario_perfil.associate = function(models) {
    // associations can be defined here
    usuario_perfil.belongsTo(models.usuario,
        {
            as: 'usuario',
            foreignKey: 'usuario_id',
        }
    );
    usuario_perfil.belongsTo(models.perfil,
        {
            as: 'perfil',
            foreignKey: 'perfil_id',
        }
    );
  };
  return usuario_perfil;
};