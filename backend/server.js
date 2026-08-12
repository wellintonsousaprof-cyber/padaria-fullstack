require("dotenv").config();

const app = require("./app");
const conexao = require("./config/database");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {

    try {

        await conexao.query("SELECT 1");

        console.log("======================================");
        console.log("✅ Banco de dados conectado.");
        console.log(`🚀 Servidor iniciado na porta ${PORT}`);
        console.log("======================================");

        app.listen(PORT, "0.0.0.0", () => {

            console.log("API pronta para receber requisições.");

        });

    } catch (erro) {

        console.error("❌ Erro ao conectar ao banco:");
        console.error(erro);

        process.exit(1);

    }
}

iniciarServidor();