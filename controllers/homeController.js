const user = {
    nome: null
}

const { Produto, Usuario } = require('../models')
const produtosDb = require('./produtosDbController')

const homeController = {
    index: async (req, res) => {
        const produtos = await produtosDb.show()
        res.render("home/", {user, produto: produtos, cont:0})
    },
    cadastro: (req, res) => {
        res.render("home/cadastro", {user})
    },
    carrinho: (req, res) => {
        res.render("home/carrinho", {user})
    },

    login: (req, res) => {
        res.render("home/login", {user})
    },
    logged: (req, res) => {
        let {email, password} = req.body
        res.redirect("/index")
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
    teste: async (req, res) => {
        const itens = await produtosDb.show()
        const {id} = req.params
        const um = await produtosDb.find(id)
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

        var usuarios = await Usuario.findAll()

        // ----- pegar um por um -----
        // produtos.forEach(element => {
        //     console.log(element.nome);
        // });
        // console.log(produtos)
        // await mvc.create("trem", "ntem", false, 0.25, "mais um teste")
        // await mvc.update(20, "Yes", 55, true,"blewers")
        // await mvc.destroy(9)
        res.send(um)

    }
}

module.exports = homeController;