const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PropertiesController = require('./controllers/PropertiesController')
const FarmItemController = require('./controllers/FarmItemController')
const HasController = require('./controllers/HasController')
const UserController = require('./controllers/UserController')

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

  app.post('/get_visitors',
    UserController.get_visitors)
  
  app.post('/get_owners',
    UserController.get_owners)

  app.post('/delete_account',
    UserController.delete_account)

  app.post('/delete_log',
    UserController.delete_log)
  
  app.post('/admin_unconfirmed_overview',
    PropertiesController.admin_unconfirmed_overview)
  
  app.post('/admin_confirmed_overview',
    PropertiesController.admin_confirmed_overview)

  app.post('/get_pending_items',
    FarmItemController.get_pending_items)
  
  app.post('/get_approved_items',
    FarmItemController.get_approved_items)

  app.post('/approve_item',
    FarmItemController.approve_item)
  
  app.post('/delete_item',
    FarmItemController.delete_item)

  app.post('/update_has',
    FarmItemController.update_has)
}
