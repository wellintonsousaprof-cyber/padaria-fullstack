const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            sucesso: false,

            mensagem: "Token não informado."

        });

    }

    const [, token] = authHeader.split(" ");

    try {

        const payload = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.usuario = payload;

        next();

    }

    catch {

        return res.status(401).json({

            sucesso: false,

            mensagem: "Token inválido."

        });

    }

};