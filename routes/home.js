const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.login)
router.post('/login', homeController.logged)
router.get('/cadastro', homeController.cadastro);
router.get('/carrinho', homeController.carrinho);
router.get('/index', homeController.index);
router.get('/minhaConta', homeController.minhaConta);
router.get('/politica', homeController.politica);
router.get('/sobre', homeController.sobre);
router.get('/trabalheConosco', homeController.trabalheConosco);



module.exports = router