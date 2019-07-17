const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
    return {
        authenticate: (email, senha) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps


                try {
                    sequelize.query(`
                    SELECT id, email FROM usuarios WHERE email = '${email}' AND senha = '${sha1(senha)}'
                    `).spread(function(results, metadata) {
                        const { email, id } = results[0]
                        const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                        resolve({ token })
                    })    
                }catch(err){
                    errorHandler(error, 'Falha ao localizar usuário.', reject)
                    return false
                }
               
            })
        }
    }
}

module.exports = auth