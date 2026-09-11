const express = require('express');
const router = express.Router();
const { cadastrar } = require('../controllers/usuarioController');

router.post('/', cadastrar);

module.exports = router;