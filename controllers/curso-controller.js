const mysql = require('../mysql').pool

exports.excluirCurso = function (req, res, next) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('DELETE FROM CURSO WHERE id_curso = ?', [req.params.id_curso],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error + req.params.id_curso + " não existe" }) }
                const response = {
                    mensagem: 'Registro ' + req.params.id_curso + ' excluído com sucesso!',
                }
                return res.status(202).send(response)
            }
        )
    })
}

exports.localizarCurso = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT c.id_curso, c.nome, cor.id_coordenador as id_coordenadores, cor.nome AS coordenador
        FROM CURSO AS c
        JOIN COORDENADOR AS cor ON c.id_coordenador = cor.id_coordenador
        WHERE id_curso = ?`,
            [req.params.id_curso],
            (error, result) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não encontrado'
                    })
                }
                const response = {
                    curso: {
                        id_curso: result[0].id_curso,
                        nome: result[0].nome,
                        coordenador: result[0].coordenador,
                        id_coordenadores: result[0].id_coordenadores
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
}


exports.listarCurso = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT c.id_curso, c.nome, cor.nome as coordenador
                    FROM CURSO as c join COORDENADOR AS cor on
                    c.id_coordenador = cor.id_coordenador`, 
            function (error, result) {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    Curso: result.map(curso => {
                        return {
                            id_curso: curso.id_curso,
                            nome:     curso.nome,
                            coordenador: curso.coordenador,
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}



exports.atualizarCurso = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE CURSO SET nome=?, id_coordenador=? WHERE id_curso=?',
            [
                req.body.nome,
                req.body.id_coordenador,
                req.params.id_curso,
            ],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Registro atualizado com sucesso!',
                    coordenadorAtualizado: {
                        id_curso: req.params.id_curso,
                        nome: req.body.nome,
                        id_coordenador: req.body.id_coordenador,
                    }
                }
                res.status(202).send(response)
            })
    })
}



exports.cadastrarCurso = function (req, res) {
    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ erro: error }) }
        conn.query('SELECT * FROM CURSO  WHERE nome = ?', [req.body.nome], 
        function(error, result){
            conn.release()
            if (error) { return res.status(500).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'Já existe um curso cadastrado com esse nome' })
            }else{
                conn.query('INSERT INTO CURSO (nome, id_coordenador) VALUES (?, ?)',
                [req.body.nome, req.body.id_coordenador],
                function (error, result) {
                    if (error) { return res.status(500).send({ error: error }) }
                    var response = {
                        mensagem: 'Registro salvo com sucesso!',
                        cursoCriado: {
                            nome: req.body.nome,
                            id_coordenador: req.body.id_coordenador,
                        }
                    }
                    return res.status(201).send({ response })
                })
            }
        })     
    })
}




