const { Client } = require('pg')
require('dotenv').config()

const connectionString = process.env.pgURI
//elephantsql

// const connectionData = {
//   host: 'localhost',
//   user: 'postgres',
//   port: 5432,
//   password: process.env.pgPass,
//   database: 'Energy'
// }

var client = new Client(connectionString)
client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err)
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    console.log(result.rows[0].theTime)
    // >> output: 2018-08-23T14:02:57.117Z
  })
})

module.exports = client
