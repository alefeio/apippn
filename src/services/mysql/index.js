const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
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