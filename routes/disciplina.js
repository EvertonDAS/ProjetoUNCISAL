const express = require('express')
const router = express.Router()
const disciplinaController = require('../controllers/disciplina-controller')
const login = require('../middleware/login');


router.delete('/excluir/:id_disciplina', disciplinaController.excluirDisciplina);
router.patch('/atualizar/:id_disciplina', disciplinaController.atualizaDisciplina)
router.get('/localizar/:id_disciplina', disciplinaController.localizaDisciplina)
router.get('/listar', disciplinaController.listaDisciplina)
router.post('/cadastrar', disciplinaController.cadastrarDisciplina)

module.exports = router;