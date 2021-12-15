const client = require('../../db')

const getAll = (request, response) => {
  client.query(
    'SELECT * FROM factorydetails ORDER BY factoryname DESC',
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
  const { factoryname } = request.query

  client
    .query('SELECT * FROM factorydetails WHERE factoryname = $1', [factoryname])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => console.log(err))
}

const update = (request, response) => {
  console.log(request.body)
  const {
    factoryname,
    department,
    daterange,
    electricalusage,
    usagefee,
    discountedusagefee,
  } = request.body
  console.log(factoryname)
  console.log(department)

  client.query(
    'UPDATE factorydetails SET factoryname = $1, department = $2, daterange = $3, electricalusage = $4, usagefee = $5, discountedusagefee = $6 WHERE factoryname = $1 AND department = $2 AND daterange = $3 AND electricalusage = $4 AND usagefee = $5 AND discountedusagefee = $6',[
      factoryname,
      department,
      daterange,
      electricalusage,
      usagefee,
      discountedusagefee
    ],
    (err, res) => {
      if (!err) {
        response.status(201).send(`factory updated`)
      } else {
        console.log(err)
      }
    }
  )
}

module.exports = {
  getAll,
  getByName,
  update,
}
