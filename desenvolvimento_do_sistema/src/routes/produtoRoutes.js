const express = require('express');
const router = express.Router();
const {
  listar,
  cadastrar,
  atualizar,
  excluir,
} = require('../controllers/produtoController');

router.get('/', listar);

router.post('/', cadastrar);

router.put('/:id', atualizar);

router.delete('/:id', excluir);

module.exports = router;