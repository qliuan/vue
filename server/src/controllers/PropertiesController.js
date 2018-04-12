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
      res.send(result)
    })
  },

  async getid_byname (req, res) {
    var sql = `select ID from Property where Name = ? ;`
    var sqlPara = [req.body.propertyName]
    // var sqlPara = []
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from get property id by Name'
        })
        return
      }
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
          error: 'Errors encountered from querying owner properties'})
        return
      }
      res.send(result)
    })
  },

  async create (req, res) {
    // var sql = `INSERT INTO Property (Name, Size, IsCommercial, IsPublic, Street, City, Zip, PropertyType, Owner, ApprovedBy) VALUES (?,?,?,?,?,?,?,?,?,NULL);`
    var sqlPara = [req.body.propertyName, req.body.acres, req.body.isCommercial, req.body.isPublic, req.body.streetAddress, req.body.city, req.body.zip, req.body.propertyType, req.body.username]
    var sql = `INSERT INTO Property (ID, Name, Size, IsCommercial, IsPublic, Street, City, Zip, PropertyType, Owner, ApprovedBy) VALUES (12,?,?,?,?,?,?,?,?,?,NULL);`
    // var sqlPara = []
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from inserting into properties'

        })
        return
      }
      res.send(result)
    })
  },

  async delete (req, res) {
    var sql = `DELETE FROM Property WHERE ID=?;`
    var sqlPara = [req.body.id]

    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors Deleting the Property'
        })
        return
      }
      res.send(result)
    })
  },

  async update (req, res) {
    var property = req.body.property
    var user = req.body.user
    var sql = `update Property set Name=?, Size=?, IsCommercial=?, IsPublic=?, Street=?, City=?, Zip=?, ApprovedBy=? where ID=?`
    var sqlPara = []
    if (user.UserType === 'OWNER') {
      sqlPara = [property.Name, property.Size, property.IsCommercial, property.IsPublic, property.Street, property.City, property.Zip, null, property.ID]
    } else {
      sqlPara = [property.Name, property.Size, property.IsCommercial, property.IsPublic, property.Street, property.City, property.Zip, user.Username, property.ID]
    }

    // var sqlPara = []
    connection.query(sql, sqlPara, function (err, result) {
      if (err) {
        res.status(400).send({
          error: 'Errors encountered from inserting into properties'

        })
        return
      }
      res.send(result)
    })
  }
}
