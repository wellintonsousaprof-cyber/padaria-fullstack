import { iniciarHeader } from "./components/header.js";

import { iniciarMenu } from "./components/menu.js";

import { iniciarCarrinho } from "./components/carrinho.js";

import { iniciarVitrine } from "./components/vitrine.js";

import { iniciarAuth } from "./auth.js";


document.addEventListener(

    "DOMContentLoaded",

    async () => {

        iniciarHeader();

        iniciarAuth();

        iniciarCarrinho();

        await iniciarMenu();

        iniciarVitrine();

    }

);