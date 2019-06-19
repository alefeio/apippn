const sha1 = require('sha1')

const usuarios = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT id, usuario, email, nivel, ativo, cadastro FROM usuarios', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar.', reject)
                        return false
                    }
                    resolve({ usuarios: results })
                })
            })
        },
        save: (nome, usuario, senha, email, nivel) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO usuarios (nome, usuario, senha, email, nivel) VALUES (?, ?, ?, ?, ?)', [nome, usuario, sha1(senha), email, nivel], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao salvar.', reject)
                        return false
                    }
                    resolve({ usuario: { nome, usuario, email, nivel, id: results.insertId } })
                })
            })
        },
        update: (id, nome, usuario, senha, email, nivel) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE usuarios SET nome = ?, usuario = ?, senha = ?, email = ?, nivel = ? WHERE id = ?', [nome, usuario, sha1(senha), email, nivel, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Falha ao atualizar.', reject)
                        return false
                    }
                    resolve({ usuario: { id }, affectedRows: results.affectedRows })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Falha ao excluir.', reject)
                        return false
                    }
                    resolve({ message: 'Registro removido com sucesso!', affectedRows: results.affectedRows })
                })
            })
        }
    }
}

module.exports = usuarios