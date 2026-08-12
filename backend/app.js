const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());

app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});

app.use("/api/auth", authRoutes);

app.use("/api/categorias", categoriaRoutes);

app.use("/api/produtos", produtoRoutes);

app.use(errorMiddleware);

module.exports = app;