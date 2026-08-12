const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuarioModel");

class AuthController {

    static async cadastrar(req, res) {

        try {

            const { nome, telefone, email, senha } = req.body;

            if (!nome || !telefone || !email || !senha) {

                return res.status(400).json({

                    sucesso: false,
                    mensagem: "Preencha todos os campos."

                });

            }

            const usuarioExiste = await Usuario.buscarPorEmail(email);

            if (usuarioExiste) {

                return res.status(400).json({

                    sucesso: false,
                    mensagem: "E-mail já cadastrado."

                });

            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const id = await Usuario.cadastrar({

                nome,

                telefone,

                email,

                senha: senhaCriptografada

            });

            return res.status(201).json({

                sucesso: true,

                mensagem: "Usuário cadastrado com sucesso.",

                dados: {

                    id

                }

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,

                mensagem: "Erro interno do servidor."

            });

        }

    }

    static async login(req, res) {

        try {

            const { email, senha } = req.body;

            if (!email || !senha) {

                return res.status(400).json({

                    sucesso: false,

                    mensagem: "Informe e-mail e senha."

                });

            }

            const usuario = await Usuario.buscarPorEmail(email);

            if (!usuario) {

                return res.status(401).json({

                    sucesso: false,

                    mensagem: "E-mail ou senha inválidos."

                });

            }

            const senhaCorreta = await bcrypt.compare(

                senha,

                usuario.senha

            );

            if (!senhaCorreta) {

                return res.status(401).json({

                    sucesso: false,

                    mensagem: "E-mail ou senha inválidos."

                });

            }

            const token = jwt.sign(

                {

                    id: usuario.id,

                    nome: usuario.nome,

                    email: usuario.email

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: process.env.JWT_EXPIRES_IN

                }

            );

            return res.json({

                sucesso: true,

                mensagem: "Login realizado com sucesso.",

                token,

                usuario: {

                    id: usuario.id,

                    nome: usuario.nome,

                    email: usuario.email,

                    telefone: usuario.telefone

                }

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,

                mensagem: "Erro interno do servidor."

            });

        }

    }

    static async perfil(req, res) {

        try {

            const usuario = await Usuario.buscarPorId(

                req.usuario.id

            );

            return res.json({

                sucesso: true,

                dados: usuario

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,

                mensagem: "Erro interno."

            });

        }

    }

}

module.exports = AuthController;