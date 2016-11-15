'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('./config')

exports.createToken = (user) => {
  let payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  let token = jwt.encode(payload, config.TOKEN_SECRET)
  return token
}
