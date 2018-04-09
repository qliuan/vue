const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const FarmItemController = require('./controllers/FarmItemController')
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

  app.post('/farmitem_register',
    FarmItemController.register)
}
