const db = require("../config/database");

class Categoria {

    static async listar() {

        const [rows] = await db.query(

            `SELECT
                id,
                nome
             FROM categorias
             ORDER BY nome`

        );

        return rows;

    }

    static async buscarPorId(id) {

        const [rows] = await db.query(

            `SELECT
                id,
                nome
             FROM categorias
             WHERE id = ?`,

            [id]

        );

        return rows[0];

    }

}

module.exports = Categoria;