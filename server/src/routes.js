const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PropertiesController = require('./controllers/PropertiesController')
const FarmItemController = require('./controllers/FarmItemController')

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'Hello'
    })
  })

  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/farmitem_register',
    FarmItemController.register)

  app.post('/owner_overview',
    PropertiesController.owner_overview)

  app.post('/owner_property_detail',
    PropertiesController.owner_property_detail)

  app.post('/get_property_items',
    FarmItemController.get_property_items)

  app.post('/owner_others_overview',
    PropertiesController.owner_others_overview)
}
