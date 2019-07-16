const mysql = require('mysql')

const db_config = {
    host: 'portalparanews.com.br',
    user: 'ppn_user',
    password: 'al301159',
    database: 'ppn_bd'
}

var connection;

function handleDisconnect() {
  console.log('Conectando com o banco');  
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
      }
  });
}

handleDisconnect();

// init connection
connection = mysql.createConnection(db_config);

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
