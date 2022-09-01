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
    },
    create: async (nome, preco, descricao, imagem, qtd, hora) => {
        return await Carrinho.create({
            nome_produto: nome,
            preco: preco,
            descricao: descricao,
            imagem: imagem,
            qtd: qtd,
            hora: hora
        })
    },
    destroy: async (id) => {
        return await Carrinho.destroy({
            where: {
            id: id
            }
        });
    }
} 

module.exports = carrinhoController