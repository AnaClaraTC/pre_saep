const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const partes = authHeader.split(' ');
  const token = partes.length === 2 ? partes[1] : partes[0];

  try {
    const segredo = process.env.JWT_SECRET || 'chave_secreta_saep';
    const dados = jwt.verify(token, segredo);

    req.usuario = dados;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

module.exports = autenticar;