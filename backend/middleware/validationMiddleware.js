const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {

    const erros = validationResult(req);

    if (!erros.isEmpty()) {

        return res.status(400).json({

            sucesso: false,

            erros: erros.array()

        });

    }

    next();

};