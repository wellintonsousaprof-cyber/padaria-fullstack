import { CONFIG } from "../config.js";

export function enviarPedido(usuario,carrinho){

    const numero = CONFIG.TELEFONE_WHATSAPP;

    let mensagem =

`Olá!

Meu nome é ${usuario.nome}.

Gostaria de fazer o seguinte pedido:

`;

    let total = 0;

    carrinho.forEach(item=>{

        const subtotal =

        item.preco * item.quantidade;

        total += subtotal;

        mensagem +=

`${item.quantidade}x ${item.nome}

R$ ${subtotal.toFixed(2)}

`;

    });

    mensagem += `

Total:

R$ ${total.toFixed(2)}

Obrigado!
`;

    window.open(

        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,

        "_blank"

    );

}