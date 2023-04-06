const mysql = require('mysql'),
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crypto_wallet_test'
  })

db.connect(err => {
  if(err) {
console.log(err);
throw err;
}
console.log('it worked to MYSQL');
console.log(err);
})

module.exports = db