const express = require('express')
const router = express.Router()
const cursoController = require('../controllers/curso-controller')
const login = require('../middleware/login');

router.delete('/excluir/:id_curso', cursoController.excluirCurso);
router.patch('/atualizar/:id_curso', cursoController.atualizarCurso)
router.get('/localizar/:id_curso', cursoController.localizarCurso)
router.get('/listar', cursoController.listarCurso)
router.post('/cadastrar', cursoController.cadastrarCurso)


module.exports = router;