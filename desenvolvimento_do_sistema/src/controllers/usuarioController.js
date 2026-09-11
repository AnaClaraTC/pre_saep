const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function cadastrar(req, res) {
  try {
    const { nome, login, senha } = req.body;

    if (!nome || !login || !senha) {
      return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      login,
      senha: senhaCriptografada,
    });

    return res.status(201).json({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      login: usuario.login,
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: 'Erro ao cadastrar usuário',
      erro: erro.message,
    });
  }
}

module.exports = { cadastrar };