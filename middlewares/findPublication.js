'use strict'
/*
  * Dependencias
*/
const Publication = require('../models/Publication')
const ownerCheck = require('./publicationPermission');

/*
  * Modulo que busca las Publicaciones por id
*/

module.exports = (req, res, next) => {
  Publication.findById(req.params.id)
    .pupulate('creator')
    .exec((err,publication) => {
      if (publication != null && ownerCheck(publication,req,res)) {
        res.locals.imagen = publication
        next()
      }
      else {
        res
          .status()
          .json({})
      }
    })
}
