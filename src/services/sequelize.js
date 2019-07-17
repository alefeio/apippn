const Sequelize = require('sequelize');

var sequelize = new Sequelize('ppn_bd', 'ppn_user', 'al301159', {
  host: 'portalparanews.com.br',
  dialect: 'mysql',
  logging: false, // True caso voce deseje ver as querys no console
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  },

});

module.exports = sequelize;