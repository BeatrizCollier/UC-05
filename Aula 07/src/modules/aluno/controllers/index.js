const AlunoModel = require('../models/index');

class AlunoController{
    static async criar(requisicao, resposta){
        try {
            //Fazer a requisação, passando os dados
            const {matricula, nome, email, senha} = requisicao.body;
            //verificar
            if (!matricula || !nome || !email || !senha) {
                return resposta.status(400).json({mensagem: "Todos os campos devem ser fornecidos."})
              }

            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha);
            resposta.status(201).json({mensagem: "Aluno criado com sucesso!", aluno: novoAluno});

        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao criar aluno", erro:error.message});
        }
    }

    static async editar(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const {nome, email, senha} = requisicao.body;
            if (!nome || !email || !senha) {
                return  resposta.status(400).json({msg: "Todos os campos devem ser preenchidos!"})
            }
            const aluno = await AlunoModel.editar(matricula, nome, email, senha);
            if (aluno.length === 0) {
                return  resposta.status(400).json({msg: "Aluno não encontrado!"});
            }
            resposta.status(200).json({msg: "Aluno editado com sucesso!"});
        
          } catch (error) {
            resposta.status(500).json({msg:"Erro ao editar aluno.", erro: error.message})
          }

    }

    static async listar(requisicao, resposta){
        try {
            const alunos = await AlunoModel.listar();
            if(alunos.length === 0){
                return resposta.status(400).json({mensagem:"Não existe alunos no banco de dados."})
              }
              resposta.status(200).json(alunos);

        } catch (error) {
            resposta.status(500).json({msg:"Erro ao listar alunos.", erro: error.message})
        }
    }

    static async listarPorMatricula(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const aluno = await AlunoModel.listarPorMatricula(matricula);
            if (aluno.length === 0) {
                return resposta.status(400).json({msg: "Aluno não encontrado!"})
              }
            resposta.status(200).json(aluno);
            
        } catch (error) {
            resposta.status(500).json({msg:"Erro ao buscar aluno pela matricula.", erro: error.message})
        }
    }

    static async excluirPorMatricula(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const aluno = await AlunoModel.listarPorMatricula(matricula);
            if (!aluno) {
            return resposta.status(404).json({msg: "Aluno não encontrado!"})
            }
            await AlunoModel.excluirPorMatricula(matricula)
            resposta.status(200).json({msg:"Aluno deletado com sucesso!"});
        
        } catch (error) {
            resposta.status(500).json({msg:"Erro ao deletar aluno.", erro: error.message})
        }
    }
    
    static async excluirTodos(requisicao, resposta){
        try {
            await AlunoModel.excluirTodos();
            resposta.status(200).json({msg:"Todos os alunos foram deletados com sucesso!"});
          } catch (error) {
            resposta.status(500).json({msg:"Erro ao deletar todos os alunos.", erro: error.message})
          }
    }
}

module.exports = AlunoController