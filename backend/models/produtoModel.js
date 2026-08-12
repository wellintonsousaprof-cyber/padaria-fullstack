const db = require("../config/database");

class Produto {

    static async listar(categoria = null) {

        let sql = `

            SELECT

                p.id,
                p.nome,
                p.descricao,
                p.preco,
                p.imagem_url,

                c.id AS categoria_id,
                c.nome AS categoria

            FROM produtos p

            INNER JOIN categorias c
            ON c.id = p.categoria_id

        `;

        const parametros = [];

        if (categoria) {

            sql += " WHERE p.categoria_id = ? ";

            parametros.push(categoria);

        }

        sql += " ORDER BY p.nome ";

        const [rows] = await db.query(

            sql,

            parametros

        );

        return rows;

    }

    static async buscarPorId(id) {

        const [rows] = await db.query(

            `SELECT
                *
             FROM produtos
             WHERE id = ?`,

            [id]

        );

        return rows[0];

    }

}

module.exports = Produto;