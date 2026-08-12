const db = require("../config/database");

class Usuario {

    static async buscarPorEmail(email) {

        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        return rows[0];

    }

    static async buscarPorId(id) {

        const [rows] = await db.query(
            `SELECT
                id,
                nome,
                telefone,
                email,
                criado_em
             FROM usuarios
             WHERE id = ?`,
            [id]
        );

        return rows[0];

    }

    static async cadastrar(usuario) {

        const { nome, telefone, email, senha } = usuario;

        const [resultado] = await db.query(

            `INSERT INTO usuarios
            (nome, telefone, email, senha)
            VALUES (?, ?, ?, ?)`,

            [
                nome,
                telefone,
                email,
                senha
            ]

        );

        return resultado.insertId;

    }

}

module.exports = Usuario;