const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
    return {
        authenticate: (email, senha) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                const queryString = 'SELECT id, email FROM usuarios WHERE email = ? AND senha = ?'
                const queryData = [email, sha1(senha)]

                connection.query(queryString, queryData, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, 'Falha ao localizar usuário.', reject)
                        return false
                    }

                    const { email, id } = results[0]
                    const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                    resolve({ token })
                })
            })
        }
    }
}

module.exports = auth