const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;