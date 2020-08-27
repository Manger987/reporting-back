'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class perfil_rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  perfil_rol.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    perfil_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'perfil_rol',
  });

  perfil_rol.associate = function(models) {
    // associations can be defined here
    perfil_rol.belongsTo(models.perfil,
        {
            as: 'perfil',
            foreignKey: 'perfil_id',
        }
    );
    perfil_rol.belongsTo(models.rol,
        {
            as: 'rol',
            foreignKey: 'rol_id',
        }
    );
  };
  return perfil_rol;
};