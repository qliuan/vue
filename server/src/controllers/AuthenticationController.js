const connection = require('../config/config').connection

module.exports = {
  register (req, res) {
    var sql = 'INSERT INTO User VALUES(?,?,?,?)'
    var sqlPara = [req.body.username, req.body.email, req.body.password, req.body.usertype]
    // var sql = 'Select Username, UserType From User Where Email=? And Password=?'
    // var sqlPara = ['qliuan@gmail.com', 'qliuan!']
    // res.send({
    //   message: `Hello ${req.body.email}! Your user account has been registered`
    // })
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        res.status(400).send({
          error: 'This email account is in use.'
        })
      }
      console.log(result)
      res.send(result)
    })
  },

  login (req, res) {
    var sql = 'select Username, UserType from User where Email = ? and Password = ?'
    var sqlPara = [req.body.email, req.body.password]
    connection.query(sql, sqlPara, function (err, result) {
      console.log(result)
      if (err) {
        res.status(500).send({
          error: 'An error has occured trying to log in'
        })
      } else if (!result.length) {
        res.status(400).send({
          error: 'Wrong email & password combination.'
        })
      } else {
        res.send({
          userName: result[0].Username,
          userType: result[0].UserType
        })
      }
    })
  }
}
