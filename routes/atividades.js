const atividades = require('../models/atividades')

module.exports = (app)=>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
       // return console.log(dados)
       //conectar com o mongo
       const database = require('../config/database')()
       //importar model atividades
       const atividades = require('../models/atividades')
       //gravar as informações do formulário no database
       var gravar = await new atividades({
           data:dados.data,
           tipo:dados.tipo,
           entrega:dados.entrega,
           disciplina:dados.disciplina,
           instrucoes:dados.orientacoes,
           usuario:dados.id,
           titulo:dados.titulo
       }).save()
       
       //recarregar a página atividades
       res.redirect('/atividades?id='+dados.id)
    })
    app.get('/atividades', async(req,res)=>{
        // listar todos os usu logados
        var user = req.query.id
        if (!user) {
            res.redirect('/login')
        }
        var usuarios = require('../models/usuarios')
        var atividades = require('../models/atividades')

        var dadosuser = await usuarios.findOne ({_id:user})
        var dadosAtividades = await atividades.find({usuario:user})

        res.render('atividades.ejs', {nome:dadosuser.nome,id:dadosuser._id,lista:dadosAtividades})
    })

    app.get('/excluir', async(req,res)=>{
        //qual o doc sera exclu da collection ativis??????????????
        var doc = req.query.id
        //exclu o doc
        var excluir = await atividades.findOneAndDelete({
            _id:doc
        })
        //voltar para lista de 
        res.redirect('/atividades?id='+excluir.usuario)
    })
}
