const client = require('../db')

const getAll = (request, response) => {
  client.query(
    'SELECT * FROM factorydetails ORDER BY factoryName DESC',
    (err, res) => {
      if (!err) {
        response.status(200).json(res.rows)
      } else {
        console.log(err)
      }
    }
  )
}

const getByName = (request, response) => {
  const { name } = request.body

  // promise
  client
    .query('SELECT * FROM factorydetails WHERE factoryName = $1', [name])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => console.log(err))
}

module.exports = {
  getAll,
  getByName,
}
