const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PropertiesController = require('./controllers/PropertiesController')
const FarmItemController = require('./controllers/FarmItemController')
const HasController = require('./controllers/HasController')

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

  app.post('/get_back_id_by_propname',
    PropertiesController.getid_byname)

  app.post('/insert_property',
    PropertiesController.create)

  app.post('/insert_has',
    HasController.create)
}
