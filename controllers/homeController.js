const user = {
    nome: null
}

const { Produto, Usuario } = require('../models')

const homeController = {
    index: (req, res) => {
        res.render("home/", {user})
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
        const produtos = await Produto.findAll()
        // ----- Insert -----
        // var usuarios = await Usuario.create({nome:"Leonardo", senha:"1234"})

        // ----- Update -----
        // await Usuario.update({nome: "Silmara"},{
        //     where: {
        //     id: 3
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

        console.log(produtos)
        res.send(usuarios)

    }
}

module.exports = homeController;