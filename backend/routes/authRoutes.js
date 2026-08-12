const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const AuthController = require("../controllers/authController");

const validationMiddleware = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// CADASTRO
// ===============================

router.post(

    "/cadastro",

    [

        body("nome")
            .notEmpty()
            .withMessage("Informe o nome."),

        body("telefone")
            .notEmpty()
            .withMessage("Informe o telefone."),

        body("email")
            .isEmail()
            .withMessage("E-mail inválido."),

        body("senha")
            .isLength({ min: 6 })
            .withMessage("A senha deve possuir no mínimo 6 caracteres.")

    ],

    validationMiddleware,

    AuthController.cadastrar

);

// ===============================
// LOGIN
// ===============================

router.post(

    "/login",

    [

        body("email")
            .isEmail()
            .withMessage("Informe um e-mail válido."),

        body("senha")
            .notEmpty()
            .withMessage("Informe a senha.")

    ],

    validationMiddleware,

    AuthController.login

);

// ===============================
// PERFIL
// ===============================

router.get(

    "/perfil",

    authMiddleware,

    AuthController.perfil

);

module.exports = router;