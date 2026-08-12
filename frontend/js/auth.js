import { request } from "./api/api.js";
import { sucesso, erro } from "./utils/mensagem.js";


// ========================================
// INICIALIZAÇÃO
// ========================================

export function iniciarAuth() {

    const formLogin = document.getElementById("formLogin");

    const formCadastro = document.getElementById("formCadastro");


    if (formLogin) {

        formLogin.addEventListener(

            "submit",

            fazerLogin

        );

    }


    if (formCadastro) {

        formCadastro.addEventListener(

            "submit",

            fazerCadastro

        );

    }

}


// ========================================
// LOGIN
// ========================================

async function fazerLogin(evento) {

    evento.preventDefault();


    const email = document.getElementById("email").value.trim();

    const senha = document.getElementById("senha").value;


    if (!email || !senha) {

        erro("Informe e-mail e senha.");

        return;

    }


    const botao = evento.target.querySelector("button");

    botao.disabled = true;

    botao.textContent = "Entrando...";


    try {

        const resposta = await request(

            "/auth/login",

            {

                method: "POST",

                body: JSON.stringify({

                    email,

                    senha

                })

            }

        );


        // Salva o JWT
        localStorage.setItem(

            "token",

            resposta.token

        );


        // Salva os dados do usuário
        localStorage.setItem(

            "usuario",

            JSON.stringify(resposta.usuario)

        );


        sucesso(

            resposta.mensagem ||

            "Login realizado com sucesso."

        );


        // Vai para o cardápio
        window.location.href = "index.html";


    }

    catch (err) {

        erro(

            err.message ||

            "Não foi possível realizar o login."

        );

    }

    finally {

        botao.disabled = false;

        botao.textContent = "Entrar";

    }

}


// ========================================
// CADASTRO
// ========================================

async function fazerCadastro(evento) {

    evento.preventDefault();


    const nome = document

        .getElementById("nome")

        .value

        .trim();


    const telefone = document

        .getElementById("telefone")

        .value

        .trim();


    const email = document

        .getElementById("email")

        .value

        .trim();


    const senha = document

        .getElementById("senha")

        .value;


    if (!nome || !telefone || !email || !senha) {

        erro("Preencha todos os campos.");

        return;

    }


    if (senha.length < 6) {

        erro(

            "A senha deve possuir no mínimo 6 caracteres."

        );

        return;

    }


    const botao = evento.target.querySelector("button");

    botao.disabled = true;

    botao.textContent = "Cadastrando...";


    try {

        const resposta = await request(

            "/auth/cadastro",

            {

                method: "POST",

                body: JSON.stringify({

                    nome,

                    telefone,

                    email,

                    senha

                })

            }

        );


        sucesso(

            resposta.mensagem ||

            "Usuário cadastrado com sucesso."

        );


        // Depois do cadastro,
        // direciona para o login.

        window.location.href = "login.html";


    }

    catch (err) {

        erro(

            err.message ||

            "Não foi possível realizar o cadastro."

        );

    }

    finally {

        botao.disabled = false;

        botao.textContent = "Cadastrar";

    }

}


// ========================================
// VERIFICAR LOGIN
// ========================================

export function usuarioLogado() {

    return !!localStorage.getItem("token");

}


// ========================================
// PEGAR USUÁRIO
// ========================================

export function obterUsuario() {

    const usuario = localStorage.getItem("usuario");


    if (!usuario) {

        return null;

    }


    try {

        return JSON.parse(usuario);

    }

    catch {

        return null;

    }

}


// ========================================
// LOGOUT
// ========================================

export function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}