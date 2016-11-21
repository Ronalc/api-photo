'use sctict'
const bcrypt = require('bcrypt')
const saltRounds = 10
exports.generate = (plaintPass) => {
  /*
  bcrypt.genSalt(saltRounds,(err,salt) => {
    if (err) {
      return err
    }
    bcrypt.hash(plaintPass,salt,(err,hash) => {
      if (err) {
        return err
      }
      return hash
    })
  })
  */
  return bcrypt.hashSync(plaintPass, saltRounds)
}
exports.compare = (plaintPass, hash, callback) => {
  bcrypt.compare(plaintPass, hash, callback)
}
