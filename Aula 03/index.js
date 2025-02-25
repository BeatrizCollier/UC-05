// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');

//Importando o banco de dados
const {pool} = require('./src/config/database');

dotenv.config();

const port = process.env.PORTA;
const app = express();

//Aplicação use express como json(javascript object notation)
app.use(express.json());


app.get('/produtos', async (requisicao, resposta) => {
  //tratamento de exceções
  try {
    //apenas armazenando um texto, no caso uma consulta (tem q ser com template string)
    const consulta = `select * from produto`;
    //fazendo a query. No lugar de passar o select, coloca o q foi armazenado.
    const produtos = await pool.query(consulta);
    //Verificando a quantidade de linhas
    if(produtos.rows.length === 0){
      return resposta.status(200).json({mensagem:"Banco de dados vazio!"})
    }
    resposta.status(200).json(produtos.rows); //tem que ter rows, banco de dados retorna linhas
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar produtos.", erro: error.message})
  }
});

app.get('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const dados1 = [id];
    const consulta1 = `select * from produto where id = $1`
    const resultado1 = await pool.query(consulta1, dados1);

    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({msg: "Produto não encontrado!"})
    }
    resposta.status(200).json(resultado1.rows[0]);
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar produto pelo id.", erro: error.message})
  }
});

app.post('/produtos', async (requisicao, resposta) => {
  try {
    //apenas enviando a requisição para os servidor, ainda sem armazenar
    const { nome, preco, quantidade } = requisicao.body; //desestrutura uma variável, transforma em um objeto.
    //verificando se todos os dados foram preenchidos
    if (!nome || !preco || !quantidade) {
      return resposta.status(200).json({mensagem: "Todos os dados devem ser preenchidos."})
    }
    //armazenando os dados da requisição
    const dados = [nome, preco, quantidade]; //passa como array, não mais como objeto.
    const consulta = `insert into produto(nome, preco, quantidade)
                      values ($1, $2, $3) returning *`
    //A consulta - query precisa que seja como objeto
    const resultado = await pool.query(consulta, dados);

    resposta.status(201).json({ mensagem: "Produto criado com sucesso!" });
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao criar produto.", erro: error.message})
  }
});

app.put('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const {novoNome, novoPreco, novaQuantidade} = requisicao.body;

    if(!id){
      return resposta.status(404).json({msg:"Informe um parâmetro!"})
    };
    //Verificar se tem o id no banco
    const dados1 = [id]
    const consulta = `select * from produto where id = $1`;
    const resultado = await pool.query(consulta, dados1)
    if (resultado.rows.length === 0) {
       return resposta.status(404).json({msg:"Produto não encontrado."})
    }
    //Alterar os dados
    const dados2 = [id, novoNome, novoPreco, novaQuantidade];
    const consulta2 = `update produto set nome = $2, preco = $3, quantidade = $4 where id = $1 returning *`
    await pool.query(consulta2, dados2);

    resposta.status(200).json({msg: "Produto atualizado com sucesso!"})

  } catch (error) {
    resposta.status(500).json({msg:"Erro ao editar produto.", erro: error.message})
  }
})

app.delete("/produtos/:id", async (requisicao, resposta) =>{
  try {
    const id = requisicao.params.id;
    const dados1 = [id]
    const consulta1 = `select * from produto where id = $1`
    const resultado1 = await pool.query(consulta1, dados1);

  if (resultado1.rows.length === 0) {
    return resposta.status(404).json({msg: "Produto não encontrado!"})
  }
  const dados2 = [id]
  const consulta2 = `delete from produto where id = $1`
  await pool.query(consulta2, dados2)
  resposta.status(200).json({msg:"Produto deletado com sucesso!"});

  } catch (error) {
    resposta.status(500).json({msg:"Erro ao deletar produto.", erro: error.message})
  }
})

app.delete("/produtos", async(requisicao, resposta) =>{
  try {
    const consulta = `delete from produto`
    await pool.query(consulta)
    resposta.status(200).json({msg:"Todos os produtos foram deletados com sucesso!"});
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao deletar todos os produtos.", erro: error.message})
  }
})



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
