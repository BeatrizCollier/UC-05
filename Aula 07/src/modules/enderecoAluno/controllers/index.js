const EnderecoModel = require('../models/index');

class EnderecoController{
    static async criarEndereco(requisicao, resposta){
        try {
            const {matricula, cep, numero, ponto_de_referencia} = requisicao.body;
            if(!matricula || !cep || !numero){
                return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos."})
            }
            const endereco = await EnderecoModel.criarEndereco(matricula, cep, numero, ponto_de_referencia)
            resposta.status(201).json({mensagem: "Endereço criado com sucesso!", endereco: endereco});

        } catch (error) {
            resposta.status(500).json({mensagem:'Erro interno do servidor. Por favor, tente mais tarde.', erro: error.message})
        }
    }
    static async editarEndereco(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const {cep, numero, ponto_de_referencia} = requisicao.body;
            if(!cep || !numero){
                return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos."})
            }
            const endereco = await EnderecoModel.editarEndereco(matricula, cep, numero, ponto_de_referencia);
            if (endereco.length === 0) {
                return resposta.status(400).json({msg: "Endereço não encontrado!"});
            }
            resposta.status(200).json({mensagem: "Endereço editado com sucesso!", endereco: endereco});
            
        } catch (error) {
            resposta.status(500).json({mensagem:'Erro interno do servidor. Por favor, tente mais tarde.', erro: error.message})
        }
    }

    static async listarEnderecos(requisicao, resposta){
        try {
            const enderecos = await EnderecoModel.listarEnderecos();
            if(enderecos.length === 0){
                return resposta.status(400).json({mensagem:"Não há registros a serem exibidos."})
              }
              resposta.status(200).json(enderecos);
            
        } catch (error) {
            resposta.status(500).json({mensagem:'Erro interno do servidor. Por favor, tente mais tarde.', erro: error.message})
        }
    }

    static async listarEnderecoAluno(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const endereco = await EnderecoModel.listarEndereco(matricula);
            if(endereco.length === 0){
                return resposta.status(400).json({mensagem:"Matrícula não existe ou inválida."})
              }
            resposta.status(200).json(endereco);

        } catch (error) {
            resposta.status(500).json({mensagem:'Erro interno do servidor. Por favor, tente mais tarde.', erro: error.message})
        }
    }

    static async listarEnderecoCEP(requisicao, resposta){
        try {
            const cep = requisicao.params.cep
            const endereco = await EnderecoModel.listarEnderecoCep(cep);
            if(endereco.length === 0){
                return resposta.status(400).json({mensagem:"CEP não existe ou inválido."})
              }
            resposta.status(200).json(endereco);
            
        } catch (error) {
            resposta.status(500).json({mensagem:'Erro interno do servidor. Por favor, tente mais tarde.', erro: error.message})
        }
    }

    static async listarEnderecoCidade(requisicao, resposta){
        try {
            const cidade = requisicao.params.cidade
            const endereco = await EnderecoModel.listarEnderecoCidade(cidade);
            if(endereco.length === 0){
                return resposta.status(400).json({mensagem:"Cidade não existe ou inválida."})
              }
            resposta.status(200).json(endereco);
            
        } catch (error) {
            resposta.status(500).json({mensagem:'Erro interno do servidor. Por favor, tente mais tarde.', erro: error.message})
        }
    }


}

module.exports = EnderecoController