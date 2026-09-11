const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');

const { Usuario, Produto, Movimentacao } = require('./models'); 

const autenticar = require('./middlewares/autenticar');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);

app.use('/produtos', autenticar, produtoRoutes);
app.use('/movimentacoes', autenticar, movimentacaoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao inicializar o banco de dados:', err);
  });

module.exports = app;