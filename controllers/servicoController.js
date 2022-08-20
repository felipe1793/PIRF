const Servico = require('./servicos');
const storage = require('../config/storage');
const fs = require('fs');
const path = require('path');
const { Produto } = require("../models")
const produtos = require('./produtosDbController');
const produtoDb = require('./produtosDbController');
const user = {
    nome: null
}

const uploadAvatar = storage('avatar', '/servicos');

const servicoController = {
    index: async (req,res) => {
        const servicos = await Produto.findAll();
        return res.render('adm/servicos', {servicos, user});
    },
    show: async (req, res) => {
        const {id} = req.params;
        const produtos = await Produto.findAll();
        const produto = produtos.find(item => id == item.id);
        if(!produto) {
            return res.send(`Serviço não encontrado`);
        }
        return res.render('adm/servicos/detalhes', {produto, user});
    },
    create: (req, res) => {
        return res.render('adm/servicos/cadastro', {user});
    },
    store: (req, res) => {
        uploadAvatar(req, res, async function (err) {
            const { nome, preco, ativo, descricao } = req.body
            const servico = {
                
                nome,
                imagem: '/img/servicos/' + req.file.filename,
                preco,
                ativo: ativo == 'on' ? true : false,
                descricao
            };
            const produto = await Produto.create({nome:servico.nome, imagem:servico.imagem, ativo:servico.ativo, preco:servico.preco, descricao:servico.descricao})
            Servico.save(servico);
            return res.render('adm/servicos/sucesso', {user, opcao: "cadastrado"});
        });
        
    },
    edit: async (req, res) => {
        const {id} = req.params;
        // ----- antigo -----
        // const servico = Servico.findById(id);
        // if(!servico) {
        //             return res.send(`Serviço não encontrado`);
        //         }
            const servico = await produtoDb.find(id)
            if(!servico) {
                return res.send(`Serviço não encontrado`);
            }
            return res.render('adm/servicos/editar', {servico, user});
        },
    update: async (req, res) => {
        // const servicos = await Produto.findAll();
        const {id} = req.params;
        const {nome, preco, ativo, descricao} = req.body;
        produtoDb.update(id, nome, preco, ativo, descricao)
        return res.render('adm/servicos/sucesso', { user, opcao: "alterado"});
        // ----- Antigo -----
        // const servico = {
        //     id,
        //     imagem,
        //     nome,
        //     preco,
                //     ativo: (ativo ? true : false),
                //     descricao
                //     };
                // Servico.update(id, servico);
    },
    destroy: async (req, res) => {
        // ----- Antigo -----
        // const servicos = Servico.findAll();
        // const servico = Servico.findById(id);
        const {id} = req.params;
        // const servico = Servico.findById(id)
        await produtoDb.destroy(id)
        // if(!servico) {
        //     return res.status(404).render('errors', {error: 'Servico não encontrado'});
        // }
        
        Servico.delete(id);
        try {
            fs.unlinkSync('./public' + servico.imagem);
        }catch (error){
            console.log(error);
        }
        return res.render('adm/servicos/sucesso', {user, opcao: "deletado"});
    }
};

module.exports = servicoController;