const express = require('express')
const app = express();
const morgan = require('morgan') //criar logs
const bodyParser = require('body-parser')


const rotaCoordenador = require('./routes/coordenador')
const rotaCurso = require('./routes/curso')
const rotaDisciplina = require('./routes/disciplina');
const rotaDocente = require('./routes/docente');

//var cors = require('cors');

app.use(express.json())
app.use(bodyParser.urlencoded(
    { extended: false}))//aceita dados simples
app.use(bodyParser.json()) //so aceita json de entrada no body

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header(
    'Access-Control-Allow-Header',
'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }
    next();
})
app.use(morgan('dev'))

app.use('/coordenador',rotaCoordenador)
app.use('/curso', rotaCurso)
app.use('/disciplina',rotaDisciplina);
app.use('/docente',rotaDocente);


//quando não encontra rota
app.use((req, res, next)=>{
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next )=>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    })

})

module.exports = app;
