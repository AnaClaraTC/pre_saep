const { Op } = require('sequelize');
const Produto = require('../models/Produto');

async function listar(req, res) {
  try {
    const { busca } = req.query;
    const condicoes = {};

    if (busca) {
      condicoes.nome = { [Op.like]: `%${busca}%` };
    }

    const produtos = await Produto.findAll({
      where: condicoes,
      order: [['nome', 'ASC']],
    });

    return res.json(produtos);
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: erro.message });
  }
}
async function cadastrar(req, res) {
  try {
    const { nome, categoria, unidade_medida, quantidade_estoque, estoque_minimo, data_validade } = req.body;

    if (!nome || !categoria || !unidade_medida || estoque_minimo === undefined) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos.' });
    }

    const novoProduto = await Produto.create({
      nome,
      categoria,
      unidade_medida,
      quantidade_estoque: quantidade_estoque || 0,
      estoque_minimo,
      data_validade: data_validade || null,
    });

    return res.status(201).json(novoProduto);
  } catch (erro) {
    return res.status(400).json({ mensagem: 'Erro ao cadastrar produto', erro: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, categoria, unidade_medida, quantidade_estoque, estoque_minimo, data_validade } = req.body;

    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    await produto.update({
      nome,
      categoria,
      unidade_medida,
      quantidade_estoque,
      estoque_minimo,
      data_validade,
    });

    return res.json({ mensagem: 'Produto atualizado com sucesso.', produto });
  } catch (erro) {
    return res.status(400).json({ mensagem: 'Erro ao atualizar produto', erro: erro.message });
  }
}
async function excluir(req, res) {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    await produto.destroy();
    return res.json({ mensagem: 'Produto removido com sucesso.' });
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro ao excluir produto', erro: erro.message });
  }
}

module.exports = {
  listar,
  cadastrar,
  atualizar,
  excluir,
};