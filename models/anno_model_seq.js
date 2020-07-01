const Sequelize = require('sequelize');
const db = require('../config/database');

const Anno = db.define('Announcemen', {
  title: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.STRING
  }
 
});

Anno.sync().then(() => {
  console.log('table created');
});
module.exports = Anno;