const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'portalparanews.com.br',
    user: 'ppn_user',
    password: 'al301159',
    database: 'ppn_bd'
})

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error) 
    rejectFunction({ error: msg })
}

const postsModule = require('./posts')({ connection, errorHandler })
const categoriasModule = require('./categorias')({ connection, errorHandler })
const usuariosModule = require('./usuarios')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })
const anunciosModule = require('./anuncios')({ connection, errorHandler })

module.exports = {
    posts: () => postsModule,
    categorias: () => categoriasModule,
    usuarios: () => usuariosModule,
    auth: () => authModule,
    anuncios: () => anunciosModule
} 