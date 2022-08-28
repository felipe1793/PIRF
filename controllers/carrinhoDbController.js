const {Carrinho} = require("../models")


const carrinhoController = {
    fullPrice: async () => {
        var price = 0
        const produtos = await Carrinho.findAll()
        produtos.forEach(element => price += element.preco);
        return price
    },
    fullProducts: async () => {
        var products = 0
        const produtos = await Carrinho.findAll()
        produtos.forEach(element => products += element.qtd);
        return products
    }
} 

module.exports = carrinhoController