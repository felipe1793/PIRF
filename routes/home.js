const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.index)
router.post('/register', homeController.register)
router.get('/cadastro', homeController.cadastro);
router.get('/carrinho', homeController.carrinho);
router.get('/login', homeController.login);
router.post('/login', homeController.logIn)
router.get('/minhaConta', homeController.minhaConta);
router.get('/politica', homeController.politica);
router.get('/sobre', homeController.sobre);
router.get('/trabalheConosco', homeController.trabalheConosco);
router.get('/teste', homeController.teste)
router.get('/compra/:id', homeController.produto);
router.post('/compra/:id', homeController.envCarrinho);
router.post('/compraFinalizada', homeController.compraFinalizada);



module.exports = router