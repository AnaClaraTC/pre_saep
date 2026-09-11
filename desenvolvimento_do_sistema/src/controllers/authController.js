const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function login(req, res) {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ mensagem: 'Login e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ where: { login } });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas: usuário não encontrado.' });
    }

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas: senha incorreta.' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, nome: usuario.nome, login: usuario.login },
      process.env.JWT_SECRET || 'chave_secreta_saep',
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        login: usuario.login,
      },
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao fazer login',
      erro: erro.message,
    });
  }
}

module.exports = { login };