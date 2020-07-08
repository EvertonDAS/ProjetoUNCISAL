const mysql = require('../mysql').pool

exports.excluirDocente = function (req, res, next) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('DELETE FROM DOCENTE WHERE id_docente = ?', [req.params.id_docente],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error + req.params.id_docente + " não existe" }) }
                const response = {
                    mensagem: 'Registro ' + req.params.id_docente + ' excluído com sucesso!',
                }
                return res.status(202).send(response)
            }
        )
    })
}

exports.localizarDocente = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT d.id_docente, d.nome, d.matricula, d.id_curso , d.dias, c.id_curso as id_cursos, c.nome as curso
                    FROM DOCENTE as d
                    JOIN CURSO AS c ON d.id_curso = c.id_curso
                    WHERE id_docente = ?`,
            [req.params.id_docente],
            (error, result) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não encontrado'
                    })
                }
                const response = {
                    Docente: {
                        id_docente: result[0].id_docente,
                        nome: result[0].nome,
                        matricula: result[0].matricula,
                        curso:     result[0].curso,
                        id_cursos: result[0].id_cursos,
                        dias: result[0].dias
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
}


exports.listarDocente = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT d.id_docente, d.nome, d.matricula, d.id_curso, d.dias, c.nome as curso
                    FROM DOCENTE as d
                    JOIN CURSO AS c ON d.id_curso = c.id_curso `,
            //o segundo parametro é onde fica armazenado o resultado da query pode ser usado quaquer nome 
            function (error, result) {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                
                const response = {
                    quantidade: result.length,
                    Docente: result.map(doc => {
                        return {
                            id_docente: doc.id_docente,
                            nome: doc.nome,
                            matricula: doc.matricula,
                            curso: doc.curso,
                            dias: doc.dias,                          
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}



exports.atualizarDocente = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE DOCENTE SET nome=?, matricula=?, id_curso=?, dias=? WHERE id_docente=?',
            [
                req.body.nome,
                req.body.matricula,
                req.body.id_curso,
                req.body.dias,
                req.params.id_docente,
            ],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Registro atualizado com sucesso!',
                    docenteAtualizado: {
                        id_docente: req.params.id_docente,
                        nome: req.body.nome,
                        ano: req.body.matricula,
                        id_coordenador: req.body.id_curso,
                        dias: req.body.dias,
                    }
                }
                res.status(202).send(response)
            })
    })
}
exports.cadastrarDocente = function (req, res) {
    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ erro: error }) }
        conn.query("SELECT * FROM DOCENTE WHERE matricula = ?", [req.body.matricula],
        function(error, results){
            conn.release()
            if(error){ return res.status(500).send({error: error})}
            if(results.length > 0){
                res.status(409).send({mensagem: 'Já existe um docente cadastrado com essa matricula'})
            }else{
                conn.query('INSERT INTO DOCENTE (nome, matricula, id_curso, dias) VALUES (? ,?, ?, ?)',
            [req.body.nome, req.body.matricula,  req.body.id_curso, req.body.dias],
            function (error, result) {
                if (error) { return res.status(500).send({ error: error }) }
                var response = {
                    mensagem: 'Registro salvo com sucesso!',
                    DocenteCriado: {
                        nome: req.body.nome,
                        matricula: req.body.matricula,
                        curso: req.body.id_curso,
                        dias: req.body.dias,
                    }
                }
                return res.status(201).send({ response })
            })
            }
        })
    })
}




