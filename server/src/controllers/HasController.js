const config = require('../config/config')
const connection = config.connection

module.exports = {
  async create (req, res) {
    var sql = `INSERT INTO Has VALUES (?, ?);`
    var sqlPara = [req.body.propertyID, req.body.farmitem]
    // var sqlPara = []
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Insert Has failed'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  }
}
