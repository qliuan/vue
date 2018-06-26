const config = require('../config/config')
const connection = config.connection

module.exports = {
  async create (req, res) {
    var sql = `INSERT INTO Visit VALUES (?, ?, ?, ?);`
    var sqlPara = [req.body.username, req.body.propertyID, req.body.date, req.body.rating]
    connection.query(sql, sqlPara, function (err, result) {
      console.log('Insert Visit', req.body.username, req.body.propertyID, req.body.date, req.body.rating)
      if (err) {
        res.status(400).send({
          error: 'Insert Visit failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async delete (req, res) {
    var sql = 'delete from Visit where PropertyID=? and Username=?;'
    var sqlPara = [req.body.propertyID, req.body.username]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Delete Visit failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async checkexist (req, res) {
    var sql = 'select * from Visit where PropertyID= ? and Username= ?;'
    var sqlPara = [req.body.propertyID, req.body.username]
    console.log('in checkexist')
    console.log(req.body.propertyID)
    console.log(req.body.username)
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'check exist failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async visit_history (req, res) {
    var sql = `SELECT Name, VisitDate, Rating, ID FROM Visit, Property WHERE ID = PropertyID and Username = ?;`
    var sqlPara = [req.body.username]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'query Visit History failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async delete_property_visits (req, res) {
    var sql = `delete from Visit where PropertyID = ?;`
    var sqlPara = [req.body.propertyID]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'failed to delete all property visits'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async test (req, res) {
    console.log('testing')
    res.send({message: 'debugging'})
  }
}
