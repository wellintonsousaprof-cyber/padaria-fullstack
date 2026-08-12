module.exports = (err, req, res, next) => {

    console.error("ERRO:");

    console.error(err);

    return res.status(err.status || 500).json({

        sucesso: false,

        mensagem: err.message || "Erro interno do servidor."

    });

};