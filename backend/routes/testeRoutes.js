const express = require("express");
const router = express.Router();

const db = require("../config/database");

router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query("SELECT NOW() AS dataHora");

        res.json({
            sucesso: true,
            mensagem: "API conectada ao banco com sucesso!",
            servidor: rows[0]
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            sucesso: false,
            erro: erro.message
        });

    }

});

module.exports = router;