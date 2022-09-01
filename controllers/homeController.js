const user = {
    nome: null
}

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
    logged: async (req, res) => {
        const produtos = await produtosDb.show()
        let {email, password} = req.body
        res.redirect("/", 200, {user, produto: produtos})
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
    // ----- Aqui -----
    envCarrinho: async (req, res) => {
        const produtos = await produtosDb.show()
        const {id} = req.params
        const produto = await produtosDb.find(id)
        await carrinhoDb.create(produto.nome, produto.preco, produto.descricao, produto.imagem, 1, produto.hora)
        res.render("home/", {user, produto: produtos})
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
        // await carrinhoDb.destroy(1)
        const b  = await Carrinho.findAll()
        res.send(b)

    }
}

module.exports = homeController;