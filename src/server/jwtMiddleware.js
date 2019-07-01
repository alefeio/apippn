const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {

    return async (req, res, next) => {
        if (!deps.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token']

            if (!token) {
                res.send(403, { error: 'Token nao fornecido' })
                return false
            }

            try {
                req.decoded = jwt.verify(token, '7272e3588e014a3a0b138529cb6a92a3629a8aba')
            } catch (error) {
                res.send(403, { error: 'Falha ao autenticar o token' })
                return false
            }
        }

        next()
    }
}

module.exports = jwtMiddleware