import { listarProdutos } from "../api/produtos.js";

let produtosCarregados = [];

export async function iniciarVitrine(categoria = "") {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = `

<div class="loading">

    Carregando produtos...

</div>

`;

    try {

        const resposta = await listarProdutos(categoria);
        
        const produtos = resposta.dados;
        produtosCarregados = produtos;

        if (produtos.length === 0) {

            container.innerHTML = "<p>Nenhum produto encontrado.</p>";

            return;

        }

        container.innerHTML = "";

        produtos.forEach(criarCard);

    }

    catch (erro) {

        container.innerHTML = "<p>Erro ao carregar produtos.</p>";

    }

}

function criarCard(produto) {

    const container = document.getElementById("listaProdutos");

    const imagem = produto.imagem_url

    ? produto.imagem_url

    : "imagens/sem-imagem.png";

    container.innerHTML += `

        <div class="card">

            <img
    src="${imagem}"
    alt="${produto.nome}">

            <div class="card-body">

                <h3>

                    ${produto.nome}

                </h3>

                <p>

                    ${produto.descricao}

                </p>

                <span class="preco">

                    R$

                    ${Number(produto.preco).toFixed(2)}

                </span>

                <button
    class="btn adicionar"
    data-id="${produto.id}">
    Adicionar ao Carrinho
    </button>

            </div>

        </div>

    `;

}

export function buscarProdutoPorId(id){

    return produtosCarregados.find(

        produto => produto.id === id

    );

}