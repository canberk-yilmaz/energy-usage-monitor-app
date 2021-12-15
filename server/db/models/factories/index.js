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

const delByName = async (request, response) => {
  const { factoryname } = request.body
  // async await
  try {
    await client.query('DELETE FROM factories WHERE factoryname = $1', [
      factoryname,
    ])
    response.status(200).send(`factory successfully deleted`)
  } catch (err) {
    console.log(err)
  }
}

const updateOne = (request, response) => {
  let keys = Object.keys(request.body)
  let values = Object.values(request.body)
  let str = ''

  for (let i = 0; i < keys.length; i++) {
    if (i == keys.length - 1) {
      str += `${keys[i]}=$${i + 1}`
    } else {
      str += `${keys[i]}=$${i + 1}, `
    }
  }

  client.query(
    `UPDATE factories SET ${str} WHERE factoryname=$1`,
    values,
    (err, res) => {
      if (!err) {
        response.status(201).send(`factory updated`)
      } else {
        console.log(err)
      }
    }
  )
}

const newFactory = (request, response) => {
  const {
    factoryname,
    membershipstart,
    membershipend,
    employeecount,
    specialmember,
  } = request.body

  client.query(
    'INSERT INTO factories VALUES ($1, $2, $3, $4, $5)',
    [factoryname, membershipstart, membershipend, employeecount, specialmember],
    (err, res) => {
      if (!err) {
        response.status(201).send(`factory ${factoryname} created`)
      } else {
        console.log(err)
      }
    }
  )
}

module.exports = {
  getAll,
  delByName,
  updateOne,
  newFactory,
}
