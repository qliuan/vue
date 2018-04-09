const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PropertiesController = require('./controllers/PropertiesController')

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'Hello Fu**!'
    })
  })

  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/owner_overview',
    PropertiesController.owner_overview)
}
