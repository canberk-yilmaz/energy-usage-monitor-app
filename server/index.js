const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const user = require('./router/user')
const log = require('./middleware/log')
const logs = require('./router/logs')
const bodyParser = require('body-parser')
const db = require('./db/index.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(
  process.env.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to mongodb...')
    }
  }
)

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(process.env.PORT + 'listening...')
  }
})

app.use('/api/user', logs, user)
app.use('/api/logs', logs)

app.get('/api/factories', db.factories.getAll)
app.delete('/api/factories', db.factories.delByName)
app.patch('/api/factories', db.factories.updateOne)
app.post('/api/factories', db.factories.newFactory)

app.get('/api/factories/factoryusage', db.factorydetails.getByName)
app.get('/api/factories/factoryusageall', db.factorydetails.getAll)
app.patch('/api/factories/factoryusage', db.factorydetails.update)
