const db = require('../services/mysql')

const routes = (server) => {

    server.post('/autenticacao', async (req, res, next) => {
        try {
            const { email, senha } = req.params
            res.send(await db.auth().authenticate(email, senha))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    
    server.get('/posts', async (req, res, next) => {
        try {
            res.send(await db.posts().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/categorias', async (req, res, next) => {
        try {
            res.send(await db.categorias().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/usuarios', async (req, res, next) => {
        try {
            res.send(await db.usuarios().all())
        } catch (error) {
            res.send(error)
        }
    })

    server.post('/categoria', async (req, res, next) => {
        const { nome, url } = req.params
        try {
            res.send(await db.categorias().save(nome, url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/usuario', async (req, res, next) => {
        const { nome, usuario, email, senha, nivel } = req.params
        try {
            res.send(await db.usuarios().save(nome, usuario, senha, email, nivel))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.put('/categoria', async (req, res, next) => {
        const { id, nome, url } = req.params
        try {
            res.send(await db.categorias().update(id, nome, url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.put('/usuario', async (req, res, next) => {
        const { id, nome, usuario, senha, email, nivel } = req.params
        try {
            res.send(await db.usuarios().update(id, nome, usuario, senha, email, nivel))
        } catch (error) {
            res.send(error)
        }
    })

    server.del('/categoria', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.categorias().del(id))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.del('/usuario', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.usuarios().del(id))
        } catch (error) {
            res.send(error)
        }
    })

    server.get('/', (req, res, next) => {
        res.send('silencio...')
        next()
    })
}

module.exports = routes