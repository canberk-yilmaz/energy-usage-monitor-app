const router = require('express').Router()
const Log = require('../models/log')

router.get('/all', async (req, res) => {
  //set header first to allow request or origin domain (value can be different)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE'
  )

  //---- other code

  //Preflight CORS handler
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      body: 'OK',
    })
  }
  try {
    const logs = await Log.find()
    res.status(201).json({ logs, LogsLength: logs.length })
  } catch (e) {
    res.send('me error')
  }
})

module.exports = router
