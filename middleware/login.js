//A FUNÇÃO ABAIXO NÃO ESTÁ EM USO NO PROJETO

const jwt = require('jsonwebtoken');

exports.obrigatorio =(req, res, next)=>{
    try {
        const token =   req.body.authorization.split('')[1]
        //const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        res.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({mensagem : 'Usuário não logado'})
    }
}

exports.opcional =(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        res.usuario = decode;
        next();
    } catch (error) {
        next()
    }
}

