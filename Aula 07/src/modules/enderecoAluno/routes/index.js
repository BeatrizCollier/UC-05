const express = require('express');
const EnderecoController = require('../controllers/index');

const router = express.Router();


router.post("/endereco", EnderecoController.criarEndereco);

router.put("/endereco/:matricula", EnderecoController.editarEndereco);


router.get("/enderecos", EnderecoController.listarEnderecos);
router.get("/endereco/aluno/:matricula", EnderecoController.listarEnderecoAluno);
router.get("/endereco/cep/:cep", EnderecoController.listarEnderecoCEP);
router.get("/endereco/cidade/:cidade", EnderecoController.listarEnderecoCidade);



module.exports = router