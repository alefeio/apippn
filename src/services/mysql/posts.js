const posts = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM blog', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar.', reject)
                        return false
                    }
                    resolve({ posts: results })
                })
            })
        },
        save: (post) => {

        },
        update: (post) => {

        },
        del: (id) => {

        }
    }
}

module.exports = posts