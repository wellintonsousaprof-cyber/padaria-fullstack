import { CONFIG } from "../config.js";

const BASE_URL = CONFIG.API_URL;

export async function request(endpoint, options = {}) {

    try {

        const token = localStorage.getItem("token");

        const headers = {

            "Content-Type": "application/json",

            ...options.headers

        };

        // Se existir token, envia para a API
        if (token) {

            headers.Authorization = `Bearer ${token}`;

        }

        const resposta = await fetch(

            BASE_URL + endpoint,

            {
                ...options,
                headers
            }

        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            throw new Error(

                dados.mensagem || "Erro na API."

            );

        }

        return dados;

    }

    catch (erro) {

        console.error("Erro na API:", erro);

        throw erro;

    }

}