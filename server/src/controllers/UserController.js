const config = require('../config/config')
const connection = config.connection

module.exports = {
  async get_visitors (req, res) {
    var sql = `select A.Username, A.Email, sum(!isnull(B.Username)) as Logs from User as
    A left outer join Visit as B on A.Username = B.Username where
    A.UserType = "VISITOR" group by A.Username order by A.Username;`
    connection.query(sql, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying FarmItem'
        })
        return
      }
      res.send(result)
    })
  },

  async get_owners (req, res) {
    var sql = `select Username, Email, sum(!isnull(Owner)) as PropNum from User left outer
      join Property on Username = Owner where UserType = "OWNER" group
      by Username order by Username;`
    connection.query(sql, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying FarmItem'
        })
        return
      }
      res.send(result)
    })
  },

  async delete_account (req, res) {
    var sql = `delete from User where Username = ?;`
    var sqlPara = [req.body.username]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(401).send({
          error: 'Errors encountered from deleting a visitor'
        })
        return
      }
      res.send(result)
    })
  },

  async delete_log (req, res) {
    var sql = `delete from Visit where UserName = ?;`
    var sqlPara = [req.body.username]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from deleting logs of a visitor'
        })
        return
      }
      res.send(result)
    })
  }
}
