const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.index)
router.get('/cadastro', homeController.cadastro);
router.get('/carrinho', homeController.carrinho);
router.get('/login', homeController.login);
router.get('/minhaConta', homeController.minhaConta);
router.get('/politica', homeController.politica);
router.get('/sobre', homeController.sobre);
router.get('/trabalheConosco', homeController.trabalheConosco);



module.exports = router