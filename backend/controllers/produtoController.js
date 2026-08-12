const Produto = require("../models/produtoModel");

class ProdutoController {

    static async listar(req, res) {

        try {

            const categoria = req.query.categoria || null;

            const produtos = await Produto.listar(categoria);

            return res.json({

                sucesso: true,

                dados: produtos

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,

                mensagem: "Erro ao listar produtos."

            });

        }

    }

    static async buscarPorId(req, res) {

        try {

            const produto = await Produto.buscarPorId(

                req.params.id

            );

            if (!produto) {

                return res.status(404).json({

                    sucesso: false,

                    mensagem: "Produto não encontrado."

                });

            }

            return res.json({

                sucesso: true,

                dados: produto

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,

                mensagem: "Erro interno."

            });

        }

    }

}

module.exports = ProdutoController;