const restify = require('restify')
const server = restify.createServer()
const routes = require('../http/routes')
const cors = require('./cors')
const jwtMiddleware = require('./jwtMiddleware')
const fs = require('fs')

const exclusions = ['/autenticacao', '/categorias', '/posts', '/destaques-principais', '/destaques-laterais', '/anuncios', '/noticias-para', '/noticias-nacionais', '/por-categoria', '/posts-populares', '/mais-curtidas', '/mais-comentadas']

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
// server.use(jwtMiddleware({ exclusions }))

routes(server)

module.exports = server