import {
    obterUsuario,
    usuarioLogado,
    logout
} from "../auth.js";


export function iniciarHeader() {

    const acoes = document.querySelector(".acoes");

    if (!acoes) {
        return;
    }


    if (usuarioLogado()) {

        const usuario = obterUsuario();

        acoes.innerHTML = `

            <span class="usuario-logado">

                Olá, ${usuario?.nome || "Usuário"} 👋

            </span>

            <button
                id="btnSair"
                class="btn"
                type="button"
            >

                Sair

            </button>

            <button
                id="btnCarrinho"
                class="btn"
                type="button"
            >

                🛒 Carrinho

                <span id="contadorCarrinho">
                    0
                </span>

            </button>

        `;


        const btnSair = document.getElementById("btnSair");

        btnSair.addEventListener(

            "click",

            () => {

                logout();

            }

        );

    }

    else {

        acoes.innerHTML = `

            <a href="login.html">

                Entrar

            </a>

            <button
                id="btnCarrinho"
                class="btn"
                type="button"
            >

                🛒 Carrinho

                <span id="contadorCarrinho">
                    0
                </span>

            </button>

        `;

    }

}