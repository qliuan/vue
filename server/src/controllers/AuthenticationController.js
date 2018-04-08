const config = require('../config/config')
const connection = config.connection
const jwt = require('jsonwebtoken')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (password) {
  const SALT_FACTOR = 8
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(password, salt, null))
}

function comparePassword (validpass, pass) {
  return bcrypt.compareAsync(validpass, pass)
}

module.exports = {
  async register (req, res) {
    var sql = 'INSERT INTO User VALUES(?,?,?,?)'
    var hashedPass = await hashPassword(req.body.password)
    var sqlPara = [req.body.username, req.body.email, hashedPass, req.body.usertype]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'This email account or the user name is in use.'
        })
        return
      }
      res.send(result)
    })
  },

  async login (req, res) {
    var sql = 'select * from User where Email = ?'
    var hashedPass = await hashPassword(req.body.password)
    var sqlPara = [req.body.email]
    connection.query(sql, sqlPara, async function (err, result) {
      if (err) {
        res.status(500).send({
          error: 'An error has occured trying to log in'
        })
      } else if (!result.length) {
        res.status(403).send({
          error: 'No account found'
        })
      } else {
        const user = result[0]
        var flag = await comparePassword(user.Password, hashedPass)
        console.log('userpass:', user.Password, '/nhashed:', hashedPass, '/nvalid:', flag)
        res.status(403).send({
          error: 'Wrong email & password combination.'
        })

        var string = JSON.stringify(user)
        const userJSON = JSON.parse(string)

        res.send({
          userName: user.Username,
          userType: user.UserType,
          token: jwtSignUser(userJSON)
        })
      }
    })
  }
}
