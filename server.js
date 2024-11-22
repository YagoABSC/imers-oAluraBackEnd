import express from 'express';

// Dados mockados
const posts = [
    { id: 1, descricao: "Uma foto", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Um pôr do sol incrível", imagem: "https://picsum.photos/id/237/300/150" },
    { id: 3, descricao: "Um cachorro fazendo uma careta", imagem: "https://placeimg.com/300/150/animals" },
    { id: 4, descricao: "Uma paisagem montanhosa", imagem: "https://source.unsplash.com/random/300x150/?mountains" },
    { id: 5, descricao: "Um prato de comida delicioso", imagem: "https://loremflickr.com/300/150/food" },
    { id: 6, descricao: "Um desenho animado engraçado", imagem: "https://placekitten.com/300/150" }
  ];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// http.cat - consultar status de metódo http
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostId(req.params.id)
    res.status(200).json(posts[index]);
});