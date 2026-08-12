import { buscarProdutoPorId } from "./vitrine.js";
import {
    salvarCarrinho,
    carregarCarrinho
} from "../utils/storage.js";
import { enviarPedido } from "../utils/whatsapp.js";

let carrinho = carregarCarrinho();


export function iniciarCarrinho() {

    const btnCarrinho =
        document.getElementById("btnCarrinho");

    const btnFechar =
        document.getElementById("fecharCarrinho");

    if (!btnCarrinho) {
        return;
    }

    atualizarTela();

    btnCarrinho.addEventListener(
        "click",
        abrirCarrinho
    );

    if (btnFechar) {

        btnFechar.addEventListener(
            "click",
            fecharCarrinho
        );

    }

    const btnFinalizar =
        document.getElementById("btnFinalizar");

    if (btnFinalizar) {

        btnFinalizar.addEventListener(
            "click",
            finalizarPedido
        );

    }


    document.addEventListener(
        "click",
        evento => {

            if (
                evento.target.classList.contains("mais")
            ) {

                aumentar(
                    Number(evento.target.dataset.id)
                );

            }


            if (
                evento.target.classList.contains("menos")
            ) {

                diminuir(
                    Number(evento.target.dataset.id)
                );

            }


            if (
                evento.target.classList.contains("remover")
            ) {

                const id =
                    Number(evento.target.dataset.id);

                if (
                    confirm(
                        "Deseja remover este item do carrinho?"
                    )
                ) {

                    remover(id);

                }

            }


            if (
                evento.target.classList.contains("adicionar")
            ) {

                const botao = evento.target;

                botao.disabled = true;

                botao.textContent =
                    "Adicionando...";


                const id =
                    Number(botao.dataset.id);

                const produto =
                    buscarProdutoPorId(id);

                adicionarProduto(produto);


                setTimeout(() => {

                    botao.disabled = false;

                    botao.textContent =
                        "Adicionar ao Carrinho";

                }, 300);

            }

        }
    );

}


function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {

        carrinhoElemento.classList.add("ativo");

    }

}


function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {

        carrinhoElemento.classList.remove("ativo");

    }

}


export function adicionarProduto(produto) {

    if (!produto) {
        return;
    }


    const existente = carrinho.find(

        item =>
            Number(item.id) ===
            Number(produto.id)

    );


    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({

            ...produto,

            quantidade: 1

        });

    }


    salvarCarrinho(carrinho);

    atualizarTela();

}


function atualizarTela() {

    const container =
        document.getElementById("itensCarrinho");

    const contador =
        document.getElementById("contadorCarrinho");

    const valorTotal =
        document.getElementById("valorTotal");


    if (!container || !contador || !valorTotal) {
        return;
    }


    const quantidadeItens =
        carrinho.reduce(

            (total, item) =>
                total + item.quantidade,

            0

        );


    contador.textContent =
        quantidadeItens;


    if (quantidadeItens === 0) {

        contador.style.display =
            "none";

    } else {

        contador.style.display =
            "inline-flex";

    }


    container.innerHTML = "";


    if (carrinho.length === 0) {

        container.innerHTML =
            "<p>Carrinho vazio.</p>";

        valorTotal.innerHTML =
            "R$ 0,00";

        return;

    }


    carrinho.forEach(item => {

        container.innerHTML += `

            <div class="item-carrinho">

                <h4>
                    ${item.nome}
                </h4>

                <p>

                    ${Number(item.preco).toLocaleString(
                        "pt-BR",
                        {
                            style: "currency",
                            currency: "BRL"
                        }
                    )}

                </p>

                <div class="acoes-item">

                    <button
                        class="menos"
                        data-id="${item.id}"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        class="mais"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                    <button
                        class="remover"
                        data-id="${item.id}"
                    >
                        🗑
                    </button>

                </div>

            </div>

        `;

    });


    const total =
        carrinho.reduce(

            (soma, item) =>
                soma +
                (
                    Number(item.preco) *
                    item.quantidade
                ),

            0

        );


    valorTotal.innerHTML =
        total.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


function aumentar(id) {

    const item = carrinho.find(

        produto =>
            Number(produto.id) ===
            Number(id)

    );


    if (item) {

        item.quantidade++;

    }


    salvarCarrinho(carrinho);

    atualizarTela();

}


function diminuir(id) {

    const item = carrinho.find(

        produto =>
            Number(produto.id) ===
            Number(id)

    );


    if (!item) {
        return;
    }


    item.quantidade--;


    if (item.quantidade <= 0) {

        remover(id);

        return;

    }


    salvarCarrinho(carrinho);

    atualizarTela();

}


function remover(id) {

    carrinho =
        carrinho.filter(

            produto =>
                Number(produto.id) !==
                Number(id)

        );


    salvarCarrinho(carrinho);

    atualizarTela();

}


function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );


    const token =
        localStorage.getItem("token");


    if (!usuario || !token) {

        alert(
            "Faça login para finalizar o pedido."
        );

        window.location.href =
            "login.html";

        return;

    }


    enviarPedido(
        usuario,
        carrinho
    );

}