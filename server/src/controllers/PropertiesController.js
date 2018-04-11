const config = require('../config/config')
const connection = config.connection

module.exports = {
  async owner_overview (req, res) {
    var sql = `select Name, Street, City, Zip, Size, PropertyType, IsPublic,IsCommercial, ID, (ApprovedBy is not null) as IsValid, count(*) as Visits, avg(Rating) as Avg_Rating from Property left outer join Visit on PropertyID = ID where Owner = ? group by ID order by Name;`
    // var sqlPara = [req.body.username]
    var sqlPara = ['farmowner']
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying owner properties'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async owner_property_detail (req, res) {
    var sql = `select Name, Owner, Email, Street, City, Zip, Size, PropertyType, IsPublic,IsCommercial, ID, (ApprovedBy is not null) as IsValid, count(*) as Visits, avg(Rating) as Avg_Rating from (Property left outer join Visit on PropertyID = ID) left outer join User on Property.Owner = User.Username where ID = ? group by ID order by Name;`
    var sqlPara = [req.body.id]
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying owner properties'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  },

  async owner_others_overview (req, res) {
    var sql = `select Name, Street, City, Zip, Size, PropertyType, IsPublic,IsCommercial, ID, (ApprovedBy is not null) as IsValid, count(*) as Visits, avg(Rating) as Avg_Rating from Property left outer join Visit on PropertyID = ID where Owner != ? and ApprovedBy is not null group by ID order by Name;`
    // var sqlPara = [req.body.username]
    var sqlPara = ['farmowner']
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from querying owner properties'
        })
        return
      }
      console.log(result)
      res.send(result)
    })
  }
}
