const sha1 = require('sha1')

const usuarios = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    SELECT id, usuario, email, nivel, ativo, cadastro FROM usuarios
                    `).spread(function(results, metadata) {
                        resolve(results)
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao listar.', reject)
                    return false
                }
            })
        },
        save: (nome, usuario, senha, email, nivel) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    INSERT INTO usuarios (nome, usuario, senha, email, nivel) VALUES ('${nome}', '${usuario}', '${sha1(senha)}', '${email}', '${nivel}')
                    `).spread(function(results, metadata) {
                        resolve({ usuario: { nome, usuario, email, nivel, id: results.insertId } })
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao salvar.', reject)
                    return false
                }
            })
        },
        update: (id, nome, usuario, senha, email, nivel) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    UPDATE usuarios SET nome = '${nome}', usuario = '${usuario}', senha = '${sha1(senha)}', email = '${email}', nivel = '${nivel}' WHERE id = ${id}
                    `).spread(function(results, metadata) {
                        resolve({ usuario: { id }, affectedRows: results.affectedRows })
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao atualizar.', reject)
                    return false
                }
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    DELETE FROM usuarios WHERE id = ${id}
                    `).spread(function(results, metadata) {
                        resolve({ message: 'Registro removido com sucesso!', affectedRows: results.affectedRows })
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao excluir.', reject)
                    return false
                }
            })
        }
    }
}

module.exports = usuarios