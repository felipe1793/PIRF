const user = {
    nome: null
}

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
    }
}

module.exports = homeController;