const express = require("express");

const router = express.Router();

const CategoriaController = require("../controllers/categoriaController");

router.get(

    "/",

    CategoriaController.listar

);

module.exports = router;