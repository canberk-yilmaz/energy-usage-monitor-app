const client = require('../../db')

const getAll = (request, response) => {
  client.query('SELECT * FROM factories', (err, res) => {
    if (!err) {
      response.status(200).json(res.rows)
    } else {
      console.log(err)
    }
  })
}
module.exports = {
  getAll,
}
