const express = require('express')
const router = express.Router()
const coordenadorController = require('../controllers/coordenador-controller')
const login = require('../middleware/login');


router.delete('/excluir/:id_coordenador', coordenadorController.excluirCoordenador);
router.patch('/atualizar/:id_coordenador',coordenadorController.atualizaCoordenador)
router.get('/localizar/:id_coordenador', coordenadorController.localizaCoordenador)
router.get('/listar', coordenadorController.listaCoordenador)
router.post('/cadastrar', coordenadorController.cadastrarCoordenador)
router.post('/login', coordenadorController.loginCoordenador)

module.exports = router;