import 'dotenv/config';

// Importa a função `conectarAoBanco` do arquivo `src/config/config.js` que estabelece a conexão com o banco de dados
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/config.js";

// Estabelece a conexão com o banco de dados de forma assíncrona usando a função importada
// e armazena a conexão na variável `conexao` para uso posterior
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona `getTodosPosts`
export async function getTodosPosts() {
    // Obtém o banco de dados a partir da conexão (`conexao`) e seleciona a coleção "posts"
    const db = conexao.db("imersao-instabytes");

    const colecao = db.collection("posts");

    // Busca todos os documentos da coleção "posts" e retorna um array com os resultados
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabytes");

    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {

    const objID = ObjectId.createFromHexString( id)

    const db = conexao.db("imersao-instabytes");

    const colecao = db.collection("posts");

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost})
}