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

  app.post('/owner_property_detail',
    PropertiesController.owner_property_detail)

  app.post('/get_property_items',
    FarmItemController.get_property_items)

  app.post('/owner_others_overview',
    PropertiesController.owner_others_overview)

  app.post('/get_back_id_by_propname',
    PropertiesController.getid_byname)

  app.post('/insert_property',
    PropertiesController.create)

  app.post('/insert_has',
    HasController.create)

  app.post('/get_other_valid_items',
    FarmItemController.get_other_valid_items)

  app.post('/delete_has',
    HasController.delete)

  app.post('/get_hashed_password',
    AuthenticationController.get_hashed_password)

  app.post('/add_pending_item',
    FarmItemController.add_pending_item)

  app.post('/delete_property',
    PropertiesController.delete)

  app.post('/update_property',
    PropertiesController.update)
}
