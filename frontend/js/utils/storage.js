const CHAVE = "carrinho";


export function salvarCarrinho(carrinho){

    localStorage.setItem(

        CHAVE,

        JSON.stringify(carrinho)

    );

}



export function carregarCarrinho(){

    const dados = localStorage.getItem(CHAVE);


    if(!dados){

        return [];

    }


    return JSON.parse(dados);

}



export function limparCarrinho(){

    localStorage.removeItem(CHAVE);

}