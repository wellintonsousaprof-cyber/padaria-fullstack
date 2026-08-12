const Categoria = require("../models/categoriaModel");

class CategoriaController {

    static async listar(req, res) {

        try {

            const categorias = await Categoria.listar();

            return res.json({

                sucesso: true,

                dados: categorias

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,

                mensagem: "Erro ao listar categorias."

            });

        }

    }

}

module.exports = CategoriaController;