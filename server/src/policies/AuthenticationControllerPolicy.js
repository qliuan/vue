const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      username: Joi.string().regex(
        new RegExp('^[a-zA-z0-9]{0,20}$')
      ),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-z0-9]{8,16}$')
      ),
      usertype: Joi.string().valid('ADMIN', 'OWNER', 'VISITOR')
    }

    const {error} = Joi.validate({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      usertype: req.body.usertype
    }, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'Your username cannot be longer than 20 characters'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 16 characters in length.
            `
          })
          break
        case 'usertype':
          res.status(400).send({
            error: `The usertype is limited to be {'OWNER', 'VISITOR'}`
          })
          break
        default:
          res.status(400).send({
            error: error
          })
      }
    } else {
      next() // go the next line and continue
    }
  }
}
