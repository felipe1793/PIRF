const { Produto } = require('../models')

const produto = {
    show: async (req, res) => {
        const produtos = await Produto.findAll()
        return produtos
    },
    create: async (nome, imagem, ativo, preco, descricao) => {
        return await Produto.create({
            nome: nome,
            imagem: imagem,
            ativo: ativo,
            preco: preco,
            descricao: descricao
        })
    },
    find: async (id) => {
        const produtos = await produto.show()
        return produtos.find(element => element.id == id)
    },
    update: async (id, nome, preco, ativo, descricao) => {
        return await Produto.update({
            nome: nome,
            preco: preco,
            ativo: ativo,
            descricao: descricao
        }, {
            where: {
                id: id
            }
        });
    },
    destroy: async (id) => {
        return await Produto.destroy({
            where: {
            id: id
            }
        });
    }

}

module.exports = produto