const Produto = require('../models/Produto');
const Movimentacao = require('../models/Movimentacao');
const Usuario = require('../models/Usuario');

async function registrar(req, res) {
  try {
    const { id_produto, id_usuario, tipo, quantidade, data_movimentacao } = req.body;

    if (!id_produto || !id_usuario || !tipo || !quantidade) {
      return res.status(400).json({ mensagem: 'Todos os campos da movimentação são obrigatórios.' });
    }

    const produto = await Produto.findByPk(id_produto);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    const qtd = parseInt(quantidade, 10);
    if (qtd <= 0) {
      return res.status(400).json({ mensagem: 'Quantidade inválida para movimentação.' });
    }

    let novoSaldo = produto.quantidade_estoque;
    let alertaEstoqueMinimo = null;

    if (tipo === 'entrada') {
      novoSaldo += qtd;
    } else if (tipo === 'saida') {
      if (produto.quantidade_estoque < qtd) {
        return res.status(400).json({ mensagem: 'Quantidade insuficiente em estoque para a saída solicitada.' });
      }
      novoSaldo -= qtd;

      if (novoSaldo <= produto.estoque_minimo) {
        alertaEstoqueMinimo = `Atenção: O estoque do produto "${produto.nome}" atingiu nível crítico (${novoSaldo} ${produto.unidade_medida}). Mínimo configurado: ${produto.estoque_minimo}.`;
      }
    } else {
      return res.status(400).json({ mensagem: "Tipo inválido. Use 'entrada' ou 'saida'." });
    }
    await produto.update({ quantidade_estoque: novoSaldo });
    const movimentacao = await Movimentacao.create({
      id_produto,
      id_usuario,
      tipo,
      quantidade: qtd,
      data_movimentacao: data_movimentacao || new Date(),
    });

    return res.status(201).json({
      mensagem: 'Movimentação registrada com sucesso.',
      movimentacao,
      estoque_atualizado: novoSaldo,
      alerta: alertaEstoqueMinimo,
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao registrar movimentação de estoque.',
      erro: erro.message,
    });
  }
}

async function listarHistorico(req, res) {
  try {
    const historico = await Movimentacao.findAll({
      include: [
        { model: Produto, attributes: ['nome', 'unidade_medida'] },
        { model: Usuario, attributes: ['nome'] },
      ],
      order: [['data_movimentacao', 'DESC']],
    });

    return res.json(historico);
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro ao listar histórico', erro: erro.message });
  }
}

module.exports = {
  registrar,
  listarHistorico,
};