// Importa o framework Express para criar aplicações web Node.js
import express from 'express';

import routes from './src/routes/postsRoutes.js';



// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor Express na porta 3000 e imprime uma mensagem no console
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});



