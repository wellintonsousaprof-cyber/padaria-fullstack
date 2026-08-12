import { request } from "./api.js";

export async function listarCategorias() {

    return await request("/categorias");

}