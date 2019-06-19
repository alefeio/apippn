const categorias = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM categorias', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar.', reject)
                        return false
                    }
                    resolve({ categorias: results })
                })
            })
        },
        save: (nome, url) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO categorias (nomeCateg, urlCateg) VALUES (?, ?)', [nome, url], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao salvar.', reject)
                        return false
                    }
                    resolve({ categoria: { nome, url, id: results.insertId } })
                })
            })
        },
        update: (id, nome, url) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE categorias SET nomeCateg = ?, urlCateg = ? WHERE id = ?', [nome, url, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Falha ao atualizar.', reject)
                        return false
                    }
                    resolve({ categoria: { nome, url, id }, affectedRows: results.affectedRows })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM categorias WHERE id = ?', [id], (error, results) => {
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

module.exports = categorias