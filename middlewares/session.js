'use strict'
/*
  * Dependencias
*/
const User = require('../models/User').User

/*
/ Modulo que valida, si algun usuario a inicado session
*/

module.exports = (req, res, next) => {
  if (!req.session.user_id) {
    res
      .status()
      .json()
  }
  else{
    // Search user by id
    User.findById(req.session.user_id,(err,user) => {
      if (err) {
        res
          .status()
          .json()
      }
      else{
        res
          .status()
          .json()
        next()
      }
    })
  }
}
