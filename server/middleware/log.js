const Log = require('../models/log')
module.exports = async (req, res, next) => {
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
    let requestBody = {
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
    }
    let path = req.path
    let log = new Log({ requestBody, path, ...req.user })
    await log.save()
    next()
  } catch (e) {
    console.log(e)
    res.send('log module error')
  }
}
