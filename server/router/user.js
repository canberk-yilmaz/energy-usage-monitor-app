const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post(
  '/signup',
  [
    check('username', 'Username is not valid')
      .not()
      .isEmpty()
      .not()
      .matches(/\d/)
      .isLength({ min: 8 }),

    check('email', 'email is not valid').isEmail(),

    check(
      'password',
      'The password must be 8+ chars long and contain a number, lowercase and uppercase letter.'
    )
      .isLength({
        min: 8,
      })
      .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/),
  ],
  async (req, res) => {
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { username, email, password, role } = req.body // password = 12345678  => afregfsgsrtarettf.

    try {
      user = new User({ username, email, password, role })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt) // x-access-token

      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 10000 },
        (err, token) => {
          if (err) throw err
          res.status(200).json({
            token,
          }) // "token": "sggqergtjuj75u7"
        }
      )
    } catch (e) {
      res.status(500).json({ e })
    }
  }
)

router.post(
  '/signin',
  [
    check('email', 'email is not valid').isEmail(),
    check(
      'password',
      'The password must be 8+ chars long and contain a number, lowercase and uppercase letter.'
    )
      .isLength({
        min: 8,
      })
      .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/),
  ],
  async (req, res) => {
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).send('Email does not exist')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).send('Incorrect password')
      }
      const payload = {
        user: {
          user: user.id,
        },
      }

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 10000 },
        (err, token) => {
          if (err) throw err
          res
            .status(200)
            .json({ token: token, email: user.email, username: user.username })
        }
      )
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: e,
      })
    }
  }
)

// router.post('/settings/', async (req, res) => {
//   const { email } = req.body
//   try {
//     const user = await User.findBy({ email })
//     res.status(201).json({ user })
//   } catch (e) {
//     res.send('User Settings Error')
//   }
// })

router.put(
  '/settings/',
  [
    check('username', 'Username is not valid')
      .not()
      .isEmpty()
      .not()
      .matches(/\d/)
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(406).json({
        errors: errors.array(),
      })
    }

    console.log(req.body)
    try {
      const doc = await User.findOneAndUpdate(
        { email: req.body.email },
        { username: req.body.username }
      )
      res.status(201).json({ doc })
    } catch (e) {
      res.send('User Settings Error')
    }
  }
)

module.exports = router
