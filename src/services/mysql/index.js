const mysql = require('mysql')
const sequelize = require('../sequelize')

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg })
}

const postsModule = require('./posts')({ sequelize, errorHandler })
const categoriasModule = require('./categorias')({ sequelize, errorHandler })
const usuariosModule = require('./usuarios')({ sequelize, errorHandler })
const authModule = require('./auth')({ sequelize, errorHandler })
const anunciosModule = require('./anuncios')({ sequelize, errorHandler })

module.exports = {
    posts: () => postsModule,
    categorias: () => categoriasModule,
    usuarios: () => usuariosModule,
    auth: () => authModule,
    anuncios: () => anunciosModule
} 
