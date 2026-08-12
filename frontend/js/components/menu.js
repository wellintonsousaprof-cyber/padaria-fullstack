import { listarCategorias } from "../api/categorias.js";

import { iniciarVitrine } from "./vitrine.js";

export async function iniciarMenu() {

    const menu = document.getElementById("menuCategorias");

    const resposta = await listarCategorias();

    menu.innerHTML = "";

    menu.innerHTML += `

        <li>

            <a href="#" data-id="">

                Todos

            </a>

        </li>

    `;

    resposta.dados.forEach(categoria => {

        menu.innerHTML += `

            <li>

                <a

                    href="#"

                    data-id="${categoria.id}"

                >

                    ${categoria.nome}

                </a>

            </li>

        `;

    });

    document

        .querySelectorAll("#menuCategorias a")

        .forEach(link => {

            link.addEventListener("click", evento => {

                evento.preventDefault();

                iniciarVitrine(

                    link.dataset.id

                );

            });

        });

}