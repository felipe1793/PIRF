const homeController = {
    index: (req, res) => {
        res.render("home/")
    },
    cadastro: (req, res) => {
        res.render("home/cadastro")
    },
    carrinho: (req, res) => {
        res.render("home/carrinho")
    },

    login: (req, res) => {
        res.render("home/login")
    },
    minhaConta: (req, res) => {
        res.render("home/minhaConta")
    },
    politica: (req, res) => {
        res.render("home/politica")
    },
    sobre: (req, res) => {
        res.render("home/sobre")
    },
    trabalheConosco: (req, res) => {
        res.render("home/trabalheConosco")
    }
}

module.exports = homeController;