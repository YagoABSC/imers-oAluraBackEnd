import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

const routes = (app) => {
    // Configura o middleware `express.json()` para interpretar dados JSON enviados pelo cliente
    app.use(express.json());

    // Define uma rota para o método GET em "/posts"
    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
