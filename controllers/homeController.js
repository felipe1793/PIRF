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
        const { cookies } = req
        res.render("home/", {user: cookies, produto: produtos, cont:0})
    },
    cadastro: (req, res) => {
        const { cookies } = req
        res.render("home/cadastro", {user: cookies})
    },
    carrinho: async (req, res) => {
        const { cookies } = req
        const precoTotal = await carrinhoDb.fullPrice()
        const produtoTotal = await carrinhoDb.fullProducts()
        const carrinho = await Carrinho.findAll()
        res.render("home/carrinho", {user: cookies, carrinho: carrinho, total:[precoTotal, produtoTotal]})
    },

    login: async (req, res) => {
        const { cookies } = req
        res.render("home/login", {user:cookies})
    },
    logIn: async (req, res) => {
        const usuarios = await Usuario.findAll()
        const {email, password} = req.body
        const usuario = usuarios.find(item => item.email == email)
        
        if (!usuario || password != usuario.senha ) {
            return res.status(400).json({ mensagem: "Email ou senha estão incorretos ou não existem!" });
        }

        res.cookie('usuario', usuario.nome)
        
        res.redirect('/')
    },
    register: async (req, res) => {
        const usuario = await Usuario.findAll()
        const {email, password, confirmPassword, nome} = req.body
        const hash = bCrypt.hashSync(password, 10)
        await Usuario.create({nome: nome, senha: hash, email: email})
        
    },
    minhaConta: (req, res) => {
        const { cookies } = req
        res.render("home/minhaConta", {user: cookies})
    },
    politica: (req, res) => {
        const { cookies } = req
        res.render("home/politica", {user: cookies})
    },
    sobre: (req, res) => {
        const { cookies } = req
        res.render("home/sobre" , {user: cookies})
    },
    trabalheConosco: (req, res) => {
        const { cookies } = req
        res.render("home/trabalheConosco", {user:cookies})
    },
    produto: async (req, res) => {
        const { cookies } = req
        const {id} = req.params
        const produto = await produtosDb.find(id)
        res.render("home/produto", {user:cookies, produto: produto})
    },
    envCarrinho: async (req, res) => {
        const { cookies } = req
        const produtos = await produtosDb.show()
        const {id} = req.params
        const produto = await produtosDb.find(id)
        await carrinhoDb.create(produto.nome, produto.preco, produto.descricao, produto.imagem, 1, produto.hora)
        res.render("home/", {user: cookies, produto: produtos})
    },
    compraFinalizada: async (req, res) => {
        const { cookies } = req
        const date = new Date().toLocaleTimeString();
        const carrinho = await carrinhoDb.show()
        const precoTotal = await carrinhoDb.fullPrice()
        const produtoTotal = await carrinhoDb.fullProducts()
        res.render("home/compraFinalizada", {user: cookies, total:[precoTotal, produtoTotal], carrinho: carrinho, hora:date})
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
        // await carrinhoDb.destroy(3)
        res.clearCookie('usuario')
        const b  = await Usuario.findAll()
        res.send(b)

    }
}

module.exports = homeController;