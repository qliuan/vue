var mysql = require('mysql')
var connect = mysql.createConnection({
  host: 'academic-mysql.cc.gatech.edu',
  user: 'cs4400_team_74',
  password: 'S2h3p4Tr',
  database: 'cs4400_team_74'
})

module.exports = {
  port: process.env.PORT || 8088,
  connection: connect,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}

// host     : 'academic-mysql.cc.gatech.edu',
// user     : 'cs4400_team_74',
// password : 'S2h3p4Tr',
// database : 'cs4400_team_74'
