'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('./config')

exports.ensureAuthenticated = (req,res,next) => {
  if (!req.headers.authorization) {
    return res
        .status(403)
        .json({message:'Tu peticion no tiene cabecera de Auth'})
  }
  let token = req.headers.authorization
  let payload = jwt.decode(token, config.TOKEN_SECRET)

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({message:'El token ha expirado'})
  }
  req.user = payload.sub
  next()
}
