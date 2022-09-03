var user = {
    nome: null
} 
const bCrypt = require('bcrypt')
const { Produto, Usuario, Carrinho } = require('../models')
const produtosDb = require('./produtosDbController')
const carrinhoDb = require('./carrinhoDbController')

const homeController = {
    index: async (req, res) => {
        const produtos = await produtosDb.show()
        res.render("home/", {user, produto: produtos, cont:0})
    },
    cadastro: (req, res) => {
        res.render("home/cadastro", {user})
    },
    carrinho: async (req, res) => {
        const precoTotal = await carrinhoDb.fullPrice()
        const produtoTotal = await carrinhoDb.fullProducts()
        const carrinho = await Carrinho.findAll()
        res.render("home/carrinho", {user, carrinho: carrinho, total:[precoTotal, produtoTotal]})
    },

    login: async (req, res) => {
        res.render("home/login", {user})
    },
    logIn: async (req, res) => {
        const usuarios = await Usuario.findAll()
        const {email, password} = req.body
        const usuario = usuarios.find(item => item.email == email)

        if (!usuario || password != usuario.senha ) {
            return res.status(400).json({ mensagem: "Email ou senha estão incorretos ou não existem!" });
        }

        res.cookie('usuario', usuario.email, {maxAge:900})
        
        res.redirect('/')
    },
    register: async (req, res) => {
        const usuario = await Usuario.findAll()
        const {email, password, confirmPassword, nome} = req.body
        const hash = bCrypt.hashSync(password, 10)
        await Usuario.create({nome: nome, senha: hash, email: email})
        
    },
    minhaConta: (req, res) => {
        res.render("home/minhaConta", {user})
    },
    politica: (req, res) => {
        res.render("home/politica", {user})
    },
    sobre: (req, res) => {
        res.render("home/sobre" , {user})
    },
    trabalheConosco: (req, res) => {
        res.render("home/trabalheConosco", {user})
    },
    produto: async (req, res) => {
        const {id} = req.params
        const produto = await produtosDb.find(id)
        res.render("home/produto", {user, produto: produto})
    },
    envCarrinho: async (req, res) => {
        const produtos = await produtosDb.show()
        const {id} = req.params
        const produto = await produtosDb.find(id)
        await carrinhoDb.create(produto.nome, produto.preco, produto.descricao, produto.imagem, 1, produto.hora)
        res.render("home/", {user, produto: produtos})
    },
    compraFinalizada: async (req, res) => {
        const date = new Date().toLocaleTimeString();
        const carrinho = await carrinhoDb.show()
        const precoTotal = await carrinhoDb.fullPrice()
        const produtoTotal = await carrinhoDb.fullProducts()
        res.render("home/compraFinalizada", {user, total:[precoTotal, produtoTotal], carrinho: carrinho, hora:date})
        carrinho.forEach(element => {
            carrinhoDb.destroy(element.id)
        });
    },
    teste: async (req, res) => {
        // const itens = await produtosDb.show()
        // const {id} = req.params
        // const um = await produtosDb.find(id)
        // const produtos = await Produto.findAll()
        // ----- Insert -----
        // var usuarios = await Usuario.create({nome:"Leonardo", senha:"1234"})
        // var usuarios = await Produto.create({nome:"Teste-1", imagem:"1234", ativo:false, preco:12.5, descricao:"teste de descricao"})

        // ----- Update -----
        // await Produto.update({nome: "Silmara"},{
        //     where: {
        //     id: 20
        //     }
        // }); 


        // ----- Delete -----
        // await Usuario.destroy({
        //     where: {
        //     id: 2
        //     }
        // });

        // var usuarios = await Usuario.findAll()
        // const carrinho = await Carrinho.findAll()

        // ----- pegar um por um -----
        // produtos.forEach(element => {
        //     console.log(element.nome);
        // });
        // console.log(produtos)
        // await mvc.create("trem", "ntem", false, 0.25, "mais um teste")
        // await mvc.update(20, "Yes", 55, true,"blewers")
        // await mvc.destroy(9)
        // const a = await carrinhoDb.fullProducts()
        await carrinhoDb.destroy(3)
        const b  = await Usuario.findAll()
        res.send(b)

    }
}

module.exports = homeController;