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

function comparePassword (validpass, loginpass) {
  return bcrypt.compareAsync(validpass, loginpass)
}

module.exports = {
  async register (req, res) {
    var sql = 'INSERT INTO User VALUES(?,?,?,?)'
    var hashedPass = await hashPassword(req.body.password)
    console.log('Hashed Password', hashedPass, 'Length', hashedPass.length)
    var sqlPara = [req.body.username, req.body.email, hashedPass, req.body.usertype]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'This email account or the user name is in use.'
        })
      }
      res.send(result)
    })
  },

  async login (req, res) {
    var sql = 'select * from User where Email = ?'
    var candidatePassword = req.body.password
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
        var pass = candidatePassword
        var flag = await comparePassword(pass, user.Password)

        if (!flag) {
          res.status(403).send({
            error: 'Wrong email & password combination.'
          })
        } else {
          var string = JSON.stringify(user)
          const userJSON = JSON.parse(string)

          res.send({
            user: user,
            token: jwtSignUser(userJSON)
          })
        }
      }
    })
  },

  async get_hashed_password (req, res) {
    var pass = req.body.passwords
    var hashed = await pass.map(pass => hashPassword(pass))

    res.send({ raw: pass, hashed: hashed })
  }
}
