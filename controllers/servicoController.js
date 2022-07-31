const Servico = require('../models/servicos');
const storage = require('../config/storage');
const fs = require('fs');
const path = require('path');
const user = {
    nome: null
}

const uploadAvatar = storage('avatar', '/servicos');

const servicoController = {
    index: (req,res) => {
        const servicos = Servico.findAll();
        // console.log(servicos);
        return res.render('adm/servicos', {servicos, user});
    },
    show: (req, res) => {
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.send(`Serviço não encontrado`);
        }
        return res.render('adm/servicos/detalhes', {servico, user});
    },
    create: (req, res) => {
        return res.render('adm/servicos/cadastro', {user});
    },
    store: (req, res) => {
        uploadAvatar(req, res, (err) => {
            const { nome, preco, ativo, descricao } = req.body
            const servico = {
                nome,
                imagem: '/img/servicos/' + req.file.filename,
                preco,
                ativo: ativo == 'on' ? true : false,
                descricao
            };
            Servico.save(servico);
            return res.render('adm/servicos/cadastro', {user});
        });

    },
    edit: (req, res) => {
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.send(`Serviço não encontrado`);
        }
        return res.render('adm/servicos/editar', {servico, user});
    },
    update: (req, res) => {
        const {id} = req.params;
        const { imagem,nome, preco, ativo, descricao} = req.body;
        const servico = {
            id,
            imagem,
            nome,
            preco,
            ativo: (ativo ? true : false),
            descricao
            };
            Servico.update(id, servico);
            return res.redirect(res.status(201),'/adm/servicos', {user});
    },
    destroy: (req, res) => {
        const servicos = Servico.findAll();
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.status(404).render('errors', {error: 'Servico não encontrado'});
        }
        
        Servico.delete(id);
        try {
            fs.unlinkSync('./public' + servico.imagem);
        }catch (error){
            console.log(error);
        }
        return res.render('adm/servicos', {servicos, user});
    }
};

module.exports = servicoController;