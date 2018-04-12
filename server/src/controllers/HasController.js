const config = require('../config/config')
const connection = config.connection

module.exports = {
  async create (req, res) {
    var sql = `INSERT INTO Has VALUES (?, ?);`
    var sqlPara = [req.body.propertyID, req.body.farmitem]
    connection.query(sql, sqlPara, function (err, result) {
      console.log('Insert Has', req.body.propertyID, req.body.farmitem)
      if (err) {
        res.status(400).send({
          error: 'Insert Has failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async delete (req, res) {
    var sql = 'delete from Has where PropertyID=? and ItemName=?'
    var sqlPara = [req.body.propertyID, req.body.farmitem]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Delete Has failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  }
}
