const express = require('express')
const router = express.Router()
const docenteController = require('../controllers/docente-controller')
const login = require('../middleware/login');

router.delete('/excluir/:id_docente', docenteController.excluirDocente);
router.patch('/atualizar/:id_docente', docenteController.atualizarDocente)
router.get('/localizar/:id_docente', docenteController.localizarDocente)
router.get('/listar', docenteController.listarDocente)
router.post('/cadastrar', docenteController.cadastrarDocente)

module.exports = router;