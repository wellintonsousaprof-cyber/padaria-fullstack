import { request } from "./api.js";

export async function listarProdutos(categoria = "") {

    let rota = "/produtos";

    if (categoria) {

        rota += `?categoria=${categoria}`;

    }

    return await request(rota);

}