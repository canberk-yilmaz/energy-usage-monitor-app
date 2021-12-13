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

app.use('/api/user', log, user)
app.use('/api/logs', logs)

app.get('/api/factories', db.factories.getAll)
