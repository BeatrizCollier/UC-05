// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');
const alunoRoutes = require('./src/modules/aluno/routes/index')
const enderecoRoutes = require('./src/modules/enderecoAluno/routes/index')

dotenv.config();

const port = process.env.PORTA;
const app = express();

//Aplicação use express como json(javascript object notation)
app.use(express.json());
  
app.use("/api", alunoRoutes);
app.use("/api", enderecoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
