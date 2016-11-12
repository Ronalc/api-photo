'use strict'
/*
  * Dependencias
*/
const User = require('../models/User').User

/*
/ Modulo que valida, el inicio de session
*/
module.exports = (req, res, next) => {
  if (req.body) {
    if (req.body.email) {
        if (req.body.password) {
          User.findOne({email: req.body.email,password: req.body.password,},
            (err, user) => {
              if (user) {
                //req.session.user_id =
                res
                  .status(200)
                  .json({session_id:user._id})
                next()
              }
              else {
                res
                  .status(403)
                  .json({error: true, message:'Error usuario o contraseña invalido'})
              }
            })
        }
        else {
          res
            .status(403)
            .json({error: true, message: 'this parametro password'})
        }
    }
    else {
      res
        .status(403)
        .json({error: true, message: 'this parametro email'})
    }
  }
  else {
    res
      .status(403)
      .json({error: true, message: 'body empty'})
  }
}
