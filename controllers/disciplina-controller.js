const mysql = require('../mysql').pool

exports.excluirDisciplina = function(req, res, next){
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('DELETE FROM DISCIPLINA WHERE id_disciplina = ?', [req.params.id_disciplina],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error + req.body.id_disciplina + " não existe" }) }
                const response = {
                    mensagem: 'Registro ' + req.params.id_disciplina + ' excluído com sucesso!',
                }
                return res.status(202).send(response)
            }
        )
    })
}

exports.localizaDisciplina = function(req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT c.id_disciplina, c.nome, c.horas, c.periodo, doc.id_docente as id_docentes, doc.nome AS docente, cur.id_curso as id_cursos, cur.nome AS curso
        FROM DISCIPLINA AS c
        JOIN DOCENTE AS doc ON c.id_docente = doc.id_docente
        JOIN CURSO AS cur ON c.id_curso = cur.id_curso
        WHERE id_disciplina = ?`,
            [req.params.id_disciplina],
            (error, result) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não encontrado'
                    })
                }
                const response = {
                    disciplina: {
                        id_disciplina: result[0].id_disciplina,
                        nome: result[0].nome,
                        curso: result[0].curso,
                        id_cursos: result[0].id_cursos,
                        docente: result[0].docente,
                        id_docentes: result[0].id_docentes,
                        horas: result[0].horas,
                        periodo: result[0].periodo,
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
}


exports.listaDisciplina = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT c.id_disciplina, c.nome, c.horas, c.periodo,  doc.nome AS docente, cur.nome AS curso
                    FROM DISCIPLINA AS c
                    JOIN DOCENTE AS doc ON c.id_docente = doc.id_docente
                    JOIN CURSO AS cur ON c.id_curso = cur.id_curso;
         `,
            //o segundo parametro é onde fica armazenado o resultado da query pode ser usado quaquer nome 
            function (error, result) {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                
                const response = {
                    quantidade: result.length,
                    Disciplinas: result.map(disc => {
                        return {
                            id_disciplina: disc.id_disciplina,
                            curso: disc.curso,
                            disciplina: disc.nome,
                            docente: disc.docente,
                            horas: disc.horas,
                            periodo: disc.periodo,                           
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}



exports.atualizaDisciplina = function (req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE DISCIPLINA SET  nome=?, horas=?, id_curso=?, id_docente=?,  periodo=? WHERE id_disciplina=?',
            [   
               
                req.body.nome,
                req.body.horas,
                req.body.id_curso,
                req.body.id_docente,
                req.body.periodo,
                req.params.id_disciplina,
            ],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Registro atualizado com sucesso!',
                    disciplinaAtualizado: {
                        id_disciplina: req.body.id_disciplina,
                        nome: req.body.nome,
                        horas: req.body.horas,
                        id_curso: req.body.id_curso,
                        id_docente: req.body.id_docente,
                        periodo: req.body.periodo,
                        
                    }
                }
                res.status(202).send(response)
            })
        })
}



exports.cadastrarDisciplina = function (req, res) {
    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ erro: error }) }
        conn.query('SELECT * FROM DISCIPLINA WHERE nome = ?',
            [req.body.nome],
            function (error, result) {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length > 0) {
                    res.status(409).send({ mensagem: 'Já existe uma disciplina cadastrada com esse nome' })
                } else {
                    if (error) { return res.status(500).send({ error: error }) }
                        conn.query('INSERT INTO DISCIPLINA (nome, horas, id_curso, id_docente, periodo) VALUES (? ,?, ?, ?, ?)',
                            [req.body.nome, req.body.horas, req.body.id_curso, req.body.id_docente, req.body.periodo],
                            function (error, result) {
                              
                                if (error) { return res.status(500).send({ error: error }) }
                                var response = {
                                    mensagem: 'Registro salvo com sucesso!',
                                    disciplinaCriada: {
                                        id_disciplina: req.body.id_disciplina,
                                        nome: req.body.nome,
                                        id_curso: req.body.id_curso,
                                        id_docente: req.body.id_docente,
                                        horas: req.body.horas,
                                        periodo: req.body.periodo

                                    }
                                }
                                return res.status(201).send({ response })
                            })
                    }
            })
    })
}

