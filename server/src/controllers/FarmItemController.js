const config = require('../config/config')
const connection = config.connection

module.exports = {
  async register (req, res) {
    var sql = `select Name from FarmItem where Type = 'ANIMAL';`// dummy value
    if (req.body.Proptype === 'FARM') {
      if (req.body.isAnimal === true) {
        sql = `select Name from FarmItem where Type = 'ANIMAL';`
      } else {
        sql = `select Name from FarmItem where Type != 'ANIMAL';`
      }
    } else if (req.body.Proptype === 'GARDEN') {
      sql = `select Name from FarmItem where Type = 'FLOWER' or Type ='VEGETABLE';`
    } else {
      sql = `select Name from FarmItem where Type = 'FRUIT' or Type ='NUT';`
    }
    connection.query(sql, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying FarmItem'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async get_property_items (req, res) {
    var sql = 'select Name, Type from FarmItem join Has on PropertyID = ? and ItemName = Name;'
    var sqlPara = [req.body.id]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying FarmItem'
        })
        return
      }
      res.send(result)
    })
  }
}
