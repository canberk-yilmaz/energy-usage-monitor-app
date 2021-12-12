const Log = require('../models/log')
module.exports = async (req, res, next) => {
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
