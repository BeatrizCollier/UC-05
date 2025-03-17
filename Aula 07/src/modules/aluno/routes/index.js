const express = require('express');
const AlunoController = require('../controllers/index');

const router = express.Router();


router.post("/alunos", AlunoController.criar);

router.put("/aluno/:matricula", AlunoController.editar);

router.get("/alunos", AlunoController.listar);
router.get("/aluno/:matricula", AlunoController.listarPorMatricula);

router.delete("/alunos", AlunoController.excluirTodos);
router.delete("/aluno/:matricula", AlunoController.excluirPorMatricula);


module.exports = router