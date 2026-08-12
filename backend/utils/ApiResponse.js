class ApiResponse {

    static success(res, dados = null, mensagem = "Operação realizada com sucesso.") {

        if (Array.isArray(dados)) {

            return res.json({

                sucesso: true,

                mensagem,

                total: dados.length,

                dados

            });

        }

        return res.json({

            sucesso: true,

            mensagem,

            dados

        });

    }

    static created(res, dados = null, mensagem = "Registro criado com sucesso.") {

        return res.status(201).json({

            sucesso: true,

            mensagem,

            dados

        });

    }

    static error(res, status = 500, mensagem = "Erro interno do servidor.") {

        return res.status(status).json({

            sucesso: false,

            mensagem

        });

    }

}

module.exports = ApiResponse;