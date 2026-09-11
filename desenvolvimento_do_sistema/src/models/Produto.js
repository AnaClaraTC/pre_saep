const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  id_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  unidade_medida: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  estoque_minimo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_validade: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'produto',
  timestamps: false,
});

module.exports = Produto;