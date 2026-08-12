const { body } = require("express-validator");

exports.validarCadastro = [

    body("nome")
        .trim()
        .notEmpty()
        .withMessage("Informe o nome."),

    body("telefone")
        .trim()
        .notEmpty()
        .withMessage("Informe o telefone."),

    body("email")
        .isEmail()
        .withMessage("Email inválido."),

    body("senha")
        .isLength({ min: 6 })
        .withMessage("A senha deve possuir pelo menos 6 caracteres.")

];

exports.validarLogin = [

    body("email")
        .isEmail()
        .withMessage("Email inválido."),

    body("senha")
        .notEmpty()
        .withMessage("Informe a senha.")

];