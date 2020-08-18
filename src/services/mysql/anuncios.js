const anuncios = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    SELECT * FROM anuncios WHERE tipo = 2 AND ativo = 1 ORDER BY id DESC LIMIT 1
                    `).spread(function(results, metadata) {
                        resolve(results)
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao listar.', reject)
                    return false
                }
            })
        },
        principal: () => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    SELECT * FROM anuncios WHERE tipo = 1 AND ativo = 1 ORDER BY id DESC LIMIT 1
                    `).spread(function(results, metadata) {
                        resolve(results)
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao listar.', reject)
                    return false
                }
            })
        },
        save: (nome, url) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    INSERT INTO categorias (nomeCateg, urlCateg) VALUES ('${nome}' , '${url}')
                    `).spread(function(results, metadata) {
                        resolve({ categoria: { nome, url, id: results.insertId } })
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao criar.', reject)
                    return false
                }
            })
        },
        update: (id, nome, url) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                try {
                    sequelize.query(`
                    UPDATE categorias SET nomeCateg = '${nome}', urlCateg = '${url}' WHERE id = ${id}
                    `).spread(function(results, metadata) {
                        resolve({ categoria: { nome, url, id }, affectedRows: results.affectedRows })
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
                    DELETE FROM categorias WHERE id = ${id}
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

module.exports = anuncios