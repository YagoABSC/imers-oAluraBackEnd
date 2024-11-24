import fs from  "fs";
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";


export async function listarPosts (req, res) {
    // Chama a função `getTodosPosts` para buscar todos os posts do banco de dados de forma assíncrona
    const posts = await getTodosPosts();

    // Define o status da resposta como 200 (OK) e envia os posts recuperados como JSON
    res.status(200).json(posts);
}


export async function postarNovoPost (req, res){
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (e){
        console.error(e.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}


export async function uploadImagem (req, res){
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtaulizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtaulizada)
        res.status(200).json(postCriado);
    } catch (e){
        console.error(e.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}

export async function atualizarNovoPost (req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    const post  = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try {
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (e){
        console.error(e.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}