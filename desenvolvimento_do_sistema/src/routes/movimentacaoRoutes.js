const express = require('express');
const router = express.Router();
const {
  registrar,
  listarHistorico,
} = require('../controllers/movimentacaoController');

router.post('/', registrar);

router.get('/', listarHistorico);

module.exports = router;