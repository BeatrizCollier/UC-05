// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/configDb');

// const alunoRoutes = require('./src/modules/aluno/routes/index')
// const enderecoRoutes = require('./src/modules/enderecoAluno/routes/index')

dotenv.config();

const port = process.env.PORTA;
const app = express();

//Aplicação use express como json(javascript object notation)
app.use(express.json());
  
// app.use("/api", alunoRoutes);
// app.use("/api", enderecoRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida!');
  } catch (error) {
    console.error('Conexão com o banco falhou', error);
  }
  console.log(`Servidor rodando em http://localhost:${port}`);
});
